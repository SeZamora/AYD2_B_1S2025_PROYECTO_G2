# Documentación Sprint

# Semana del 16 al 21 de marzo

## Integrantes
1. **Diego Andres Huite Alvarez** - Carnet: 202003585
2. **Jorge Sebastian Zamora Polanco** - Carnet: 202002591
3. **Hugo Daniel Girón Garcia** - Carnet: 202004807
4.  **Genesis Nahomi Aparicio Acan** - Carnet: 202113293
5. **Nombre 5** - Carnet: XXXXXXX


## Daily Standup

### Día 1 (Lunes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Revisión de todos los delete por parte del backend. | Eliminación de libros y productos. | Algunas referencias a libros y productos causan problemas con el detalle de las facturas. |
| Jorge Zamora | - Visualizar Facturas. | - Ver libros en el área de compra y agregarlos al carrito. | - Libros y productos con el mismo ID causan errores al crear las cards. |
| **Hugo Girón** | - Pruebas utilizando Docker Compose para verificar la integración entre servicios. | - Revisar el login del gerente. | - Implementar el inicio de sesion para el gerente. |
| Nahomi Aparicio | - | - | - |
| Nombre 5 | - | - | - |

---

### Día 2 (Miércoles)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | Endpoint para el manejo de recibos por cada empleado. | Recuperación de contraseña de los usuarios. | - |
| Jorge Zamora | - Terminar los requisitos de la vista empleado. | - Crear la vista usuario. <br> - Ajustar el carrito de empleado para carrito usuario. | - Diferencias entre carritos. |
| **Hugo Girón** | - Implementar roles de usuario (gerente vs. supervisor). | - Generar reportes PDF automatizados. | - Supervisores accedían a vistas de gerente. |
| Nahomi Aparicio | - | - | - |
| Nombre 5 | - | - | - |

---

### Día 3 (Viernes)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | - | - | - |
| Jorge Zamora | - | - | - |
| **Hugo Girón** | - Generar reporte mensual de ventas en PDF. | - Preparar entorno para deploy local utilizando Docker. | - Formato PDF se desalineaba. |
| Nahomi Aparicio | - | - | - |
| Nombre 5 | - | - | - |

---

### Día 4 (Sábado)
| Integrante  | ¿Qué se hizo ayer? | ¿Qué se hará hoy? | Impedimentos |
|-------------|------------------|------------------|-------------|
| Diego Huite | - | - | - |
| Jorge Zamora | - | - | - |
| **Hugo Girón** | - Deploy en un servidor local utilizando Docker. | - Monitorear rendimiento post-deploy. | - Variables de entorno no se leían correctamente en el contenedor. |
| Nahomi Aparicio | - | - | - |
| Nombre 5 | - | - | - |

---




## Sprint Planning

### Sprint Backlog
| ID | Tarea | Prioridad | Estado |
|----|-------|----------|--------|
| 1  | Eliminación de empleado (Backend)      | Alta | Pendiente |
| 2  | Eliminación de supervisor (Backend)      | Alta | Pendiente |
| 3  | Eliminación de libros (Backend)      | Media | Pendiente |
| 4  | Eliminación de productos (Backend)      | Media | Pendiente |
| 5  | Obtener logs de empleados y supervisores (Backend)      | Media | Pendiente |
| 6  | Recuperación de contraseña de usuarios (Backend)      | Alta | Pendiente |



### Tablero Inicial
![image](https://github.com/user-attachments/assets/30590f44-647e-41b7-a504-7132a7e58e46)

![image](https://github.com/user-attachments/assets/d000aa14-944a-4798-9f73-bdc483bea419)


## Sprint Retrospective
---

### Evaluación del Sprint - 202003585

#### ¿Qué se hizo bien?
- Utilizar soft deletes en la base de datos para mantener la integridad de muchos datos.

#### ¿Qué se hizo mal?
- No tener en cuenta las dependencias múltiples que tenían algunas entidades, por lo que la modificación de tablas quitó tiempo.

#### ¿Qué mejoras implementar?
- Analizar más a profundiad el modelo de la base de datos y considerar situaciones como eliminaciones, ediciones, etc.

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
| 1  | Eliminación de empleado (Backend)       | Completada  |  - |
| 2  | Eliminación de supervisor (Backend)   | Completada  |  - |
| 3  |  Eliminación de libros (Backend)     | Completada  |  - |
| 4  |Eliminación de productos (Backend)      | Completada  |  - |
| 5  | Obtener logs de empleados y supervisores (Backend)     | Completada  | 
| 6  | Recuperación de contraseña de usuarios (Backend)    | Completada  | 







