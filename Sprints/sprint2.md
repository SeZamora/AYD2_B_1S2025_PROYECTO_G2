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
| Diego Huite | Creas imágenes de cada uno de los componentes de la aplicación | Tratar de establecer las conexiones en los tres contenedores y hacerlos funcionar a la vez con docker compose | - |
| Jorge Zamora | - Revisión que los productos se listen correctamente | - Configurar la funcionalidad de agregar productos al carrito empleado | - No tener el suficiente dominio de React |
| **Hugo Girón** | - Implementar gráficos de pastel para ganancias por categoría. | - Configurar alertas de stock mínimo. | - Datos incorrectos en gráficos. |
| Nahomi Aparicio |- Se configuro la peticion de obtener todos los productos para mostrarlos en la tabla de productos <br> - el modal agregar produtos logra hacer petciciones a la api | hacer uso de los endpoints restantes para el supervisor | no se hizo mencion de una libreria que debia de instalarse para poder agregar las imagenes|
| Lesther López | Se realizó pruebas en los endpoints para crear y obtener libros y productos | Crear los primeros endpoints relacionados con las facturas, es decir, la creación de facturas | - |

---

### Día 2 (Miércoles)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se terminó la parte de editar supervisor y empleado, así como también el uso de blobs en atributos de la db mysql para almacenar fotos | Averiguar cómo gestionar el envío de correos cuando los usuarios se registren. | Modificar la solución anteriormente implementada usando aws s3 para las imágenes. |
| Jorge Zamora | - Configurar el carrito | - Implementar la opción de pagar, donde se ingresan los datos del vendedor y cliente <br> - Enviar la estructura para que se cree la factura en la base de datos. | - No genera el PDF de la factura luego de realizar el pago. |
| **Hugo Girón** | - Configurar lógica para stock mínimo general y por producto. | - Pruebas de alertas con datos reales. | - Alertas no se activaban automáticamente. |
| Nahomi Aparicio |- Se coniguraron correctamente las peticiones del front al back de agregar y ver libro ademas se arreglo ver y agregar producto |Configurar la peticion de editar libro para que solo los datos que se necesitan se editen| - |
| Lesther López | Se crearon endpoints relacionados con las entidades de las facturas, por lo que se terminó la creación de las facturas con sus detalles en el backend. Además, se realizó la creación de endpoints para obtener facturas, tanto por ID como en su totalidad. | Se agregarán validaciones adicionales a la entidad de facturas para mejorar la administración del stock de productos y libros, asegurando que las cantidades disponibles se reduzcan con cada generación de factura. | Se encontraron problemas en el modelo de la base de datos en las entidades facturas y detalle factura |

---

### Día 3 (Viernes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se logró enviar correos y agregar la verificación a través de un correo a los usuarios que se registren | Edición de libros y productos en el backend | - |
| Jorge Zamora | - Configurar el sistema de pago | - Crear la factura en PDF y se visualiza en el frontend cuando termina la compra. | - Manejo de la librería para crear el PDF. |
| **Hugo Girón** | - Pruebas de alertas de stock con datos simulados. | - Documentar casos de prueba para alertas. | - Errores en cálculos de ganancias netas. |
| Nahomi Aparicio |Se areglo el endpoint del back para poder editar productos <br> - Se hicieron correctamente las peticiones desde el frontend al back para editar libro , agregar libro  y ver libro  | se creara la vista de opiniones y se usaran datos simulados  |el endpoint de editar produto daba error al no ingresar datos correctamentes en el backend|
| Lesther López | Se terminaron de corregir ciertos atributos en el detalle de las facturas para poder tener un mejor manejo del stock y la entidad en general | Crear los primeros endpoints para las reseñas de los libros | - |

---

### Día 4 (Sábado)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se finalizó las ediciones de cada una de las entidades y se hicieron algunas modificaciones a la base de datos. | Tratar de gestionar las diferencias entre productos y libros en la base de datos, ya que algunas relaciones están causando conflictos cuando se trata de hacer un delete por las llaves foráneas. | Relaciones causan problemas al tratar de eliminar registros de una tabla. |
| Jorge Zamora | - Generar una factura | - Existían libros y productos con el mismo ID, entonces daba error al momento de crear las cards. | - |
| **Hugo Girón** | - Implementar logs para errores críticos. | - Optimizar consultas SQL para mejorar rendimiento. | - Lentitud en carga de facturas grandes. |
| Nahomi Aparicio | se creo la vista y las tablas para las opiniones de los libros y se optienen todas las opiniones del endpoint  | se conectara el endpoint de buscar producto al frontend asi como se arreglaran algunos pequeños detalles en la vista de los supervisores | - |
| Lesther López | Se implementó un endpoint para la creación de reseñas y otro adicional para obtener todas las reseñas registradas. | Implementar el endpoint para la edicion y eliminacion de las reseñas para los libros | - |

