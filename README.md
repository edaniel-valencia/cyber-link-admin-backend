<div align="center">
  <h1>Cyber Link API (Backend)</h1>
  <p>El núcleo de datos, autenticación y lógica de negocio para la plataforma Cyber Link.</p>
  <p>🔗 <strong><a href="https://github.com/edaniel-valencia/cyber-link-admin">Ver el Repositorio del Frontend (React)</a></strong></p>
</div>

---

## 🚀 Instalación y Configuración

El backend está construido con **Node.js, Express y PostgreSQL**. Sigue estos pasos para levantarlo en tu entorno local.

### 1. Requisitos
- [Node.js](https://nodejs.org/) (v16+)
- [PostgreSQL](https://www.postgresql.org/) instalado y corriendo en tu máquina.

### 2. Configurar Variables de Entorno
Clona o descarga el proyecto y ubícate en la carpeta del backend.
Existe un archivo de plantilla llamado `.env.test`. Debes crear un archivo nuevo llamado `.env` basándote en la plantilla, para colocar tus credenciales reales de la Base de Datos:

```env
PORT=3000
DB_USER=tu_usuario_de_postgres
DB_HOST=localhost
DB_NAME=cyber_link_db
DB_PASSWORD=tu_contraseña
DB_PORT=5432
JWT_SECRET=tu_secreto_para_tokens
```
> **Nota:** La carpeta `node_modules` y el archivo `.env` ya están protegidos por el `.gitignore` para no subir secretos al repositorio.

### 3. Instalar Dependencias e Iniciar
Una vez configurado tu `.env` y teniendo tu servidor de PostgreSQL corriendo:
```bash
npm install
node server.js
```
*El servidor debería arrancar y mostrar en la consola que está escuchando en el puerto 3000.*

---

## 🗄️ Base de Datos (Estructura)

El sistema utiliza una base de datos relacional (PostgreSQL). La estructura base (`database.sql`) gestiona autenticación, catálogos y transacciones.

### Tablas Principales:
1. **`roles` y `routes`**: Conforman el sistema de Control de Acceso Basado en Roles (RBAC). Definen qué vistas del panel pueden ser accedidas por un Administrador, un Usuario o un Cliente.
2. **`users`**: Contiene la información de los usuarios registrados y el hash de su contraseña. Posee una relación foránea con la tabla `roles`.
3. **`services`**: Catálogo de productos. Almacena nombres, precios, descuentos y la URL de la imagen del servicio.
4. **`settings`**: Configuración dinámica de la plataforma (pares de tipo *clave-valor*).
5. **`service_requests`**: El historial de pedidos/solicitudes hechas por los clientes. Relaciona un cliente (`user_id`) con un servicio (`service_id`) y guarda el comprobante de pago subido.

---

## 🏗️ Estructura del Proyecto (Arquitectura MVC)

El código fuente está estrictamente separado por responsabilidades, facilitando el mantenimiento y la escalabilidad del API:

```
/
 ┣ config/
 ┃  ┗ db.js                # Lógica de conexión a PostgreSQL usando "pg" (Pool)
 ┣ controllers/
 ┃  ┣ serviceController.js # Lógica de los endpoints de servicios
 ┃  ┣ userController.js    # Login, registro y listado de usuarios
 ┃  ┗ ...
 ┣ middlewares/
 ┃  ┣ authMiddleware.js    # Verificación de Tokens JWT y protección de rutas (Admin/User)
 ┃  ┗ uploadMiddleware.js  # Configuración de Multer para recibir comprobantes de pago
 ┣ models/
 ┃  ┣ Service.js           # Consultas SQL nativas para la tabla services
 ┃  ┣ User.js              # Consultas SQL para creación y búsqueda de usuarios
 ┃  ┗ ...
 ┣ routes/
 ┃  ┣ serviceRoutes.js     # Definición de rutas Express (GET, POST, PUT, DELETE)
 ┃  ┗ ...
 ┣ uploads/                # Directorio generado automáticamente donde se guardan las imágenes subidas por los clientes
 ┣ database.sql            # Script con el esquema principal de la Base de Datos
 ┣ mock-services.js        # Script auxiliar para poblar servicios de prueba
 ┗ server.js               # Punto de entrada maestro (App de Express)
```

## 🔒 Seguridad
- **Cifrado de contraseñas:** Implementado mediante `bcrypt`.
- **Sesiones sin estado (Stateless):** Mediante `JSON Web Tokens (JWT)`.
- **Rutas estáticas seguras:** La carpeta `/uploads` está expuesta para visualizar comprobantes, limitando el tamaño máximo de carga desde el `uploadMiddleware`.

---

## 👨‍💻 Desarrollador y Créditos

Desarrollado por **E. Daniel Valencia** de **ADAVAM**.

