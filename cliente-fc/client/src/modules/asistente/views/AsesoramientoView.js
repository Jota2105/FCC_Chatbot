import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import { useMenu } from '../../../components/base/MenuContext';
import { useNavigate } from 'react-router-dom';
import iaService from '../../../services/iaService';

const AsesoramientoView = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setCurrentMenu } = useMenu();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hola, soy tu asesor virtual. Pregunta sobre procesos internos, trámites o información institucional.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    setCurrentMenu('Asesoramiento Virtual');
  }, [setCurrentMenu]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');
    setLoading(true);

    try {
      const res = await iaService.consultarAsistente({
        mensaje: userText,
        sessionId: 'asesoramiento-interno'
      });
      const respuesta = res.data.success ? res.data.data.respuesta : 'No encontré información disponible.';
      setMessages((prev) => [...prev, { sender: 'bot', text: respuesta }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Hubo un error al consultar el asesor virtual.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate(-1)} aria-label="Regresar">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ ml: 1, color: 'text.secondary' }}>
              Regresar
            </Typography>
          </Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Asesoramiento Virtual
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Utiliza este canal para resolver dudas sobre procesos, trámites y gestión interna institucional.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '60vh' }}>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.100',
                    color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary'
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            {loading && (
              <Typography variant="caption" sx={{ ml: 1, fontStyle: 'italic' }}>
                Respondiendo...
              </Typography>
            )}
            <div ref={chatEndRef} />
          </Box>

          <Box component="form" onSubmit={handleSend} sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Escribe tu consulta..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              disabled={loading}
            />
            <Button variant="contained" type="submit" disabled={loading || !inputMsg.trim()}>
              {loading ? <CircularProgress size={22} /> : 'Enviar'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AsesoramientoView;
