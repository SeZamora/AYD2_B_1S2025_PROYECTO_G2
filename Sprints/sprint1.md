# Documentación Sprint

# Semana del 2 al 8 de febrero 

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
| Diego Huite |-Empezar la estructura del backend (proyecto nodejs - express)  <br> -  Revisión del modelo de la base de datos y comenzar con las funcionalidades del backend                      |Tratar de establecer las conexiones en los tres contenedores|         -   |
| Jorge Zamora    | - Preparar el entorno | - Configurar el Inicio de sesion empleado |     - No redirije a la pestaña home        |
| **Hugo Girón**  | - Diseñar vistas del gerente, supervisores y facturas. | - Investigar librerías para gráficos y tablas (Chart.js, D3.js). | - Dificultad para implementar gráficos y tablas. |
| Nahomi Aparicio|Se repartieron las partes de cada integrante, tocándome a mí el Frontend de supervisor | Crear la base de frontend, así como comenzar a crear la vista de la página de login      |     -    |
| Lesther López    |   Se realizó el script inicial de la base de datos, donde se tomo en cuenta las entidades con sus relaciones               |         Ver el funcionamiento correcto del script inicial de la base de datos        |    -         |

---

### Día 2 (Miércoles)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite |Se terminó la parte de editar supervisor y empleado, así como también el uso de blobs en atributos de la db mysql para almacenar fotos  | Averiguar como gestionar el envío de correos cuando los usuarios se registren. |    -         |
| Jorge Zamora | - Configurar el login al home de empleado | - Configurar la vista home de empleado <br> - Creacion de una navbar de empleado | - Trabajar solo con muckups |
| **Hugo Girón**  | - Implementar tablas funcionales para supervisores (CRUD básico). | - Conectar frontend con API usando fetch. | - Errores de conexión con la base de datos. |
| Nahomi Aparicio|- Se creo la base de el Frontend ordenando las carpetas para un mejor ordenamiento a el proyecto  <br> - Se comenzo con la vista del login y el uso del contexto para que los usuarios no puedan acceder a paginas que no les corresponden  |Se creara las primeras vistas de el supervisor y sus respectivas tablas| -   |
| Lesther López    |       Se realizó la creación de los endpoints para la creación de empleados y usuarios           |          Se creara los metodos get de los empleados y usuarios, para poder obtener la información de estas entidades        |      -       |


---

### Día 3 (Viernes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se creo un endpoint para el login muy básico, así como también un endpoint para registrarse.| enviar correos y agregar la verificación a través de un correo a los usuarios que se registren  |        -     |
| Jorge Zamora |  - Configurar la vista home | - Listar los productos en cards <br> - Configurar el boton para ver los detalles de los productos | - Los botones de los productos aun no tiene interaccion |
| **Hugo Girón**  | - Visualización de facturas con filtros frontend. | - Implementar gráficos de ventas. | - Filtrado desde backend no funcionaba. |
| Nahomi Aparicio|- Se crearon las vistas y las tablas que el super visor necesita<br> -Se crearon modals para los datos de agregar, eliminar y editar| Usar los Endpoints para poder logear el Supervisor |  -   |
| Lesther López    |  Se crearon exitosamente métodos get de las entidades, empleado y usuario                |      Iniciar con los endpoints para la creación de productos y libros            |         -    |

---

### Día 4 (Sábado)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite |Edición de libros y productos en el backend <br> - Se finalizó las ediciones de cada una de las entidades y se hicieron algunas modificaciones a la base de datos.	| Se creo un endpoint para el login muy básico, así como también un endpoint para registrarse.                 | Tratar de gestionar las diferencias entre productos y libros en la base de datos, ya que algunas relaciones están causando conflictos cuando se trata de hacer un delete por las llaves foráneas. |Relaciones causan problemas al tratar de eliminar registros de una tabla.
| Jorge Zamora | - Comprender como funcionan las factuas |  - Creacion la vista ver las facturas en cards <br> - Creacion la vista ver factura por id |  - Aun no se puede ver en pdf |
| **Hugo Girón**  | - Implementar gráficos de barras para ventas por período. | - Agregar gráficos de ganancias. | - Gráficos desbordaban el contenedor. |
| Nahomi Aparicio|- Se arreglo el contexto para que solo los respectivos usuarios ingresen a sus vistas<br> - Se integro el login del frontend con el backend para el supervisor | Integrar el contexto a las rutas de el supervisor|Las contraseñas de los supervisores estaban danto error|
| Lesther López   |        Se concluyeron los endpoints para la creación de libros y productos, además se hizo modificaciones sobre estas entidades en el script de la base de datos          |   Crear los metodos get para los productos y libros, incluyendo los datos mas importantes               |   La relacion entre las entidades libros y productos con facturas causo problemas a causa de las llaves foraneas.         |

---



## Sprint Planning

