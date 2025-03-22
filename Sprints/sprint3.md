# Documentación Sprint

# Semana del 16 al 21 de marzo

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
| Diego Huite | Revisión de todos los delete por parte del backend. | Eliminación de libros y productos. | Algunas referencias a libros y productos causan problemas con el detalle de las facturas. |
| Jorge Zamora | - Visualizar Facturas. | - Ver libros en el área de compra y agregarlos al carrito. | - Libros y productos con el mismo ID causan errores al crear las cards. |
| **Hugo Girón** | - Pruebas utilizando Docker Compose para verificar la integración entre servicios. | - Revisar el login del gerente. | - Implementar el inicio de sesion para el gerente. |
| Nahomi Aparicio | Se arreglaron algunas rutas de el frontend y  algunos tablas para merjor visualizacion |Realizar la vista de las facturas que los empleados a cargo del supervisor generan| el navbar de supervisores no mostraba los iconos  y no lograban tener funcion por unas librerias  |

| Lesther López | Revision de los metodos get y post del backend | Crear la eliminación y la edición de las reseñas | Errores en parametros de consultas |

---

### Día 2 (martes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Endpoint para el manejo de recibos por cada empleado. | Recuperación de contraseña de los usuarios. | - |
| Jorge Zamora | - Terminar los requisitos de la vista empleado. | - Crear la vista usuario. <br> - Ajustar el carrito de empleado para carrito usuario. | - Diferencias entre carritos. |
| **Hugo Girón** | - Implementar roles de usuario (gerente vs. supervisor). | - Generar reportes PDF automatizados. | - Supervisores accedían a 
| Nahomi Aparicio | - Se creo la vista de las facturas de los empleados a cargo del supervisor <br> - las facturas se logran flintrar segun el cliente , el empleado  y la fecha  | Conectar los endpoints al front para poder lograr  la eliminacion de productos, libros y empleados  | - |
| Lesther López | Se revisó la implementación de los endpoints de reseñas | Implementar el patron de diseño Command para los endpoints de reseñas | Falta de clases para implementar el patron Command. |


---

### Día 3 (Miercoles)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | - | - | - |
| Jorge Zamora | - | - | - |
| **Hugo Girón** | - Generar reporte mensual de ventas en PDF. | - Preparar entorno para deploy local utilizando Docker. | - Formato PDF se desalineaba. |
| Nahomi Aparicio | se conectaron varios endpoints de backend para los empleados al igual que los endpoints para eliminar productos y libros<br> - se agrego el mopdal para poder ver las ventas que cada empleado realizo |se ara la vista de las alertas de productos y libros a punto de agotarse| - |
| Lesther Lopez | Se implementó el patron command en reseñas | Implementar endpoints para la generación de reportes | - |


---

### Día 4 (Viernes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | - | - | - |
| Jorge Zamora | - | - | - |
| **Hugo Girón** | - Deploy en un servidor local utilizando Docker. | - Monitorear rendimiento post-deploy. | - Variables de entorno no se leían correctamente en el contenedor. |
| Nahomi Aparicio | Se agregaron las alertas de productos y libros a punto de agotarse| - | - |
| Lesther López | Se crearon endpoints para la generación de reportes | Configurar las alertas de stock en los productos | - |


---



## Sprint Planning

### Sprint Backlog
## Sprint Planning

