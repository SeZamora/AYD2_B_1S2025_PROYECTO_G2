
##  2. Lista de requerimientos

#### Requerimientos funcionales 
- **RF01: El sistema debe permitir el registro de nuevos empleados, solicitando los siguientes datos: nombre, apellido, CUI, teléfono, correo electrónico, edad, género, fecha de contratación y fotografía.

- **RF02**: El sistema debe enviar automáticamente un correo de confirmación al nuevo empleado con su contraseña de acceso y un enlace de verificación de cuenta.

- **RF03**: El sistema debe impedir que los empleados accedan a la plataforma si no han confirmado su cuenta a través del correo electrónico enviado.

- **RF04**: El sistema debe permitir la eliminación de empleados del sistema, registrando la causa de la eliminación en un historial de logs.

- **RF05**: El sistema debe almacenar un historial de empleados eliminados, incluyendo sus datos personales y la razón de su desvinculación, para futuras contrataciones.

- **RF06**: El sistema debe permitir la modificación de los datos de contacto de los empleados, siendo  el número de teléfono y el correo electrónico.

- **RF07**: El sistema debe permitir la consulta de la información de los empleados activos en la empresa.

- **RF08**: El sistema debe mostrar un historial de ventas de cada empleado en su perfil, detallando las transacciones realizadas durante el mes.

- **RF09**: El sistema debe permitir a los supervisores agregar nuevos productos al inventario, solicitando los siguientes datos: nombre del producto, descripción, código del producto, categoría, precio de compra, precio de venta, cantidad en inventario e imagen del producto.

- **RF10**: El sistema debe permitir la actualización de la información de los productos, incluyendo su descripción, precio de venta y stock disponible.

- **RF11**: El sistema debe permitir la eliminación de productos del inventario, registrando en un historial de logs los productos eliminados y la razón de su eliminación.

- **RF12**: El sistema debe permitir la visualización de todas las facturas emitidas por los empleados, mostrando detalles como la fecha de emisión, el nombre del empleado responsable, el nombre del cliente y los productos vendidos.

- **RF13*: El sistema debe permitir la búsqueda de facturas mediante filtros como fecha, empleado responsable y cliente.

- **RF14**: El sistema debe permitir a los supervisores acceder a las opiniones y comentarios de los clientes sobre los libros vendidos.

- **RF15**: El sistema debe almacenar la retroalimentación de los clientes con los siguientes datos: calificación, comentario y fecha de la reseña.

- **RF16**: El sistema debe permitir a los supervisores agregar nuevos libros al catálogo, ingresando los siguientes datos: título del libro, autor, fecha de lanzamiento, descripción, género, stock y precio.

- **RF17**: El sistema debe diferenciar entre libros físicos y digitales, permitiendo gestionar stock solo en el caso de libros físicos.

- **RF18**: El sistema debe permitir a los empleados iniciar sesión con el correo registrado y la contraseña enviada por correo electrónico al momento de su contratación.

- **RF19**: El sistema debe permitir a los empleados registrar ventas en el sistema, seleccionando los productos comprados y calculando el total de la compra.

- **RF20**: El sistema debe almacenar un historial de ventas registradas por cada empleado, incluyendo fecha, productos vendidos y total de la transacción.

- **RF21**: El sistema debe permitir a los empleados consultar la información de los productos en el inventario, incluyendo nombre, descripción, precio y stock disponible.

- **RF22**: El sistema debe permitir a los empleados generar recibos o facturas en formato PDF al finalizar cada compra.

- **RF23**: El sistema debe incluir en cada factura los siguientes datos: ID o código único, nombre del vendedor, fecha y hora de emisión, nombre de los productos, unidades compradas, precio total de cada producto, total de la venta y nombre del comprador.

- **RF24**: El sistema debe permitir la consulta de facturas emitidas previamente, facilitando la verificación de compras y la asistencia en caso de reclamos.

- **RF25**: El sistema debe permitir a los empleados registrar pagos en efectivo en el sistema.

- **RF26**: El sistema debe permitir a los usuarios navegar por el catálogo de libros sin necesidad de iniciar sesión, mostrando detalles como título, autor, precio y descripción.

- **RF27**: El sistema debe permitir el registro de nuevos usuarios, solicitando los siguientes datos: correo electrónico, contraseña, nombre completo y edad.

- **RF28**: El sistema debe enviar un correo de confirmación a los nuevos usuarios para verificar su cuenta antes de permitirles acceder a la plataforma.

- **RF29**: El sistema debe almacenar las contraseñas de los usuarios en la base de datos de forma encriptada.

- **RF30**: El sistema debe permitir a los usuarios iniciar sesión con su correo electrónico y contraseña.

- **RF31**: El sistema debe permitir a los usuarios administrar su lista de deseos, agregando y eliminando libros según su interés.

- **RF32**: El sistema debe permitir a los usuarios calificar libros y dejar comentarios sobre su experiencia de compra o lectura.

- **RF33**: El sistema debe permitir la modificación o eliminación de comentarios y calificaciones por parte del usuario.

- **RF34**: El sistema debe permitir la búsqueda de libros en la plataforma a través de filtros como título, autor, género y precio.

- **RF35**: El sistema debe permitir a los usuarios agregar libros al carrito de compras y gestionar su contenido antes de realizar la compra.

- **RF36**: El sistema debe permitir a los usuarios seleccionar entre dos métodos de pago: pago contra entrega o recogida en tienda.

- **RF37**: El sistema debe solicitar la dirección de entrega a los usuarios que seleccionen pago contra entrega.

- **RF38**: El sistema debe generar automáticamente una factura digital para cada compra realizada por un usuario y almacenarla en su perfil.

- **RF39**: El sistema debe permitir a los usuarios acceder a su historial de compras y consultar facturas anteriores.

- **RF40**: El sistema debe permitir a los usuarios ver una sección con los libros mejor valorados por otros usuarios, actualizándose dinámicamente según las calificaciones recibidas.



## 5. Selección de patrón de arquitectura
#### Modelo cliente-servidor

![image](https://github.com/user-attachments/assets/818b2fb0-b0e0-4eac-9685-52212c679f21)

Se escogió esta arquitectura ya que permite separar las responsabilidades en tres distintas partes: vista, modelo y controlador.
La vista se encarga de mostrarle toda la información al usuario y de brindarle interactividad.
El modelo es responsable de almacenar los datos y de representar las reglas del negocio.
Al controlador se le delega la responsabilidad se actuar como intermediario entre la vista y el modelo, siendo este parte clave para asegurar la correcta interacción entre vista-modelo. El controlador se encarga de transmitir los datos de la vista al modelo y de obtener información del modelo y enviarlo a la vista.

Consideramos como grupo que es la mejor arquitectura a escoger ya que también es fácil de mantener y de trabajar con ella. Y permite trabajar con varios patrones de diseño y modularizar el código.





## 11. Tablero Kanban

Este tablero de divide cada uno por los módulos establecidos en el enunciado (supervisor, empleado, etc...)

![image](https://github.com/user-attachments/assets/30590f44-647e-41b7-a504-7132a7e58e46)

![image](https://github.com/user-attachments/assets/d000aa14-944a-4798-9f73-bdc483bea419)

