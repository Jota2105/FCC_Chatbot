// ChatBotIA.jsx
import React, { useState, useRef, useEffect } from 'react';
import { enviarPreguntaAI } from '../services/openaiService';
import './ChatBotIA.css';

export const ChatBotIA = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el chatbot de la Fundación. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setVisible(!visible);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');

    try {
      const respuestaIA = await enviarPreguntaAI(userMessage);
      setMessages(prev => [...prev, { from: 'bot', text: respuestaIA }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Lo siento, hubo un error al responder.' }]);
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
      <div className="chatbot-float-btn" onClick={toggleChat}>
        🤖
      </div>

      {visible && (
        <div className="chatbot-container">
          <div className="chatbot-header">🤖 Chat con Fundación</div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>{msg.text}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
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

