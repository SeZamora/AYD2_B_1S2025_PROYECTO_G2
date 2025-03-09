DROP DATABASE IF EXISTS ayd2_proyecto;

CREATE DATABASE IF NOT EXISTS ayd2_proyecto;
USE ayd2_proyecto;
CREATE TABLE cuenta (
    id_cuenta  INT NOT NULL AUTO_INCREMENT,
    correo     VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre     VARCHAR(100) NOT NULL,
    edad       INT NOT NULL,
    verificado INT NOT NULL,
    PRIMARY KEY (id_cuenta)
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
    imagen        VARCHAR(255) NOT NULL,
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
    telefono           VARCHAR(20) NOT NULL,
    fecha              DATE NOT NULL,
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
    edad                     INT NOT NULL,
    genero                   VARCHAR(10) NOT NULL,
    fecha                    DATE NOT NULL,
    fotografia               VARCHAR(255) NOT NULL,
    supervisores_id_supervisor INT NOT NULL,
    PRIMARY KEY (empleados_id),
    FOREIGN KEY (supervisores_id_supervisor) REFERENCES supervisores (id_supervisor)
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


CREATE TABLE reseñas (
    id_reseña        INT NOT NULL AUTO_INCREMENT,
    calificacion     INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario       TEXT NOT NULL,
    fecha            DATE NOT NULL,
    cuenta_id_cuenta INT NOT NULL,
    libros_id_libro  INT NOT NULL,
    PRIMARY KEY (id_reseña),
    FOREIGN KEY (cuenta_id_cuenta) REFERENCES cuenta (id_cuenta),
    FOREIGN KEY (libros_id_libro) REFERENCES libros (id_libro)
);


