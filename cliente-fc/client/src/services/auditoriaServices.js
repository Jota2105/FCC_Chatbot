import axios from "axios";
import { API_URL } from "./apiConfig";
import { getCurrentUserId } from "../utils/userUtils";

// UTILITIES
const formatEcuadorDateTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
};

const formatEcuadorTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
};

// --- PRIMARY AUDIT FUNCTION ---
/**
 * Logs a user action for auditing purposes.
 * This is the primary, centralized function that all components should use.
 * @param {string} operacion - A unique identifier for the action (e.g., 'ELIMINAR_EXAMEN').
 * @param {object} datos - A JSON object containing relevant data for the audit (e.g., { deletedData: examObject }).
 */
export const logAuditAction = async (operacion, datos = {}) => {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      console.error("Audit Error: User ID not found. Action will not be audited.");
      return; // Non-blocking if audit fails
    }

    // Automatically determine module from the operation string for consistency
    // e.g., 'CONSULTAR_HISTORIA' -> 'Historia'
    const moduleName = operacion.split('_').length > 1 ? operacion.split('_')[1] : 'General';
    const formattedModule = moduleName.charAt(0).toUpperCase() + moduleName.slice(1).toLowerCase().replace(/s$/, '');


    const auditData = {
      id_usuario: userId,
      modulo: formattedModule,
      operacion: operacion,
      detalle: JSON.stringify(datos) // Securely stringify the data object
    };

    // Use the internal createAuditoria function to send the data
    await createAuditoria(auditData);

  } catch (error) {
    // Log the audit failure but do not interrupt the user's workflow
    console.error(`Failed to log audit action '${operacion}':`, error);
  }
};


// --- INTERNAL AND ADMIN-FACING FUNCTIONS ---

// This function is now "internal" to the service, called by logAuditAction.
const createAuditoria = async (data = {}) => {
  try {
    const currentDate = new Date();
    const formattedData = {
      ...data,
      fecha: currentDate,
      hora_ingreso: data.hora_ingreso || formatEcuadorTime(currentDate),
      hora_salida: data.hora_salida || formatEcuadorTime(currentDate)
    };

    const response = await axios.post(`${API_URL}/auditoria`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error creating auditoria:", error.response?.data || error.message);
    throw error; // Throw so the caller knows it failed if it needs to
  }
};

/*
  The following functions are likely for a future admin panel to view/manage audits.
  They are kept for that purpose.
*/
export const getAuditorias = async (filters = {}) => {
  try {
    let url = `${API_URL}/auditoria`;
    if (Object.keys(filters).length > 0) {
      const params = new URLSearchParams(filters);
      url += `?${params.toString()}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting auditorias:", error);
    throw error;
  }
};

export const getAuditoria = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/auditoria/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting auditoria:", error);
    throw error;
  }
};

export const updateAuditoria = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/auditoria/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating auditoria:", error);
    throw error;
  }
};

export const deleteAuditoria = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auditoria/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting auditoria:", error);
    throw error;
  }
};