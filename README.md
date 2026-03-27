# Guía completa para ejecutar la aplicación en tu equipo (local)

Esta guía explica **paso a paso** cómo levantar el frontend y el backend de FCC en un entorno local.

---

## 1. Requisitos previos

Instala lo siguiente en tu equipo:
- **Node.js** v16+  
- **NPM** v8+  
- **PostgreSQL** v12+  
- **pgvector** 

---

1. ¿Qué es `pgvector` y por qué lo usamos?
`pgvector` es una extensión open-source para PostgreSQL que permite almacenar vectores matemáticos (embeddings) generados por la API de OpenAI (`text-embedding-3-small`). Cuando un usuario hace una pregunta, el sistema busca en la base de datos los fragmentos de texto cuyo significado matemático sea más similar a la pregunta utilizando la distancia del coseno (`<=>`).

### 2. Instalación de la Extensión `pgvector`

Dependiendo de tu entorno de desarrollo o producción, debes instalar la extensión antes de ejecutar las migraciones del proyecto:

#### Opción A: Usando Docker (Recomendado para desarrollo local)
La forma más fácil de tener PostgreSQL con `pgvector` es usar la imagen oficial preconfigurada de Docker. Puedes levantar la base de datos ejecutando:

```bash
docker run --name fcc-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=tu_password -e POSTGRES_DB=fcc_db -p 5432:5432 -d pgvector/pgvector:pg16

Opción B: Instalación en servidor Linux (Ubuntu/Debian)
Si estás instalando PostgreSQL directamente en un servidor:

Bash

# 1. Instalar dependencias de compilación
sudo apt install postgresql-server-dev-15 build-essential

# 2. Clonar y compilar la extensión
cd /tmp
git clone --branch v0.6.0 [https://github.com/pgvector/pgvector.git](https://github.com/pgvector/pgvector.git)
cd pgvector
make
sudo make install

Una vez que el software de la extensión está instalado en el servidor, debes habilitarla dentro de la base de datos específica del proyecto (fcc_db).

Abre tu gestor de base de datos (pgAdmin, DBeaver, o la terminal psql) y ejecuta el siguiente comando SQL:

SQL

CREATE EXTENSION IF NOT EXISTS vector;
Para verificar que se instaló correctamente, ejecuta:

SQL

SELECT * FROM pg_extension WHERE extname = 'vector';



## 2. Clonar el repositorio o descomprime el ZIP


```bash
git clone <URL_DEL_REPOSITORIO>
cd FCC_Chatbot
```

---

## 3. Configurar base de datos

### 3.1 Crear base de datos
```sql
CREATE DATABASE fcc_db;
```

### 3.2 Configurar variables de entorno
Crea un archivo `.env` en:
```
servidor-fc/server/.env
```

Ejemplo:
```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=fcc_db
DB_PORT=5432
OPENAI_API_KEY=tu_api_key
```

---

## 4. Instalar dependencias

### Backend
```bash
cd servidor-fc/server
npm install
```

### Frontend
```bash
cd ../../cliente-fc/client
npm install
```

---

## 5. Ejecutar migraciones (si aplica)

Si el proyecto usa Sequelize migrations:
```bash
cd servidor-fc/server
npx sequelize-cli db:migrate
```

---

## 6. Levantar backend

```bash
cd servidor-fc/server
npm run dev
```

Servidor estará disponible en:
```
http://localhost:5000
```

---

## 7. Levantar frontend

```bash
cd cliente-fc/client
npm start
```

Frontend estará disponible en:
```
http://localhost:3000
```

---

## 8. Verificación rápida

✅ Backend activo:  
```
http://localhost:5000/api/fcc
```

✅ Frontend activo:  
```
http://localhost:3000
```
### Esquemas de la BDD

Si se requiere, cambiar el esquema fcc_ia a fcc_historiaclinica, para 
crear las tablas de los modulos de IA Chatbot Servidor en el esquema principal

---

## 9. Endpoints principales (resumen)

- **Chat público**: `POST /api/fcc/chat`
- **Chat IA interno**: `POST /api/fcc/chatservidor/asistente/consultar`
- **Ingestión de documentos**: `POST /api/fcc/chatservidor/asistente/upload-conocimiento`
- **Historial IA**: `GET /api/fcc/chatservidor/asistente/historial`
- **Capacitaciones**: `GET /api/fcc/capacitacion`

---

## 10. Solución de problemas comunes

### Error de conexión a BD
Verifica:
- credenciales en `.env`
- que PostgreSQL esté activo

### Error OpenAI
Verifica:
- API Key válida en `.env`
- conexión a internet

### Error de CORS o API
Revisar que frontend esté apuntando a `http://localhost:5000`

---

## 11. Estructura básica del repositorio

```
FCC_Chatbot/
├── cliente-fc/   → Frontend (React)
├── servidor-fc/  → Backend (Node/Express)
├── docs/         → Documentación
```

---

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
