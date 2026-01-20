import {API_URL} from './apiConfig';

export const enviarPreguntaAI = async (mensaje) => {
  const respuesta = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje })
  });

  const data = await respuesta.json();
  return data.respuesta;
};