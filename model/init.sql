DROP DATABASE IF EXISTS ayd2_proyecto;

CREATE DATABASE IF NOT EXISTS ayd2_proyecto;
USE ayd2_proyecto;
CREATE TABLE cuenta (
    id_cuenta  INT NOT NULL AUTO_INCREMENT,
    correo     VARCHAR(255) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    nombre     VARCHAR(100) NOT NULL,
    edad       INT NOT NULL,
    verificado INT NOT NULL,
    PRIMARY KEY (id_cuenta)
);


CREATE TABLE auditoria_supervisores (
    id_auditoria       INT NOT NULL AUTO_INCREMENT,
    id_supervisor      INT NOT NULL,
    nombre_completo    VARCHAR(255) NOT NULL,
    correo             VARCHAR(255) NOT NULL,
    telefono           VARCHAR(20) NOT NULL,
    fecha_alta         DATE NOT NULL,
    fecha_baja         DATE NOT NULL,
    razon_desvinculacion TEXT NOT NULL,
    PRIMARY KEY (id_auditoria)
);

CREATE TABLE auditoria_empleados (
    id_auditoria     INT NOT NULL AUTO_INCREMENT,
    empleados_id     INT NOT NULL,
    nombre           VARCHAR(100) NOT NULL,
    apellido         VARCHAR(100) NOT NULL,
    cui              BIGINT NOT NULL,
    telefono         VARCHAR(20) NOT NULL,
    correo           VARCHAR(255) NOT NULL,
    edad            INT NOT NULL,
    genero          VARCHAR(10) NOT NULL,
    fecha_alta       DATE NOT NULL,
    fecha_baja       DATE NOT NULL,
    fotografia       MEDIUMBLOB NOT NULL,
    razon_desvinculacion TEXT NOT NULL,
    PRIMARY KEY (id_auditoria)
);





CREATE TABLE libros (
    id_libro          INT NOT NULL AUTO_INCREMENT,
    titulo            VARCHAR(255) NOT NULL,
    autor             VARCHAR(255) NOT NULL,
    fecha_lanzamiento DATE NOT NULL,
    descripcion       VARCHAR(255),
    genero           VARCHAR(100) NOT NULL,
    stock             INT NOT NULL,
    precio           DECIMAL(10,2) NOT NULL,
    disponible       INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id_libro)
);

CREATE TABLE producto (
    id_producto   INT NOT NULL AUTO_INCREMENT,
    nombre        VARCHAR(255) NOT NULL,
    descripcion   TEXT,
    codigo        VARCHAR(50) NOT NULL,
    categoria     VARCHAR(100) NOT NULL,
    precio_compra DECIMAL(10,2) NOT NULL,
    precio_venta  DECIMAL(10,2) NOT NULL,
    cantidad      INT NOT NULL,
    imagen        MEDIUMBLOB NOT NULL,
    disponible       INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id_producto)
);
CREATE TABLE gerente (
    id_gerente INT NOT NULL AUTO_INCREMENT,
    nombre     VARCHAR(100) NOT NULL,
    correo     VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_gerente)
);

CREATE TABLE supervisores (
    id_supervisor      INT NOT NULL AUTO_INCREMENT,
    gerente_id_gerente INT NOT NULL,
    nombre_completo    VARCHAR(255) NOT NULL,
    correo             VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    telefono           VARCHAR(20) NOT NULL,
    fecha              DATE NOT NULL,
    verificado         INT NOT NULL,
    PRIMARY KEY (id_supervisor),
    FOREIGN KEY (gerente_id_gerente) REFERENCES gerente (id_gerente)
);


CREATE TABLE empleados (
    empleados_id             INT NOT NULL AUTO_INCREMENT,
    nombre                   VARCHAR(100) NOT NULL,
    apellido                 VARCHAR(100) NOT NULL,
    cui                      BIGINT NOT NULL,
    telefono                 VARCHAR(20) NOT NULL,
    correo                   VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    edad                     INT NOT NULL,
    genero                   VARCHAR(10) NOT NULL,
    fecha                    DATE NOT NULL,
    fotografia               MEDIUMBLOB NOT NULL,
    supervisores_id_supervisor INT NOT NULL,
    verificado               INT NOT NULL,
    eliminado               INT NOT NULL DEFAULT 0,
    PRIMARY KEY (empleados_id)
);

