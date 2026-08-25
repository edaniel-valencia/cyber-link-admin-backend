-- Ejecuta este script en tu PostgreSQL o PGAdmin

CREATE DATABASE edaniel_cyber_link;

\c edaniel_cyber_link;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    path VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE role_routes (
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    route_id INTEGER REFERENCES routes(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, route_id)
);

-- Inserta los roles base
INSERT INTO roles (name, description) VALUES 
('Admin', 'Administrador con acceso total'),
('User', 'Usuario regular con acceso limitado');

-- Inserta un usuario administrador de prueba (rol 1)
-- La contraseña "admin123" fue hasheada con bcrypt
INSERT INTO users (email, password, name, role_id) VALUES 
('admin@test.com', '$2b$10$MaAO.HGt0J20v9UmzpSfjOa6CPyDSzjzhLaSRjo7K.nQPLmiXk67y', 'Admin', 1);

-- Inserta las rutas (pantallas) de la aplicación
INSERT INTO routes (path, description) VALUES 
('/dashboard', 'Panel de Control Principal'),
('/users', 'Gestión de Usuarios'),
('/settings', 'Configuraciones Generales');

-- Relaciona el rol Admin (1) con todas las rutas
INSERT INTO role_routes (role_id, route_id) VALUES 
(1, 1),
(1, 2),
(1, 3);

-- Relaciona el rol User (2) con el dashboard únicamente
INSERT INTO role_routes (role_id, route_id) VALUES 
(2, 1);

-- Tabla Settings para configuraciones globales
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT
);

-- Inserta una configuración de prueba
INSERT INTO settings (key, value, description) VALUES 
('site_name', 'Cyber Link Admin', 'El nombre que aparecerá en el portal');

-- Tabla Services (Catálogo)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    image TEXT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    discount DECIMAL(5,2) DEFAULT 0.00,
    promotions BOOLEAN DEFAULT false,
    promo_code VARCHAR(100),
    stock INTEGER DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asegurar rol Cliente
INSERT INTO roles (id, name) VALUES (3, 'Cliente') ON CONFLICT (id) DO NOTHING;

-- Tabla de Solicitudes (Pedidos)
CREATE TABLE service_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    payment_receipt TEXT,
    status VARCHAR(50) DEFAULT 'Pendiente',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
