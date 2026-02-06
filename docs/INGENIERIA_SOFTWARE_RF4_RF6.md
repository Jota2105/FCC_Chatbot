# Documentación de Ingeniería de Software – RF4, RF5, RF6

## Arquitectura General
El sistema sigue una arquitectura **cliente-servidor**:
- **Frontend React**: vistas administrativas y componentes de interacción.
- **Backend Node/Express**: API REST, acceso a BD, integración IA.
- **BD (PostgreSQL)**: almacenamiento de documentos vectorizados e historial.

## RF4 – Reportes de Historial IA
### Componentes
- **Controlador**: `historial_ia.controller.js`
- **Rutas**: `historial_ia.routes.js`
- **UI**: `HistorialIAView.js`
- **Servicio cliente**: `iaService.js`

### Diagrama lógico (texto)
UI (Filtros) → API `/historial` → BD `ia_historial_entrenamiento`
UI (Descargar) → API `/historial/reporte` → CSV

### Seguridad y límites
- Filtros reusables para evitar duplicación.
- Límite máximo de exportación: 5000 registros.

## RF5 – Capacitaciones
### Componentes
- **Modelo**: `Capacitacion`
- **Service/Controller**: `capacitacion.service.js` / `capacitacion.controller.js`
- **Rutas**: `capacitacion.route.js`
- **UI**: `CapacitacionesDashboard.js`

### Entidad
`Capacitacion` incluye campos básicos para planificación y seguimiento.

## RF6 – Asesoramiento Virtual
### Componentes
- **Servicio IA**: `bot_interno.service.js`
- **Controlador/Rutas**: `bot_interno.controller.js`, `bot_interno.routes.js`
- **UI**: `AsesoramientoView.js`

### Flujo técnico
1. Vectorizar pregunta.
2. Buscar segmentos con similitud.
3. Armar prompt y enviar a OpenAI.
4. Registrar en historial.

## Riesgos y mitigaciones
| Riesgo | Mitigación |
|---|---|
| Saturación de consultas | Limitar longitud de preguntas y rate limits (pendiente). |
| Exportación masiva | Límite de registros en CSV. |
| Datos sensibles | Filtrado por roles y rutas protegidas. |

## Pendientes recomendados
- Añadir validaciones de datos en backend.
- Agregar pruebas unitarias y de integración.
- Reportes PDF si se requiere formato oficial.
