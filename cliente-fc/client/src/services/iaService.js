import axios from 'axios';
import { API_URL } from './apiConfig';

// La ruta base debe coincidir con lo que definimos en el backend (chatservidor)
const IA_API_URL = `${API_URL}/asistente`;

const consultarAsistente = async (data) => {
  // data espera: { mensaje, sessionId }
  return await axios.post(`${IA_API_URL}/consultar`, data);
};

const subirConocimiento = async (formData) => {
  // formData contiene 'archivo' y 'titulo'
  // No hace falta headers manuales, axios detecta el FormData
  return await axios.post(`${IA_API_URL}/upload-conocimiento`, formData);
};

const iaService = {
  consultarAsistente,
  subirConocimiento,
};

export default iaService;