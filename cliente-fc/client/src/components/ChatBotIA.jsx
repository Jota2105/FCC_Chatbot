import React, { useState, useRef, useEffect } from 'react';
// Importamos ambos servicios
import { enviarPreguntaAI } from '../services/openaiService';
import iaService from '../services/iaService'; 
import { getCurrentUser } from '../utils/userUtils'; // O donde tengas tu función de usuario
import './ChatBotIA.css';

export const ChatBotIA = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const [isInternalUser, setIsInternalUser] = useState(false);
  const messagesEndRef = useRef(null);

  // Verificamos si es usuario interno al cargar
  useEffect(() => {
    const user = getCurrentUser();
    if (user && (user.rol === 'admin' || user.rol === 'personal_salud' || user.rol === 'doctor')) {
      setIsInternalUser(true);
      setMessages([{ from: 'bot', text: '👋 Hola colega. Estoy conectado a la base de conocimiento interna. Pregúntame sobre normativas o procesos.' }]);
    }
  }, []);

  const toggleChat = () => setVisible(!visible);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');

    try {
      let respuestaText = "";

      if (isInternalUser) {
        // --- MODO INTERNO (RAG) ---
        // Usa tus documentos subidos
        const response = await iaService.consultarAsistente({
            mensaje: userMessage,
            sessionId: 'session-user-internal'
        });
        if(response.data.success) {
            respuestaText = response.data.data.respuesta;
        } else {
            respuestaText = "Lo siento, no encontré información en los documentos internos.";
        }
      } else {
        // --- MODO PÚBLICO (GPT General) ---
        respuestaText = await enviarPreguntaAI(userMessage);
      }

      setMessages(prev => [...prev, { from: 'bot', text: respuestaText }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { from: 'bot', text: 'Lo siento, hubo un error de conexión.' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className={`chatbot-float-btn ${isInternalUser ? 'internal-mode' : ''}`} onClick={toggleChat}>
        {isInternalUser ? '🧠' : '🤖'}
      </div>

      {visible && (
        <div className="chatbot-container">
          <div className="chatbot-header" style={{ background: isInternalUser ? '#2e7d32' : '#1976d2' }}>
            {isInternalUser ? 'Asistente Interno (Docs)' : 'Chat Fundación'}
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>{msg.text}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder={isInternalUser ? "Consulta la documentación..." : "Escribe tu duda..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};
