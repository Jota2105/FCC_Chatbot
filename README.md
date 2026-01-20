# CODIGO_PPP_V2
Version 2 desde cero #modo rapido y furioso

## Auditoría del Sistema

### Descripción
El sistema de auditoría permite registrar y monitorear todas las acciones importantes realizadas por los usuarios en la aplicación. Cada evento es registrado con los siguientes datos:
- Usuario
- Módulo
- Operación
- Fecha y hora
- Detalles adicionales

### Características Principales
- **Registro Automático**: Las acciones críticas son registradas automáticamente
- **Búsqueda y Filtrado**: Permite buscar auditorías por usuario, fecha y tipo de operación
- **Exportación**: Generación de reportes en formato PDF
- **Seguridad**: Registro de inicio y cierre de sesión
- **Monitoreo en Tiempo Real**: Visualización de las últimas actividades

### Módulos Auditados
1. **Autenticación**
   - Inicio de sesión
   - Cierre de sesión
   - Cambio de contraseña

2. **Gestión de Usuarios**
   - Creación de usuarios
   - Modificación de perfiles
   - Activación/Desactivación de usuarios

3. **Pacientes**
   - Creación de registros
   - Modificación de datos
   - Eliminación de pacientes

4. **Atenciones Médicas**
   - Registro de consultas
   - Actualización de historias clínicas
   - Generación de exámenes

### Tecnologías Utilizadas

#### Cliente
- React.js
- Material-UI
- jsPDF (para generación de reportes)
- Cypress (pruebas E2E)

#### Servidor
- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL

### Pruebas Automatizadas
El sistema cuenta con pruebas E2E que verifican:
- Registro correcto de auditorías
- Filtrado y búsqueda de eventos
- Generación de reportes
- Integridad de los datos auditados

### Instalación y Configuración

#### Requisitos
- Node.js v16+
- PostgreSQL 12+
- NPM 8+

#### Pasos de Instalación
1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   cd cliente-fc/client
   npm install
   cd ../../servidor-fc/server
   npm install
   ```

## Estructura del proyecto en auditoria
```plaintext
CODIGO_PPP_V2/
├── cliente-fc/
│   ├── client/
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auditoria/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── auditoriaTable.js
│   │   │   │   │   │   ├── exportarAuditoria.js
│   │   │   │   │   │   └── verAuditorias.js
│   │   │   │   │   ├── views/
│   │   │   │   │   │   └── Auditoria.js
│   │   │   │   │   └── services/
│   │   │   │   │       └── auditoriaServices.js
│   │   ├── cypress/
│   │   │   ├── e2e/
│   │   │   │   └── auditoria-tests/
│   │   │   │       ├── auditoria.spec.cy.js
│   │   │   │       └── exportar-auditoria.spec.cy.js
│   │   │   └── fixtures/
│   │   │       └── auditoria.json
│   │   └── README.md
├── servidor-fc/
│   ├── server/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   └── auditoria.controller.js
│   │   │   ├── models/
│   │   │   │   └── historiaclinica.models/
│   │   │   │       └── auditoria.model.js
│   │   │   ├── services/
│   │   │   │   └── historiaclinica.services/
│   │   │   │       └── auditoria.service.js
│   │   │   └── routes/
│   │   │       └── auditoria.routes.js
│   │   └── README.md
│
└── README.md
```
