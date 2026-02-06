# RF6 – Procesos de asesoramiento virtual para la gestión interna

## Objetivo
Brindar un canal de asesoramiento virtual para procesos, trámites e información interna de la FCC utilizando el asistente IA.

## Alcance funcional
- Vista de chat dedicada para asesoramiento interno.
- Uso del backend del asistente IA (RAG con documentos internos).
- Registro de historial de consultas.

## Flujo principal
1. Usuario interno accede a **Asesoramiento Virtual**.
2. Envía consulta sobre procesos/trámites.
3. El sistema responde con información de documentos internos.
4. Se registra la interacción en el historial IA.

## Endpoints utilizados
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/fcc/chatservidor/asistente/consultar` | Consulta al asistente IA interno. |

## UI administrativa
Ruta protegida:
- `/fcc-asistente-ia/asesoramiento`

Funciones:
- Chat con mensajes usuario/IA.
- Indicador de carga.
- Botón de retorno.

## Consideraciones técnicas
- El mensaje se vectoriza y se consulta contra segmentos vectoriales para generar contexto.
- La respuesta se obtiene desde OpenAI y se registra en historial.

## Evidencias en código
- Servicio IA: `servidor-fc/server/src/services/chatservidor.services/bot_interno.service.js`
- Controlador/ruta: `servidor-fc/server/src/controllers/chatservidor.controllers/bot_interno.controller.js`, `servidor-fc/server/src/routes/chatservidor.routes/bot_interno.routes.js`
- UI: `cliente-fc/client/src/modules/asistente/views/AsesoramientoView.js`
