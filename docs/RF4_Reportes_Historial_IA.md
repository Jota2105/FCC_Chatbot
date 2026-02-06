# RF4 – Reportes individuales, generales y personalizados (Historial IA)

## Objetivo
Permitir la emisión de reportes individuales, generales y personalizados sobre las consultas realizadas al asistente IA, con filtros por usuario, sesión, texto y rango de fechas. Este RF se implementa sobre el **Historial IA**.

## Alcance funcional
- Listar historial de consultas IA con filtros y paginación.
- Exportar reportes en **CSV** (individual, general o por filtros).
- Integración en UI administrativa.

## Flujos principales
1. El administrador ingresa al panel **Historial de Consultas IA**.
2. Aplica filtros (usuario, sesión, texto, fechas).
3. Visualiza el listado de resultados.
4. Descarga el reporte CSV según los filtros aplicados.

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/fcc/chatservidor/asistente/historial` | Lista el historial IA con filtros y paginación. |
| GET | `/api/fcc/chatservidor/asistente/historial/reporte` | Exporta el historial IA en CSV (o JSON si `format!=csv`). |

### Parámetros soportados
| Parámetro | Tipo | Descripción |
|---|---|---|
| `usuarioId` | string/number | Filtra por usuario interno. |
| `sessionId` | string | Filtra por sesión. |
| `search` | string | Búsqueda por texto en pregunta/respuesta. |
| `desde` | date | Fecha inicial (ISO). |
| `hasta` | date | Fecha final (ISO). |
| `limit` | number | Límite de registros. |
| `offset` | number | Paginación. |

### Ejemplo de exportación CSV
```
GET /api/fcc/chatservidor/asistente/historial/reporte?usuarioId=5&desde=2025-01-01&hasta=2025-01-31&format=csv
```

## UI administrativa
Ruta protegida:
- `/fcc-asistente-ia/historial`

Funciones:
- Tabla con resultados del historial.
- Filtros dinámicos.
- Botón **Descargar CSV**.

## Consideraciones técnicas
- El backend reutiliza la misma función de filtros para listado y reporte.
- El CSV retorna cabecera y se descarga con `Content-Disposition`.

## Evidencias en código
- Controlador de historial y exportación: `servidor-fc/server/src/controllers/chatservidor.controllers/historial_ia.controller.js`
- Rutas de historial: `servidor-fc/server/src/routes/chatservidor.routes/historial_ia.routes.js`
- UI y servicio: `cliente-fc/client/src/modules/asistente/views/HistorialIAView.js`, `cliente-fc/client/src/services/iaService.js`