---



## Sprint Planning

### Sprint Backlog
| ID  | Tarea | Prioridad | Estado |
|----|--------|------------|--------|
| 1  | Configurar las conexiones en los contenedores y hacerlos funcionar con Docker Compose | Alta | En progreso |
| 2  | Implementar alertas de stock mínimo | Alta | En progreso |
| 3  | Configurar la funcionalidad de agregar productos al carrito | Alta | En progreso |
| 4  | Crear endpoints para facturas y validaciones de stock | Alta | Pendiente |
| 5  | Configurar la petición para editar libros correctamente | Media | Pendiente |
| 6  | Implementar la opción de pago y generación de facturas en PDF | Alta | En progreso |
| 7  | Optimizar consultas SQL para mejorar rendimiento | Media | Pendiente |
| 8  | Gestionar diferencias entre productos y libros en la base de datos | Alta | Pendiente |
| 9  | Implementar endpoints para la gestión de reseñas | Media | Pendiente |
| 10 | Crear la vista de opiniones y conectar el endpoint correspondiente | Media | Pendiente |
| 11 | Implementar Agregar Productos, Actualizar Productos Frontend | Media | En progreso |
| 12 | Implementar Ver y Agregar Libros Frontend | Media | En progreso |
| 13 | Implementar Ver Opinion Frontend | Media | En progreso |


### Tablero Inicial
![image](https://github.com/user-attachments/assets/789fb6d5-7839-4db6-9032-32273173510c)

![image](https://github.com/SeZamora/AYD2_B_1S2025_PROYECTO_G2/blob/feature/202113293/Sprints/Imagenes/202113293.PNG)


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

#### Backlog final


| ID  | Tarea | Estado Final | Justificación si no se completó |
|----|-------|--------------|--------------------------------|
| 1  | Configurar las conexiones en los contenedores y hacerlos funcionar con Docker Compose | En progreso | - |
| 2  | Modificar la solución para almacenar imágenes usando AWS S3 | Pendiente | Dependencia de implementación previa de almacenamiento |
| 3  | Averiguar cómo gestionar el envío de correos cuando los usuarios se registren | En progreso | - |
| 4  | Implementar verificación por correo para usuarios registrados | Completado | - |
| 5  | Edición de libros y productos en el backend | Pendiente | Dependencia de modelos de datos y endpoints existentes |
| 6  | Gestionar diferencias entre productos y libros en la base de datos para evitar conflictos | Pendiente | Dependencia de esquema de base de datos actual |


#### tablero final

![image](https://github.com/user-attachments/assets/a90b32b9-2db6-44b0-9ad7-1e82c6758044)


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

### Evaluación del Sprint - 202113293

#### ¿Qué se hizo bien?
- Se configuraron correctamente las peticiones del frontend al backend para agregar, ver y editar libros y productos.
- Se creó la vista de opiniones para los libros y se logró obtener las opiniones desde el endpoint.
- Se solucionaron errores en los endpoints de edición de productos .

#### ¿Qué se hizo mal?
- No se tomó en cuenta una librería necesaria para la carga de imágenes en productos, lo que causó problemas al implementar la funcionalidad.
- Hubo dificultades con el endpoint de edición de productos debido a errores en los datos enviados al backend.

#### ¿Qué mejoras implementar?
- Verificar con mayor detalle los requerimientos de cada endpoint antes de integrarlos con el frontend para evitar errores.
- Mantener una mejor comunicación con el equipo para asegurarse de que se mencionen todas las dependencias necesarias desde el inicio.


#### Backlog final


| ID  | Tarea | Estado Final | Justificación si no se completó |
|----|-------|--------------|--------------------------------|
| 10 | Crear la vista de opiniones y conectar el endpoint correspondiente| En Finalizada | - |
|11 | Implementar Agregar Productos, Actualizar Productos Frontend| Finalizada | -|
|11 | Implementar Ver Opinion Frontend| Finalizada | - |


#### Foto tablero
![image](https://github.com/SeZamora/AYD2_B_1S2025_PROYECTO_G2/blob/feature/202113293/Sprints/Imagenes/202113293_2.PNG)
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




