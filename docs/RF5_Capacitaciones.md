# RF5 – Procesos de capacitaciones internas o externas

## Objetivo
Registrar y administrar procesos de capacitación internos y externos para el personal institucional y actores externos, con información clave para planificación y seguimiento.

## Alcance funcional
- CRUD de **Capacitaciones**.
- Registro de tipo (INTERNA/EXTERNA), fechas, modalidad, lugar, estado, público objetivo y costo estimado.
- Acceso desde panel administrativo.

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/fcc/capacitacion` | Lista capacitaciones. |
| GET | `/api/fcc/capacitacion/:id` | Detalle de capacitación. |
| POST | `/api/fcc/capacitacion` | Crea capacitación. |
| PUT | `/api/fcc/capacitacion/:id` | Actualiza capacitación. |
| DELETE | `/api/fcc/capacitacion/:id` | Elimina capacitación. |

## UI administrativa
Ruta protegida:
- `/fcc-capacitaciones`

Funciones:
- Tabla con listado.
- Formulario para crear/editar.
- Acciones de eliminar.

## Datos registrados
Campos principales:
- `titulo`
- `descripcion`
- `tipo` (INTERNA/EXTERNA)
- `modalidad`
- `fecha_inicio`, `fecha_fin`
- `lugar`
- `estado`
- `publico_objetivo`
- `costo_estimado`

## Consideraciones técnicas
- Modelo: `Capacitacion` en esquema `fcc_historiaclinica`.
- Orden por fecha de inicio descendente en listados.

## Evidencias en código
- Modelo y registro: `servidor-fc/server/src/models/capacitaciones.models/capacitacion.model.js`, `servidor-fc/server/src/models/capacitaciones.models/index.js`
- Controlador/servicio/rutas: `servidor-fc/server/src/controllers/capacitaciones.controllers/capacitacion.controller.js`, `servidor-fc/server/src/services/capacitaciones.services/capacitacion.service.js`, `servidor-fc/server/src/routes/capacitaciones.routes/capacitacion.route.js`
- UI y servicio: `cliente-fc/client/src/modules/capacitaciones/views/CapacitacionesDashboard.js`, `cliente-fc/client/src/services/capacitacionesService.js`