| ID   | Tarea                                                          | Prioridad | Estado      |
|------|----------------------------------------------------------------|-----------|-------------|
| 1    | Revisión de todos los "delete" por parte del backend           | Alta      | Completado  |
| 2    | Eliminación de libros y productos                              | Alta      | En Proceso  |
| 3    | Visualizar Facturas                                            | Alta      | Completado  |
| 4    | Ver libros en el área de compra y agregarlos al carrito         | Alta      | En Proceso  |
| 5    | Pruebas con Docker Compose para la integración                 | Media     | Completado  |
| 6    | Revisar el login del gerente                                   | Alta      | En Proceso  |
| 7    | Arreglar rutas del frontend y mejorar tablas                   | Alta      | Completado  |
| 8    | Realizar la vista de facturas generadas por empleados          | Alta      | En Proceso  |
| 9    | Revisión de métodos GET y POST del backend                     | Media     | Completado  |
| 10   | Crear eliminación y edición de reseñas                         | Alta      | En Proceso  |
| 11   | Endpoint para el manejo de recibos por cada empleado           | Alta      | En Proceso  |
| 12   | Recuperación de contraseña de los usuarios                    | Alta      | En Proceso  |
| 13   | Terminar requisitos de la vista empleado                       | Alta      | Completado  |
| 14   | Crear la vista usuario y ajustar el carrito de empleado        | Alta      | En Proceso  |
| 15   | Implementar roles de usuario (gerente vs. supervisor)          | Alta      | Completado  |
| 16   | Generar reportes PDF automatizados                            | Alta      | En Proceso  |
| 17   | Crear vista de facturas de empleados a cargo del supervisor    | Alta      | Completado  |
| 18   | Conectar los endpoints al frontend para eliminación de productos| Alta     | En Proceso  |
| 19   | Implementar patrón Command para los endpoints de reseñas       | Alta      | En Proceso  |
| 20   | Generar reporte mensual de ventas en PDF                       | Alta      | En Proceso  |
| 21   | Preparar entorno para deploy local utilizando Docker          | Alta      | En Proceso  |
| 22   | Conectar varios endpoints de backend para empleados            | Alta      | Completado  |
| 23   | Agregar modal para visualizar ventas realizadas por empleados | Alta      | Completado  |
| 24   | Crear vista de alertas de productos y libros a punto de agotarse| Alta      | En Proceso  |
| 25   | Implementar endpoints para la generación de reportes          | Alta      | En Proceso  |
| 26   | Deploy en servidor local utilizando Docker                     | Alta      | En Proceso  |
| 27   | Monitorear rendimiento post-deploy                             | Alta      | En Proceso  |
| 28   | Agregar alertas de productos y libros a punto de agotarse      | Alta      | Completado  |
| 29   | Configurar alertas de stock en los productos                   | Alta      | En Proceso  |




### Tablero Inicial
![image](https://github.com/SeZamora/AYD2_B_1S2025_PROYECTO_G2/blob/feature/202113293/Sprints/Imagenes/202113293_2.PNG)

![image](https://github.com/user-attachments/assets/a90b32b9-2db6-44b0-9ad7-1e82c6758044)


## Sprint Retrospective
---

### Evaluación del Sprint - 202003585

#### ¿Qué se hizo bien?
- Utilizar soft deletes en la base de datos para mantener la integridad de muchos datos.

#### ¿Qué se hizo mal?
- No tener en cuenta las dependencias múltiples que tenían algunas entidades, por lo que la modificación de tablas quitó tiempo.

#### ¿Qué mejoras implementar?
- Analizar más a profundiad el modelo de la base de datos y considerar situaciones como eliminaciones, ediciones, etc.

#### Backlog final


| ID   | Tarea                                                          | Estado Final  | Justificación si no se completó                  |
|------|----------------------------------------------------------------|---------------|---------------------------------------------------|
| 1    | Revisión de todos los "delete" por parte del backend           | Completado    |                                                   |
| 2    | Eliminación de libros y productos                              | Completada  |  |
| 11   | Endpoint para el manejo de recibos por cada empleado           | Completada   | |


#### tablero final
![image](https://github.com/user-attachments/assets/9b733d3e-18c3-4c99-b707-e1bbd3fc5cc9)


---

### Evaluación del Sprint - 202110897

#### ¿Qué se hizo bien?
- Se utilizó de manera adecuada los patrones de diseño en el backend.


#### ¿Qué se hizo mal?
- No tomar en cuenta el manejo adecuado del minimo de stock en las tablas, ya que algunos productos tenian menos stock que el minimo considerado. 

#### ¿Qué mejoras implementar?
- Mejorar la comunicación entre el equipo de desarrollo para establecer de mejor manera la implementacion de los patrones de diseño.
---

### Evaluación del Sprint - 202113293

#### ¿Qué se hizo bien?
- Se creó la vista de facturas de los empleados a cargo del supervisor, permitiendo filtrarlas por cliente, empleado y fecha.

- Se logró la conexión de varios endpoints del backend para la gestión de empleados, así como la eliminación de productos y libros.

#### ¿Qué se hizo mal?
- El navbar de supervisores no mostraba los íconos correctamente debido a problemas con librerías no contempladas previamente.

- Se presentaron algunos problemas de integración con los endpoints de eliminación.

#### ¿Qué mejoras implementar?
- Revisar y verificar que todas las librerías necesarias estén correctamente instaladas antes de implementar nuevas funcionalidades.

- Realizar pruebas más detalladas de la integración entre frontend y backend antes de desplegar cambios.



---

### Evaluación del Sprint - 202110897

#### ¿Qué se hizo bien?
- Se utilizó de manera adecuada los patrones de diseño en el backend.


#### ¿Qué se hizo mal?
- No tomar en cuenta el manejo adecuado del minimo de stock en las tablas, ya que algunos productos tenian menos stock que el minimo considerado. 

#### ¿Qué mejoras implementar?
- Mejorar la comunicación entre el equipo de desarrollo para establecer de mejor manera la implementacion de los patrones de diseño.
---









