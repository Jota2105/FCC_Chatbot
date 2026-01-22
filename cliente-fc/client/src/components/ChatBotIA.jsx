import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  Paper, 
  Typography, 
  TextField, 
  Avatar, 
  Stack, 
  Fab 
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

// Servicios
import { enviarPreguntaAI } from '../services/openaiService';
import iaService from '../services/iaService';
import { getCurrentUser } from '../utils/userUtils';

const styles = {
  floatBtn: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 9999,
  },
  chatContainer: {
    position: 'fixed',
    bottom: 90,
    right: 20,
    width: 350,
    height: 500,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }
};

export const ChatBotIA = () => {
  const [visible, setVisible] = useState(false);
  const [isInternalUser, setIsInternalUser] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- DETECCIÓN DE USUARIO CORREGIDA ---
  useEffect(() => {
    const verificarUsuario = () => {
      let user = null;
      
      try {
        user = getCurrentUser();
      } catch (e) {
        console.warn("Error leyendo sesión:", e);
      }

      // Respaldo de localStorage
      if (!user) {
        const stored = localStorage.getItem('userInfo');
        if (stored) user = JSON.parse(stored);
      }

      console.log("--> 🤖 DATOS DE USUARIO:", user);

      
      // Verificamos si existe el objeto user
      if (user) {
        // Buscamos el rol en cualquiera de las propiedades posibles
        // Tu log dice 'rol_usuario', pero dejamos 'rol' por si acaso
        const rawRole = user.rol_usuario || user.rol; 
        
        if (rawRole) {
          const rolNormalizado = String(rawRole).toLowerCase().trim();
          console.log("--> 🤖 ROL DETECTADO:", rolNormalizado);

          const rolesInternos = ['admin', 'administrador', 'personal', 'personal_salud', 'doctor', 'medico', 'enfermero'];

          if (rolesInternos.includes(rolNormalizado)) {
            setIsInternalUser(true);
            
            // También corregimos el nombre: 'nombre_usuario' según tu log
            const nombre = user.nombre_usuario || user.nombres || 'Colega';
            
            setMessages([{ 
              sender: 'bot', 
              text: `👋 Hola ${nombre}. \n\nSoy tu Asistente de Gestión.\nEstoy conectado a los documentos internos. ¿Qué necesitas consultar hoy?` 
            }]);
            return; // Salimos para no sobrescribir el mensaje
          }
        }
      }

      // Si no entra al IF de arriba, es modo público
      console.log("--> MODO PÚBLICO (No se detectó rol administrativo)");
      setIsInternalUser(false);
      setMessages([{ sender: 'bot', text: '¡Hola! Soy el asistente virtual de la Fundación. ¿En qué puedo ayudarte?' }]);
    };

    verificarUsuario();
  }, []);

  const handleToggle = () => setVisible(!visible);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      let respuesta = "";

      if (isInternalUser) {
        // --- MODO INTERNO (Usamos ID real si existe) ---
        const userId = getCurrentUser()?.id_usuario || 'temp';
        const res = await iaService.consultarAsistente({
          mensaje: userText,
          sessionId: 'session-' + userId
        });
        respuesta = res.data.success ? res.data.data.respuesta : "No encontré información en los documentos.";
      } else {
        // --- MODO PÚBLICO ---
        respuesta = await enviarPreguntaAI(userText);
      }

      setMessages(prev => [...prev, { sender: 'bot', text: respuesta }]);
    } catch (error) {
      console.error("Error Chatbot:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Lo siento, hubo un error de conexión." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <>
      <Fab 
        color={isInternalUser ? "success" : "primary"} 
        aria-label="chat" 
        onClick={handleToggle}
        sx={styles.floatBtn}
      >
        {visible ? <CloseIcon /> : (isInternalUser ? <SmartToyIcon /> : <ChatIcon />)}
      </Fab>

      {visible && (
        <Paper elevation={6} sx={styles.chatContainer}>
          <Box sx={{ 
            p: 2, 
            bgcolor: isInternalUser ? '#2e7d32' : '#1976d2', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            {isInternalUser ? <SmartToyIcon /> : <ChatIcon />}
            <Typography variant="subtitle1" fontWeight="bold">
              {isInternalUser ? 'Asistente Interno' : 'Chat Fundación'}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
            {messages.map((msg, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 2 }}>
                <Stack direction={msg.sender === 'user' ? 'row-reverse' : 'row'} spacing={1} alignItems="flex-end">
                  <Avatar sx={{ width: 24, height: 24, bgcolor: msg.sender === 'user' ? 'primary.main' : (isInternalUser ? 'success.main' : 'secondary.main') }}>
                    {msg.sender === 'user' ? <PersonIcon fontSize="small"/> : <SmartToyIcon fontSize="small"/>}
                  </Avatar>
                  <Paper sx={{ 
                    p: 1.5, 
                    maxWidth: '80%', 
                    bgcolor: msg.sender === 'user' ? '#e3f2fd' : 'white',
                    borderRadius: 2
                  }}>
                    <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{msg.text}</Typography>
                  </Paper>
                </Stack>
              </Box>
            ))}
            {loading && <Typography variant="caption" sx={{ ml: 5, fontStyle: 'italic' }}>Escribiendo...</Typography>}
            <div ref={messagesEndRef} />
          </Box>

          <Box component="form" onSubmit={handleSend} sx={{ p: 1, borderTop: '1px solid #ddd', bgcolor: 'white', display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Escribe aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <IconButton type="submit" color="primary" disabled={loading || !input.trim()}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBotIA;