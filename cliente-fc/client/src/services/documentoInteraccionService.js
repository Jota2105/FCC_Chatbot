import { API_URL } from './apiConfig'; 

const getByInteraccion = async (interaccionId) => {
  const response = await fetch(`${API_URL}/comunidad/documentos/interaccion/${interaccionId}`);
  return response.json();
};

const create = async (interaccionId, formData) => {
  const response = await fetch(`${API_URL}/comunidad/documentos/interaccion/${interaccionId}`, {
    method: 'POST',
    body: formData, 
  });
  return response.json();
};

const deleteDoc = async (id) => {
    const response = await fetch(`${API_URL}/comunidad/documentos/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};

const getDownloadUrl = (filename) => {
    return `${API_URL}/comunidad/documentos/download/${filename}`;
};

export default {
  getByInteraccion,
  create,
  deleteDoc,
  getDownloadUrl
};