### Sprint Backlog
| ID | Tarea | Prioridad | Estado |
|----|-------|----------|--------|
| 1  | Registrarse (Backend) | Alta | Finalizada |
| 2  | Login (Backend) | Alta | Finalizada |
| 3  | Configuración del entorno | Alta | Finalizada |
| 4  | Creación de la estructura del backend (Node.js - Express) | Alta | Finalizada |
| 5  | Revisión y ajuste del modelo de la base de datos | Alta | Finalizada |
| 6  | Creación de la base del frontend (Supervisor) | Alta | Finalizada |
| 7  | Implementación de CRUD para supervisores y empleados | Alta | Finalizada |
| 8  | Implementación de vistas (Gerente, Supervisores, Facturas) | Alta | Finalizada |
| 9  | Implementación de gráficos y tablas (Chart.js, D3.js) | Media | En progreso |
| 10 | Integración de endpoints en el frontend | Alta | Pendiente |
| 11 | Creación de la vista Home para empleados | Alta | En progreso |
| 12 | Implementación de Navbar en la vista de empleados | Media | En progreso |
| 13 | Listado y visualización de productos | Alta | En progreso |
| 14 | Creación de facturas y visualización con filtros | Alta | En progreso |
| 15 | Implementación de gráficos de ventas y ganancias | Media | En progreso |
| 16 | Gestión de envío de correos al registrarse | Alta | Pendiente |
| 17 | Integración del contexto en las rutas de supervisores | Media | Pendiente |
| 18 | Creación de métodos GET para productos y libros | Alta | En progreso |
| 19 | Manejo de relaciones entre productos, libros y facturas en la BD | Alta | Pendiente |
| 20 | Implementación de botones interactivos en productos | Media | En progreso |
| 21 | Generación de facturas en PDF | Alta | Pendiente |
| 22 | Corrección de errores en autenticación de supervisores | Alta | Pendiente |

### Tablero Inicial
![image](https://github.com/user-attachments/assets/30590f44-647e-41b7-a504-7132a7e58e46)

![image](https://github.com/user-attachments/assets/d000aa14-944a-4798-9f73-bdc483bea419)


## Sprint Retrospective
---

### Evaluación del Sprint - 202003585

#### ¿Qué se hizo bien?
- Montar la estructura del backend de forma que se pueda modularizar de manera sencilla, usandon controllers y servicios para separar funcionalidades.

#### ¿Qué se hizo mal?
- No considerar encriptación en el registro de usuario.

#### ¿Qué mejoras implementar?
- Más comuniación con el equipo

#### Sprint backlog final

| ID | Tarea | Estado Final | Justificación si no se completó |
|----|-------|--------------|--------------------------------|
| 4  | Creación de la estructura del backend (Node.js - Express) | Finalizada | - |
| 5  | Revisión y ajuste del modelo de la base de datos | Finalizada | - |
| 7  | Implementación de CRUD para supervisores y empleados | Finalizada | - |
| 16 | Gestión de envío de correos al registrarse | Pendiente | Falta investigar y probar la funcionalidad de envío de correos. |
| 19 | Manejo de relaciones entre productos, libros y facturas en la BD | Pendiente | Problemas con llaves foráneas que generan errores al eliminar registros. |

#### Foto tablero
![image](https://github.com/user-attachments/assets/789fb6d5-7839-4db6-9032-32273173510c)


---

### Evaluación del Sprint - 202002591

#### ¿Qué se hizo bien?
- Se configuró correctamente el inicio de sesión del empleado.
- Se implementó la navbar para mejorar la navegación en la vista del empleado.
- Se logró listar los productos en cards con una estructura más organizada.
- Se crearon las vistas para ver detalles de los productos y las facturas.

#### ¿Qué se hizo mal?
- No se logró que los botones de los productos tuvieran interacción desde el inicio.
- No se listaron correctamente los libros en la interfaz.
- Se trabajó solo con mockups, lo que limitó la conexión con la base de datos real.
- No se implementó la generación de facturas en PDF dentro del sprint.

#### ¿Qué mejoras implementar?
- Integrar la base de datos lo antes posible para evitar depender de mockups.
- Mejorar el manejo del enrutamiento y la interacción con los botones de los productos.
- Priorizar la implementación de la generación y visualización de facturas en PDF.
- Investigar más sobre React y su manejo de estado para mejorar la funcionalidad.

---

### Evaluación del Sprint - 202113293

#### ¿Qué se hizo bien?
- Montar la estructura del Frontend de forma que que sea entendible el uso de las carpetas de este y el uso del contexto para cada usuario segun su rol 

#### ¿Qué se hizo mal?
- La mala cordinacion entre los compañeros a la hora de actualizar el proyecto en la rama develop ya que no se sabia si la base de datos habia cambiado o alguna libreria debia instalarse

#### ¿Qué mejoras implementar?
- mas comunicacion entre el equipo para poder cordinarnos de mejor forma

#### Sprint backlog final

| ID | Tarea | Estado Final | Justificación si no se completó |
|----|-------|--------------|--------------------------------|
| 6 | Creación de la base del frontend (Supervisor)| Finalizada | - |
| 10 |Integración de endpoints en el frontend|Pendiente| algunos endpoints necesarios no estan implementados|
| 16 | Implementación de botones interactivos en productos |Pendiente | se esta buscando un mejor estilo para la vista de lso botones|
| 22 |Corrección de errores en autenticación de supervisores| Pendiente| Falta investigar una mejor solucion para que el contexto se guarde de una merjor forma|


#### Foto tablero
![image](https://github.com/SeZamora/AYD2_B_1S2025_PROYECTO_G2/blob/feature/202113293/Sprints/Imagenes/202113293.PNG)

---

### Evaluación del Sprint - 202110897

#### ¿Qué se hizo bien?
- Se implementó de manera adecuada los endpoints para agregar datos a las diversas entidades como cuentas, empleados, libros y productos

#### ¿Qué se hizo mal?
- La mala relacion entre algunas entidades al momento de realizar el script inicial de la base de datos.

#### ¿Qué mejoras implementar?
- Optimizar la interpretación de las entidades del proyecto para diseñar un modelo de base de datos más preciso y eficiente.

#### Sprint backlog final

| ID | Tarea | Estado Final | Justificación si no se completó |
|----|-------|--------------|--------------------------------|
| 1  | Registrarse | Finalizada
| 17  | Integración del contexto en las rutas de supervisores | Finalizada | No se completó debido a la revisión de las entidades en la base de datos |
| 18  | Creación de métodos GET para productos y libros | Finalizada | No se terminó por configuracion de las entidades en la base de datos |




---