CREATE TABLE deseos (
    id_deseo             INT NOT NULL AUTO_INCREMENT,
    cuenta_id_cuenta     INT NOT NULL,
    libro_id             INT,
    producto_id          INT,
    PRIMARY KEY (id_deseo),
    FOREIGN KEY (cuenta_id_cuenta) REFERENCES cuenta (id_cuenta),
    FOREIGN KEY (libro_id) REFERENCES libros (id_libro),
    FOREIGN KEY (producto_id) REFERENCES producto (id_producto),
    CHECK ((producto_id IS NOT NULL AND libro_id IS NULL) 
        OR (producto_id IS NULL AND libro_id IS NOT NULL))
);

CREATE TABLE facturas (
    id_facturas        INT NOT NULL AUTO_INCREMENT,
    nombre_vendedor    VARCHAR(255) NOT NULL,
    fecha_hora         DATETIME NOT NULL,
    total_venta        DECIMAL(10,2) NOT NULL,
    nombre_comprador   VARCHAR(255) NOT NULL,
    cuenta_id_cuenta   INT NOT NULL,
    empleados_id       INT NOT NULL,
    PRIMARY KEY (id_facturas),
    FOREIGN KEY (cuenta_id_cuenta) REFERENCES cuenta (id_cuenta),
    FOREIGN KEY (empleados_id) REFERENCES empleados (empleados_id)
);

CREATE TABLE detalle_factura (
    id_detalle        INT NOT NULL AUTO_INCREMENT,
    factura_id        INT NOT NULL, 
    unidades_compradas INT NOT NULL,
    precio_producto   DECIMAL(10,2) NOT NULL,
    producto_id       INT,
    libro_id          INT,
    PRIMARY KEY (id_detalle),
    FOREIGN KEY (factura_id) REFERENCES facturas (id_facturas),
    FOREIGN KEY (producto_id) REFERENCES producto (id_producto),
    FOREIGN KEY (libro_id) REFERENCES libros (id_libro),
    CHECK ((producto_id IS NOT NULL AND libro_id IS NULL) 
        OR (producto_id IS NULL AND libro_id IS NOT NULL))
);


CREATE TABLE resenias (
    id_resenia        INT NOT NULL AUTO_INCREMENT,
    calificacion     INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario       TEXT NOT NULL,
    fecha            DATE NOT NULL,     
    cuenta_id_cuenta INT NOT NULL,
    libros_id_libro  INT NOT NULL,
    PRIMARY KEY (id_resenia),
    FOREIGN KEY (cuenta_id_cuenta) REFERENCES cuenta (id_cuenta),
    FOREIGN KEY (libros_id_libro) REFERENCES libros (id_libro)
);


-- Insertar datos en la tabla cuenta
INSERT INTO cuenta (correo, contrasenia, nombre, edad, verificado) 
VALUES 
('usuario1@example.com', 'd8542114d7d40f3c82fc0919efc644df30f4e827c2bd6b83b9dbec8358b2fbc4', 'Juan Perez', 30, 1),
('usuario2@example.com', 'd8542114d7d40f3c82fc0919efc644df30f4e827c2bd6b83b9dbec8358b2fbc4', 'María Gomez', 25, 0),
('usuario3@example.com', 'd8542114d7d40f3c82fc0919efc644df30f4e827c2bd6b83b9dbec8358b2fbc4', 'Carlos Lopez', 40, 1);

-- Insertar datos en la tabla gerente
INSERT INTO gerente (nombre, correo) -- ??????? considerar password
VALUES 
('Ana Rodriguez', 'ana.gerente@example.com'),
('Luis Fernandez', 'luis.gerente@example.com'),
('Marta Sanchez', 'marta.gerente@example.com');

