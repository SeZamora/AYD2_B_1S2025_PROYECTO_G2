# Documentación Sprint

# Semana del 2  al 8 marzo

## Integrantes
1. **Diego Andres Huite Alvarez** - Carnet: 202003585
2. **Jorge Sebastian Zamora Polanco** - Carnet: 202002591
3. **Hugo Daniel Girón Garcia** - Carnet: 202004807
4.  **Genesis Nahomi Aparicio Acan** - Carnet: 202113293
5. **Lesther Kevin Federico López Miculax** - Carnet: 202110897


## Daily Standup

### Día 1 (Lunes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Revisión del modelo de la base de datos y comenzar con las funcionalidades del backend (principalmente la parte de edición de cada una de las entidades como libros, usuarios, administradores, supervisores, etc.) | Tratar de establecer las conexiones en los tres contenedores | - |
| Jorge Zamora | - Revisión que los productos se listen correctamente | - Configurar la funcionalidad de agregar productos al carrito empleado | - No tener el suficiente dominio de React |
| **Hugo Girón** | - Implementar gráficos de pastel para ganancias por categoría. | - Configurar alertas de stock mínimo. | - Datos incorrectos en gráficos. |
| Nahomi Aparicio | - | - | - |
| Lesther López | Se realizó pruebas en los endpoints para crear y obtener libros y productos | Crear los primeros endpoints relacionados con las facturas, es decir, la creación de facturas | - |

---

### Día 2 (Miércoles)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se terminó la parte de editar supervisor y empleado, así como también el uso de blobs en atributos de la db mysql para almacenar fotos | Averiguar cómo gestionar el envío de correos cuando los usuarios se registren. | - |
| Jorge Zamora | - Configurar el carrito | - Implementar la opción de pagar, donde se ingresan los datos del vendedor y cliente <br> - Enviar la estructura para que se cree la factura en la base de datos. | - No genera el PDF de la factura luego de realizar el pago. |
| **Hugo Girón** | - Configurar lógica para stock mínimo general y por producto. | - Pruebas de alertas con datos reales. | - Alertas no se activaban automáticamente. |
| Nahomi Aparicio | - | - | - |
| Lesther López | Se crearon endpoints relacionados con las entidades de las facturas, por lo que se terminó la creación de las facturas con sus detalles en el backend. Además, se realizó la creación de endpoints para obtener facturas, tanto por ID como en su totalidad. | Se agregarán validaciones adicionales a la entidad de facturas para mejorar la administración del stock de productos y libros, asegurando que las cantidades disponibles se reduzcan con cada generación de factura. | Se encontraron problemas en el modelo de la base de datos en las entidades facturas y detalle factura |

---

### Día 3 (Viernes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se logró enviar correos y agregar la verificación a través de un correo a los usuarios que se registren | Edición de libros y productos en el backend | - |
| Jorge Zamora | - Configurar el sistema de pago | - Crear la factura en PDF y se visualiza en el frontend cuando termina la compra. | - Manejo de la librería para crear el PDF. |
| **Hugo Girón** | - Pruebas de alertas de stock con datos simulados. | - Documentar casos de prueba para alertas. | - Errores en cálculos de ganancias netas. |
| Nahomi Aparicio | - | - | - |
| Lesther López | Se terminaron de corregir ciertos atributos en el detalle de las facturas para poder tener un mejor manejo del stock y la entidad en general | Crear los primeros endpoints para las reseñas de los libros | - |

---

### Día 4 (Sábado)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se finalizó las ediciones de cada una de las entidades y se hicieron algunas modificaciones a la base de datos. | Tratar de gestionar las diferencias entre productos y libros en la base de datos, ya que algunas relaciones están causando conflictos cuando se trata de hacer un delete por las llaves foráneas. | Relaciones causan problemas al tratar de eliminar registros de una tabla. |
| Jorge Zamora | - Generar una factura | - Existían libros y productos con el mismo ID, entonces daba error al momento de crear las cards. | - |
| **Hugo Girón** | - Implementar logs para errores críticos. | - Optimizar consultas SQL para mejorar rendimiento. | - Lentitud en carga de facturas grandes. |
| Nahomi Aparicio | - | - | - |
| Lesther López | Se implementó un endpoint para la creación de reseñas y otro adicional para obtener todas las reseñas registradas. | Implementar el endpoint para la edicion y eliminacion de las reseñas para los libros | - |

