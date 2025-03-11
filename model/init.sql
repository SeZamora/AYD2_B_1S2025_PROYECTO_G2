DROP DATABASE IF EXISTS ayd2_proyecto;

CREATE DATABASE IF NOT EXISTS ayd2_proyecto;
USE ayd2_proyecto;

CREATE TABLE cuenta (
    id_cuenta  INT NOT NULL AUTO_INCREMENT,
    correo     VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre     VARCHAR(255) NOT NULL,
    edad       INT NOT NULL,
    verificado CHAR(1) NOT NULL,
    PRIMARY KEY (id_cuenta)
);

CREATE TABLE gerente (
    id_gerente INT NOT NULL AUTO_INCREMENT,
    nombre     VARCHAR(255) NOT NULL,
    correo     VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_gerente)
);

CREATE TABLE supervisores (
    id_supervisor   INT NOT NULL AUTO_INCREMENT,
    gerente_id      INT NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    correo          VARCHAR(255) NOT NULL,
    telefono        VARCHAR(15) NOT NULL,
    fecha           DATE NOT NULL,
    PRIMARY KEY (id_supervisor),
    FOREIGN KEY (gerente_id) REFERENCES gerente(id_gerente)
);

CREATE TABLE empleados (
    empleados_id   INT NOT NULL AUTO_INCREMENT,
    nombre         VARCHAR(255) NOT NULL,
    apellido       VARCHAR(255) NOT NULL,
    cui            BIGINT NOT NULL,
    telefono       VARCHAR(15) NOT NULL,
    correo         VARCHAR(255) NOT NULL,
    edad           INT NOT NULL,
    genero         VARCHAR(20) NOT NULL,
    fecha          DATE NOT NULL,
    fotografia     VARCHAR(255) NOT NULL, 
    supervisor_id  INT NOT NULL,
    gerente_id     INT NOT NULL,
    PRIMARY KEY (empleados_id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisores(id_supervisor)
);

CREATE TABLE producto (
    id_producto   INT NOT NULL AUTO_INCREMENT,
    nombre        VARCHAR(255) NOT NULL,
    descripcion   TEXT,
    codigo        INT NOT NULL,
    categoria     VARCHAR(100) NOT NULL,
    precio_compra DECIMAL(10,2) NOT NULL,
    precio_venta  DECIMAL(10,2) NOT NULL,
    cantidad      INT NOT NULL,
    imagen        VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_producto)
);

CREATE TABLE libros (
    id_libro             INT NOT NULL AUTO_INCREMENT,
    producto_id_producto INT NOT NULL,
    titulo              VARCHAR(255) NOT NULL,
    autor               VARCHAR(255) NOT NULL,
    fecha_lanzamiento   DATE NOT NULL,
    descripcion         TEXT,
    genero              VARCHAR(100) NOT NULL,
    stock               INT,
    precio              DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_libro),
    FOREIGN KEY (producto_id_producto) REFERENCES producto(id_producto)
);


CREATE TABLE deseos (
    id_deseo           INT NOT NULL AUTO_INCREMENT,
    id_usuario         INT NOT NULL,
    id_libro           VARCHAR(255) NOT NULL,
    cuenta_id_cuenta   INT NOT NULL,
    libros_id_producto INT NOT NULL,
    libros_id_libro    INT NOT NULL,
    PRIMARY KEY (id_deseo),
    FOREIGN KEY (cuenta_id_cuenta) REFERENCES cuenta(id_cuenta),
    FOREIGN KEY (libros_id_producto, libros_id_libro) REFERENCES libros(producto_id_producto, id_libro)
);

CREATE TABLE facturas (
    id_facturas        INT NOT NULL AUTO_INCREMENT,
    nombre_vendedor    VARCHAR(255) NOT NULL,
    fecha_hora         DATETIME NOT NULL,
    nombre_producto    VARCHAR(255) NOT NULL,
    unidades_compradas INT NOT NULL,
    precio_producto    DECIMAL(10,2) NOT NULL,
    total_venta        DECIMAL(10,2) NOT NULL,
    nombre_comprador   VARCHAR(255) NOT NULL,
    cuenta_id_cuenta   INT NOT NULL,
    empleados_id       INT NOT NULL,
    PRIMARY KEY (id_facturas),
    FOREIGN KEY (cuenta_id_cuenta) REFERENCES cuenta(id_cuenta),
    FOREIGN KEY (empleados_id) REFERENCES empleados(empleados_id)
);

CREATE TABLE producto_factura (
    id_producto_factura INT NOT NULL AUTO_INCREMENT,
    facturas_id        INT NOT NULL,
    producto_id        INT NOT NULL,
    PRIMARY KEY (id_producto_factura),
    FOREIGN KEY (facturas_id) REFERENCES facturas(id_facturas),
    FOREIGN KEY (producto_id) REFERENCES producto(id_producto)
);

CREATE TABLE reseñas (
    id_reseña               INT NOT NULL AUTO_INCREMENT,
    calificacion            INT NOT NULL,
    comentario              TEXT NOT NULL,
    fecha                   DATE NOT NULL,
    cuenta_id_cuenta        INT NOT NULL,
    libros_producto_id      INT NOT NULL,
    libros_id_libro         INT NOT NULL,
    PRIMARY KEY (id_reseña),
    FOREIGN KEY (cuenta_id_cuenta) REFERENCES cuenta(id_cuenta),
    FOREIGN KEY (libros_producto_id, libros_id_libro) REFERENCES libros(producto_id_producto, id_libro)
);

-- Insertar usuarios en la tabla cuenta
INSERT INTO cuenta (correo, contraseña, nombre, edad, verificado)
VALUES 
('juan.perez@mail.com', 'password123', 'Juan Perez', 30, 'S'),
('ana.garcia@mail.com', 'password456', 'Ana Garcia', 28, 'N');

-- Insertar usuarios en la tabla gerente
INSERT INTO gerente (nombre, correo)
VALUES 
('Carlos Lopez', 'carlos.lopez@empresa.com'),
('Maria Gonzalez', 'maria.gonzalez@empresa.com');

-- Insertar supervisores en la tabla supervisores (referencia a la tabla gerente)
INSERT INTO supervisores (gerente_id, nombre_completo, correo, telefono, fecha)
VALUES
(1, 'Pedro Ramirez', 'pedro.ramirez@empresa.com', '555-1234', '2025-03-01'),
(2, 'Laura Fernandez', 'laura.fernandez@empresa.com', '555-5678', '2025-03-02');

-- Insertar empleados en la tabla empleados (referencia a la tabla supervisores y gerente)
INSERT INTO empleados (nombre, apellido, cui, telefono, correo, edad, genero, fecha, fotografia, supervisor_id, gerente_id)
VALUES
('Luis', 'Martinez', 123456789012, '555-8765', 'luis.martinez@empresa.com', 25, 'Masculino', '2025-03-01', 'foto1.jpg', 1, 1),
('Sofia', 'Rodriguez', 987654321098, '555-4321', 'sofia.rodriguez@empresa.com', 22, 'Femenino', '2025-03-02', 'foto2.jpg', 2, 2);