-- Insertar datos en la tabla supervisores
INSERT INTO supervisores (gerente_id_gerente, nombre_completo, correo, telefono, fecha, verificado, contrasenia) 
VALUES 
(1, 'Pedro Ramirez', 'pedro.supervisor@example.com', '555-1234', '2024-03-01', 1, 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'), -- password:hola
(2, 'Sofia Herrera', 'sofia.supervisor@example.com', '555-5678', '2024-03-02', 0, 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'), -- password:hola
(3, 'Andres Medina', 'andres.supervisor@example.com', '555-9101', '2024-03-03', 1, 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'); -- password:hola


-- Insertar datos en la tabla empleados
INSERT INTO empleados (nombre, apellido, cui, telefono, correo, edad, genero, fecha, fotografia, supervisores_id_supervisor, verificado, contrasenia) 
VALUES 
('Ricardo', 'Garcoa', 1234567890123, '555-0001', 'ricardo.empleado@example.com', 28, 'Masculino', '2024-03-05', 'foto1.jpg', 1,1, 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'), -- password:hola
('Fernanda', 'Lopez', 9876543210987, '555-0002', 'fernanda.empleado@example.com', 32, 'Femenino', '2024-03-06', 'foto2.jpg', 2, 0, 'd8542114d7d40f3c82fc0919efc644df30f4e827c2bd6b83b9dbec8358b2fbc4'), -- password:adios
('David', 'Martinez', 4567891230456, '555-0003', 'david.empleado@example.com', 26, 'Masculino', '2024-03-07', 'foto3.jpg', 3, 1, 'd8542114d7d40f3c82fc0919efc644df30f4e827c2bd6b83b9dbec8358b2fbc4'); -- password:adios

-- INSERTAR PRODUCTOS
INSERT INTO producto (nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad, imagen) 
VALUES 
('Laptop Lenovo', 'Laptop Lenovo IdeaPad 3, 8GB RAM, 512GB SSD', 'LEN123', 'Electrónica', 500.00, 700.00, 10, 'imagen1.jpg'),
('Smartphone Samsung', 'Samsung Galaxy S23 Ultra, 12GB RAM, 256GB', 'SAM456', 'Celulares', 800.00, 1000.00, 15, 'imagen2.jpg'),
('Mouse Logitech', 'Mouse inalámbrico Logitech M280', 'LOG789', 'Accesorios', 20.00, 35.00, 50, 'imagen3.jpg'),
('Teclado Mecánico', 'Teclado mecánico RGB para gaming', 'TEC001', 'Periféricos', 45.00, 70.00, 25, 'imagen4.jpg'),
('Monitor Dell', 'Monitor Dell 24 pulgadas Full HD', 'DEL002', 'Monitores', 150.00, 220.00, 8, 'imagen5.jpg');


INSERT INTO facturas (nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id) 
VALUES 
('Ricardo Garcoa', '2024-03-10 14:30:00', 1035.00, 'Juan Perez', 1, 1),
('Fernanda Lopez', '2024-03-11 09:45:00', 750.00, 'María Gomez', 2, 2),
('David Martinez', '2024-03-12 17:15:00', 70.00, 'Carlos Lopez', 3, 3),
('David Martinez', '2024-03-12 17:15:00', 800.00, 'Carlos Cux', 3, 3);


INSERT INTO detalle_factura (factura_id, unidades_compradas, precio_producto, producto_id, libro_id) 
VALUES 
(1, 1, 700.00, 1, NULL), -- Laptop Lenovo
(1, 1, 1000.00, 2, NULL), -- Smartphone Samsung
(2, 2, 35.00, 3, NULL), -- Mouse Logitech
(3, 1, 70.00, 4, NULL); -- Teclado Mecánico



-- Insertar datos en la tabla libros
INSERT INTO libros (titulo, autor, fecha_lanzamiento, descripcion, genero, stock, precio) 
VALUES 
('Cien años de soledad', 'Gabriel García Márquez', '1967-06-05', 'Novela sobre la familia Buendía', 'Realismo mágico', 20, 15.99),
('El principito', 'Antoine de Saint-Exupéry', '1943-04-06', 'Historia de un pequeño príncipe', 'Fábula', 30, 9.99),
('1984', 'George Orwell', '1949-06-08', 'Distopía sobre un régimen totalitario', 'Ciencia ficción', 25, 12.50),
('Los juegos del hambre', 'Suzanne Collins', '2008-09-14', 'Novela de ciencia ficción distópica', 'Juvenil', 40, 18.99),
('Don Quijote de la Mancha', 'Miguel de Cervantes', '1605-01-16', 'Historia de un caballero loco', 'Clásico', 15, 22.00);

-- Insertar datos en la tabla deseos
INSERT INTO deseos (cuenta_id_cuenta, libro_id, producto_id) 
VALUES 
(1, 1, NULL), -- Usuario 1 desea "Cien años de soledad"
(2, NULL, 3), -- Usuario 2 desea el Mouse Logitech
(3, 3, NULL), -- Usuario 3 desea "1984"
(1, NULL, 2), -- Usuario 1 desea el Smartphone Samsung
(2, 5, NULL); -- Usuario 2 desea "Don Quijote"

-- Insertar datos en la tabla resenias
INSERT INTO resenias (calificacion, comentario, fecha, cuenta_id_cuenta, libros_id_libro) 
VALUES 
(5, 'Un clásico imprescindible.', '2024-03-10', 1, 1),
(4, 'Muy interesante, pero complejo.', '2024-03-11', 2, 3),
(3, 'Esperaba más del final.', '2024-03-12', 3, 4),
(5, 'Una historia hermosa y conmovedora.', '2024-03-13', 2, 2),
(4, 'Un libro que todos deberían leer.', '2024-03-14', 3, 5);