---



## Sprint Planning

### Sprint Backlog
| ID | Tarea | Prioridad | Estado |
|----|-------|----------|--------|
| 1  | Verificación de cuenta por email (Backend)      | Alta | Pendiente |
| 2  | Edición de libros (Backend)      | Media | Pendiente |
| 3  | Edición de productos (Backend)      | Media | Pendiente |
| 3  | Eliminación de usuarios (Backend)      | Media | Pendiente |



### Tablero Inicial
![image](https://github.com/user-attachments/assets/30590f44-647e-41b7-a504-7132a7e58e46)

![image](https://github.com/user-attachments/assets/d000aa14-944a-4798-9f73-bdc483bea419)


## Sprint Retrospective
---

### Evaluación del Sprint - 202003585

#### ¿Qué se hizo bien?
- Manejo y distribución de responsabilidades en el backend.
- Modularidad que permite reusar varias funciones.

#### ¿Qué se hizo mal?
- No tomar en cuenta el formato de la petición de algunos endpoints que solicitaban los compañeros que estaban trabajando el frontend.

#### ¿Qué mejoras implementar?
- Usar de mejor forma el tablero kanban ya que a veces algunas tareas las estaban trabajando dos personas a la vez.

---

### Evaluación del Sprint - 202002591

#### ¿Qué se hizo bien?
- Se implementó la funcionalidad del carrito de compras.
- Se añadió la opción de pago con ingreso de datos del vendedor y cliente.
- Se almacenaron correctamente las facturas en la base de datos.
- Se logró generar y visualizar las facturas en PDF en el frontend.

#### ¿Qué se hizo mal?
- Hubo dificultades al manejar el estado del carrito con useState en React.
- No se generaba automáticamente el PDF de la factura al finalizar el pago.
- Se presentaron complicaciones con la librería utilizada para generar los PDFs.
#### ¿Qué mejoras implementar?
- Implementar los libros al carrito
- Configurar carrito en el Usuario

---

### Evaluación del Sprint - XXXXXXXXXX

#### ¿Qué se hizo bien?
- 

#### ¿Qué se hizo mal?
- 

#### ¿Qué mejoras implementar?
- 

---

### Evaluación del Sprint - XXXXXXXXXX

#### ¿Qué se hizo bien?
- 

#### ¿Qué se hizo mal?
- 

#### ¿Qué mejoras implementar?
- 

---

### Evaluación del Sprint - XXXXXXXXXX

#### ¿Qué se hizo bien?
- 

#### ¿Qué se hizo mal?
- 

#### ¿Qué mejoras implementar?
- 

---

### Evaluación del Sprint - 202110897
#### ¿Qué se hizo bien?
- Se implemento las primeras funcionalidades de reseñas en el backend de manera correcta
-  Se logró gestionar de manera correcta la generacion y obtencion de facturas.

#### ¿Qué se hizo mal?
- No se contemplo ciertos atributos fundamentales en diversas entidades como producto o detalle de factura.
- Ciertos endpoints no devolvian la respuesta esperada.

#### ¿Qué mejoras implementar?
- Mejorar la comunicación con los encargados del frontend

---


### Tablero Final
![image](https://github.com/user-attachments/assets/1754a60e-76f2-4b3f-9e3f-b784261afbb7)
![image](https://github.com/user-attachments/assets/a4c47ca2-3a3e-481e-94d1-421c3d9f5c6a)



### Sprint Backlog Final
| ID | Tarea | Estado Final | Justificación si no se completó |
|----|-------|-------------|---------------------------------|
| 1  | Verificación de cuenta por email (Backend)       | Completada  |  - |
| 2  | Edición de libros (Backend)   | Completada  |  - |
| 3  | Edición de productos (Backend)   | Completada  |  - |
| 4  | Eliminación de usuarios (Backend)   | Completada  |  - |
| 5  | Edición de libros (Backend)   | Pendiente  |  Algunos atributos debían ser cambiados por modificaciones a la arquitectura. |





