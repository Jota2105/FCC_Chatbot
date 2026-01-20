import axios from 'axios';

import {API_URL} from './apiConfig';
import { logAuditAction } from './auditoriaServices';

const getDiagnosticos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getDiagnosticoById = async (id_enfermedad, id_aps) => {
  const response = await axios.get(`${API_URL}/${id_enfermedad}/${id_aps}`);
  return response.data;
};

const createDiagnostico = async (data) => {
  const response = await axios.post(API_URL, data);
  await logAuditAction('CREAR_DIAGNOSTICO', { newData: data });
  return response.data;
};

const updateDiagnostico = async (id_enfermedad, id_aps, data) => {
  const response = await axios.put(`${API_URL}/${id_enfermedad}/${id_aps}`, data);
  await logAuditAction('ACTUALIZAR_DIAGNOSTICO', { id_enfermedad: id_enfermedad, id_aps: id_aps, updatedData: data });
  return response.data;
};

const deleteDiagnostico = async (id_enfermedad, id_aps) => {
  const response = await axios.delete(`${API_URL}/${id_enfermedad}/${id_aps}`);
  await logAuditAction('ELIMINAR_DIAGNOSTICO', { id_enfermedad: id_enfermedad, id_aps: id_aps });
  return response.data;
};

const getEnfermedadesByAPS = async (id_aps) => {
    const response = await axios.get(`${API_URL}/enfermedades/aps/${id_aps}`);
    return response.data;
  };

export {
  getDiagnosticos,
  getDiagnosticoById,
  createDiagnostico,
  updateDiagnostico,
  deleteDiagnostico,
  getEnfermedadesByAPS,
};
