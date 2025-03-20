# Documentación Sprint

# Semana del 2  al 8 marzo

## Integrantes
1. **Diego Andres Huite Alvarez** - Carnet: 202003585
2. **Nombre 2** - Carnet: XXXXXXX
3. **Nombre 3** - Carnet: XXXXXXX
4. **Genesis Nahomi Aparicio Acan** - Carnet: 202113293
5. **Nombre 5** - Carnet: XXXXXXX

## Daily Standup

### Día 1 (Lunes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite |   Revisión del modelo de la base de datos y comenzar con las funcionalidades del backend (principalmente la parde de edición de cada una de las entidades como libros, usuarios, adminstradores, supervisores, etc.)             |         Tratar de establecer las conexiones en los tres contenedores        |         -   |
| Jorge Zamora | - Revision que los productos se listen correctamente | - Configure la funcionalidad de agregar productos al carrito empleado |  - No tener el suficiente dominio de React |
| Nombre 3    |                  |                  |             |
| Nahomi Aparicio|                  |                  |             |
| Nombre 5    |                  |                  |             |


### Día 2 (Miercoles)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se terminó la parte de editar supervisor y empleado, así como también el uso de blobs en atributos de la db mysql para almacenar fotos   | Averiguar como gestionar el envío de correos cuando los usuarios se registren.       |    -         |
| Jorge Zamora | - Configurar el carrito | - Implemente la opcion de pagar, donde se ingresan los datos del vendedor y cliente <br> - Enviar la estructura para que se cree la factura en la base de datos.
| - No genera el pdf de la factura luego de realizar el pago |
| Nombre 3    |                  |                  |             |
| Nahomi Aparicio|                  |                  |             |
| Nombre 5    |                  |                  |             |

### Día 3 (Viernes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se logró enviar correos y agregar la verificación a través de un correo a los usuarios que se registren        | Edición de libros y productos en el backend                       |   - |
| Jorge Zamora | - Configurar el sistema de pago | - Crea la factura en pdf y se visualiza en el frontend cuando termina la compra |  - Manejo de la libreria para crear el pdf |
| Nombre 3    |                  |                  |             |
| Nahomi Aparicio|                  |                  |             |
| Nombre 5    |                  |                  |             |


### Día 4 (Sabado)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Se finalizó las ediciones de cada una de las entidades y se hicieron algunas modificaciones a la base de datos.         |        Tratar de gestionar las diferencias entre productos y libros en la base de datos, ya que algunas relaciones están causando conflictos cuando se trata de hacer un delete por las llaves foráneas.       |        Relaciones causan problemas al tratar de eliminar registros de una tabla.     |
| Jorge Zamora | - Generar una factura | - Existian libros y productos con el mismo id entonces daba error al momento de crear las cards | |
| Nombre 3    |                  |                  |             |
| Nahomi Aparicio|                  |                  |             |
| Nombre 5    |                  |                  |             |






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

### Evaluación del Sprint - XXXXXXXXXX

#### ¿Qué se hizo bien?
- 

#### ¿Qué se hizo mal?
- 

#### ¿Qué mejoras implementar?
- 

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





