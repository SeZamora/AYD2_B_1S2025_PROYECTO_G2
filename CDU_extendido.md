## Diagrama de CDU expandidos

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU001 |
| **Nombre**           | Ver Productos/Libros sin Iniciar Sesión |
| **Actor Principal**  | Usuario |
| **Precondiciones**   | - Deben existir productos/libros registrados en la tienda. |
| **Postcondiciones**  | - El usuario puede visualizar la lista de productos sin necesidad de autenticarse. |
| **Escenario Principal** | 1. El usuario accede a la página principal de la tienda en línea.<br>2. Selecciona la sección de productos/libros.<br>3. El sistema muestra la lista de productos disponibles con información básica (nombre, imagen, precio, autor, etc.).<br>4. El usuario puede explorar los productos sin necesidad de iniciar sesión. |
| **Escenario Alternativo** | - **No hay productos disponibles**: Si no hay productos registrados en la base de datos, el sistema muestra un mensaje informativo. |
| **Requisitos Especiales** | - Se debe restringir el acceso a funcionalidades avanzadas como agregar al carrito o comprar hasta que el usuario inicie sesión. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU002 |
| **Nombre**           | Inicio de Sesión |
| **Actor Principal**  | Gerente, Supervisor, Empleado, Usuario |
| **Precondiciones**   | - El supervisor/empleado/usuario debe tener una cuenta registrada en el sistema. |
| **Postcondiciones**  | - El usuario inicia sesión y obtiene acceso a su cuenta y funcionalidades restringidas. |
| **Escenario Principal** | 1. El gerente/supervisor/empleado/usuario accede a la opción "Iniciar Sesión".<br>2. Ingresa su correo y contraseña.<br>3. El sistema valida las credenciales.<br>4. Si las credenciales son correctas, el usuario es redirigido a su cuenta.<br>5. Se muestra un mensaje de bienvenida. |
| **Escenario Alternativo** | - **Credenciales incorrectas**: Si el correo o contraseña son incorrectos, el sistema muestra un mensaje de error.<br>- **Cuenta no verificada**: Si el Usuario no ha confirmado su correo, el sistema muestra un aviso y permite reenviar el enlace de verificación. |
| **Requisitos Especiales** | - Se debe permitir la opción de "Olvidé mi contraseña" para recuperar acceso.|
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU003 |
| **Nombre**           | Registro de Usuario |
| **Actor Principal**  | Usuario (Cliente) |
| **Precondiciones**   | - El usuario no debe tener una cuenta registrada en el sistema. |
| **Postcondiciones**  | - Se crea una nueva cuenta de usuario y se almacena en la base de datos.<br>- El usuario recibe un correo de confirmación. |
| **Escenario Principal** | 1. El usuario accede a la opción "Registrarse" en la página de inicio.<br>2. Ingresa los datos requeridos (nombre, correo electrónico, contraseña, etc.).<br>3. Confirma el registro.<br>4. El sistema valida que el correo no esté duplicado.<br>5. El sistema guarda la información en la base de datos.<br>6. Se envía un correo de confirmación al usuario.<br>7. El usuario debe confirmar su cuenta a través del enlace en el correo. |
| **Escenario Alternativo** | - **Correo ya registrado**: Si el correo ya existe en la base de datos, el sistema muestra un mensaje de error.<br>- **Datos inválidos**: Si los datos ingresados no cumplen con los requisitos, el sistema solicita correcciones. |
| **Requisitos Especiales** | - La contraseña debe almacenarse de forma encriptada.<br>- El correo de confirmación debe contener un enlace de verificación. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU004 |
| **Módulo**           | Agregar Supervisor |
| **Actor Principal**  | Gerente |
| **Precondiciones**   | - El gerente debe estar autenticado en el sistema.<br>- Debe tener permisos para agregar supervisores. |
| **Postcondiciones**  | - Se crea un nuevo supervisor en el sistema.<br>- Se genera un registro de auditoría de la acción. |
| **Escenario Principal** | 1. El gerente accede al módulo de administración de supervisores.<br>2. Selecciona la opción "Agregar Supervisor".<br>3. Ingresa los datos del nuevo supervisor (nombre, correo, contraseña, etc.).<br>4. Confirma la acción.<br>5. El sistema valida y guarda los datos.<br>6. El sistema notifica al gerente que el supervisor ha sido agregado exitosamente. |
| **Escenario Alternativo** | - **Error en datos ingresados**: Si algún campo es inválido, el sistema muestra un mensaje de error y solicita corrección.<br>- **Correo ya registrado**: Si el correo ya existe en el sistema, se muestra una alerta para usar otro correo. |
| **Requisitos Especiales** | - La contraseña del supervisor debe ser encriptada antes de almacenarse.<br>- Se debe enviar un correo de bienvenida con las credenciales al nuevo supervisor. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU005 |
| **Módulo**           | Eliminar Supervisor |
| **Actor Principal**  | Gerente |
| **Precondiciones**   | - El gerente debe estar autenticado en el sistema.<br>- Debe existir al menos un supervisor en el sistema. |
| **Postcondiciones**  | - El supervisor es eliminado del sistema.<br>- Se genera un registro de auditoría de la acción. |
| **Escenario Principal** | 1. El gerente accede al módulo de administración de supervisores.<br>2. Selecciona la opción "Eliminar Supervisor".<br>3. Busca y selecciona el supervisor a eliminar.<br>4. Confirma la acción.<br>5. El sistema valida la solicitud y elimina al supervisor.<br>6. El sistema notifica al gerente que el supervisor ha sido eliminado. |
| **Escenario Alternativo** | - **Supervisor no encontrado**: Si el supervisor no existe en la base de datos, el sistema muestra un mensaje de error.<br>- **Supervisor con empleados asignados**: Si el supervisor tiene empleados a su cargo, el sistema impide su eliminación hasta reasignarlos. |
| **Requisitos Especiales** | - Se debe registrar un historial de eliminación en la base de datos.<br>- Si un supervisor es eliminado, sus empleados deben ser reasignados automáticamente o manualmente. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU006 |
| **Módulo**           | Modificar información de supervisores |
| **Actor Principal**  | Gerente |
| **Precondiciones**   | - El gerente debe estar autenticado en el sistema.<br>- Debe existir al menos un supervisor registrado. |
| **Postcondiciones**  | - La información del supervisor es actualizada en la base de datos.<br>- Se genera un registro de auditoría de la modificación. |
| **Escenario Principal** | 1. El gerente accede al módulo de administración de supervisores.<br>2. Selecciona la opción "Modificar Supervisor".<br>3. Busca y selecciona el supervisor a modificar.<br>4. Edita los datos requeridos.<br>5. Confirma la modificación.<br>6. El sistema guarda los cambios y notifica al gerente. |
| **Escenario Alternativo** | - **Supervisor no encontrado**: Si el supervisor no existe en la base de datos, el sistema muestra un mensaje de error.<br>- **Datos inválidos**: Si algún campo no cumple con el formato requerido, el sistema muestra un mensaje de error y solicita corrección. |
| **Requisitos Especiales** | - Todos los cambios deben registrarse en un historial de modificaciones.<br>- Si se cambia el correo del supervisor, debe enviarse una notificación al nuevo correo. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU007 |
| **Nombre**           | Ver Información de Supervisores |
| **Actor Principal**  | Gerente |
| **Precondiciones**   | - El gerente debe estar autenticado en el sistema.<br>- Debe existir al menos un supervisor registrado. |
| **Postcondiciones**  | - La información del supervisor es visualizada en pantalla. |
| **Escenario Principal** | 1. El gerente accede al módulo de administración de supervisores.<br>2. Selecciona la opción "Ver Información de Supervisores".<br>3. El sistema muestra la lista de supervisores registrados.<br>4. El gerente selecciona un supervisor para ver detalles.<br>5. El sistema muestra la información detallada del supervisor seleccionado. |
| **Escenario Alternativo** | - **No hay supervisores registrados**: Si no hay supervisores en la base de datos, el sistema muestra un mensaje de advertencia. |
| **Requisitos Especiales** | - La información mostrada debe estar protegida y visible solo para usuarios autorizados.<br>- Se debe incluir una opción para exportar la información en formato PDF o Excel. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU008  |
| **Nombre**           | Visualizar Facturas o Recibos Emitidas |
| **Actor Principal**  | Gerente, Supervisor, Empleado |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe existir al menos una factura emitida. |
| **Postcondiciones**  | - Se muestran las facturas en pantalla.<br>- El usuario puede descargar o imprimir las facturas. |
| **Escenario Principal** | 1. El usuario accede al módulo de facturación.<br>2. Selecciona la opción "Visualizar Facturas".<br>3. El sistema muestra una lista de facturas emitidas con filtros de búsqueda.<br>4. El usuario puede seleccionar una factura para ver los detalles.<br>5. El sistema muestra la factura con información detallada. |
| **Escenario Alternativo** | - **No hay facturas disponibles**: Si no hay facturas en la base de datos, el sistema muestra un mensaje informativo. |
| **Requisitos Especiales** | - Se debe permitir la descarga de facturas en formato PDF.<br>- Se debe incluir un filtro de búsqueda por fecha y cliente. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU009 |
| **Nombre**           | Generar Reporte de Ventas |
| **Actor Principal**  | Gerente |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe existir al menos una venta registrada. |
| **Postcondiciones**  | - Se genera un reporte de ventas.<br>- El usuario puede descargar el reporte en formato PDF o Excel. |
| **Escenario Principal** | 1. El usuario accede al módulo de reportes.<br>2. Selecciona la opción "Generar Reporte de Ventas".<br>3. Especifica los filtros (rango de fechas, categoría, cliente, etc.).<br>4. Confirma la solicitud.<br>5. El sistema procesa la información y genera el reporte.<br>6. El usuario visualiza el reporte en pantalla y puede descargarlo. |
| **Escenario Alternativo** | - **No hay datos disponibles**: Si no hay ventas en el periodo seleccionado, el sistema muestra un mensaje informativo. |
| **Requisitos Especiales** | - El reporte debe incluir gráficos y estadísticas de ventas.<br>- Se debe permitir la exportación en formatos PDF y Excel. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU010 |
| **Nombre**           | Generar Reporte de Ganancias |
| **Actor Principal**  | Gerente |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe existir al menos un registro de ganancias. |
| **Postcondiciones**  | - Se genera un reporte de ganancias.<br>- El usuario puede descargar el reporte en formato PDF o Excel. |
| **Escenario Principal** | 1. El usuario accede al módulo de reportes.<br>2. Selecciona la opción "Generar Reporte de Ganancias".<br>3. Especifica los filtros (rango de fechas, categoría, etc.).<br>4. Confirma la solicitud.<br>5. El sistema calcula las ganancias y genera el reporte.<br>6. El usuario visualiza el reporte en pantalla y puede descargarlo. |
| **Escenario Alternativo** | - **No hay datos disponibles**: Si no hay ganancias registradas en el periodo seleccionado, el sistema muestra un mensaje informativo. |
| **Requisitos Especiales** | - El reporte debe incluir gráficos comparativos y tendencias de ganancias.<br>- Se debe permitir la exportación en formatos PDF y Excel. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU011 |
| **Nombre**           | Agregar Empleado |
| **Actor Principal**  | Supervisor |
| **Precondiciones**   | - El Supervisor debe estar autenticado en el sistema.<br>- Debe tener permisos para agregar empleados. |
| **Postcondiciones**  | - El nuevo empleado es registrado en la base de datos.<br>- Se envían las credenciales al correo del empleado. |
| **Escenario Principal** | 1. El Supervisor accede al módulo de gestión de empleados.<br>2. Selecciona la opción "Agregar Empleado".<br>3. Completa el formulario con los datos del empleado (nombre, puesto, salario, correo, etc.).<br>4. Confirma la operación.<br>5. El sistema valida los datos e inserta el registro en la base de datos.<br>6. El sistema envía un correo al nuevo empleado con sus credenciales de acceso. |
| **Escenario Alternativo** | - **Correo electrónico duplicado**: Si el correo ya está registrado, el sistema muestra un mensaje de error.<br>- **Datos inválidos**: Si algún campo no cumple con el formato requerido, el sistema solicita corrección. |
| **Requisitos Especiales** | - La contraseña debe ser generada automáticamente y encriptada.<br>- Se debe registrar la fecha y hora de ingreso del empleado. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU012 |
| **Nombre**           | Eliminar Empleado |
| **Actor Principal**  | Supervisor |
| **Precondiciones**   | - El Supervisor debe estar autenticado en el sistema.<br>- Debe existir al menos un empleado registrado. |
| **Postcondiciones**  | - El empleado es eliminado del sistema o marcado como inactivo.<br>- Se genera un registro de auditoría con la acción realizada. |
| **Escenario Principal** | 1. El Supervisor accede al módulo de gestión de empleados.<br>2. Selecciona la opción "Eliminar Empleado".<br>3. Busca y selecciona el empleado a eliminar.<br>4. Confirma la eliminación.<br>5. El sistema elimina o desactiva al empleado en la base de datos.<br>6. El sistema muestra un mensaje de confirmación. |
| **Escenario Alternativo** | - **Empleado no encontrado**: Si el empleado no existe, el sistema muestra un mensaje de error.<br>- **Empleado con registros activos**: Si el empleado tiene transacciones pendientes, el sistema impide su eliminación y muestra una advertencia. |
| **Requisitos Especiales** | - Se debe generar un registro de auditoría con la fecha y usuario que realizó la eliminación.<br>- Si el empleado tenía sesiones activas, estas deben cerrarse automáticamente. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU013 |
| **Nombre**           | Modificar Información de Empleado |
| **Actor Principal**  | Supervisor |
| **Precondiciones**   | - El Supervisor debe estar autenticado en el sistema.<br>- Debe existir al menos un empleado registrado. |
| **Postcondiciones**  | - La información del empleado es actualizada en la base de datos.<br>- Se genera un registro de auditoría de la modificación. |
| **Escenario Principal** | 1. El Supervisor accede al módulo de gestión de empleados.<br>2. Selecciona la opción "Modificar Empleado".<br>3. Busca y selecciona el empleado a modificar.<br>4. Edita los datos requeridos.<br>5. Confirma la modificación.<br>6. El sistema guarda los cambios y muestra un mensaje de éxito. |
| **Escenario Alternativo** | - **Empleado no encontrado**: Si el empleado no existe, el sistema muestra un mensaje de error.<br>- **Datos inválidos**: Si algún campo no cumple con el formato requerido, el sistema solicita corrección. |
| **Requisitos Especiales** | - Todos los cambios deben registrarse en un historial de modificaciones.<br>- Si se cambia el correo del empleado, debe enviarse una notificación al nuevo correo. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU014 |
| **Nombre**           | Ver Información de Empleado |
| **Actor Principal**  | Supervisor |
| **Precondiciones**   | - El Supervisor debe estar autenticado en el sistema.<br>- Debe existir al menos un empleado registrado. |
| **Postcondiciones**  | - La información del empleado es visualizada en pantalla. |
| **Escenario Principal** | 1. El Supervisor accede al módulo de gestión de empleados.<br>2. Selecciona la opción "Ver Información de Empleados".<br>3. El sistema muestra la lista de empleados registrados.<br>4. El Supervisor selecciona un empleado para ver detalles.<br>5. El sistema muestra la información detallada del empleado seleccionado. |
| **Escenario Alternativo** | - **No hay empleados registrados**: Si no hay empleados en la base de datos, el sistema muestra un mensaje informativo. |
| **Requisitos Especiales** | - La información mostrada debe estar protegida y visible solo para usuarios autorizados.<br>- Se debe incluir una opción para exportar la información en formato PDF o Excel. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU015 |
| **Nombre**           | Agregar Producto |
| **Actor Principal**  | Supervisor |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe tener permisos para agregar productos.<br>- Deben existir categorías de productos registradas. |
| **Postcondiciones**  | - El producto es almacenado en la base de datos.<br>- Se genera un registro de auditoría de la acción. |
| **Escenario Principal** | 1. El usuario accede al módulo de administración de productos.<br>2. Selecciona la opción "Agregar Producto".<br>3. Ingresa la información del producto (nombre, descripción, precio, stock, categoría, etc.).<br>4. Confirma la acción.<br>5. El sistema valida los datos y almacena el producto en la base de datos.<br>6. Se muestra un mensaje de confirmación. |
| **Escenario Alternativo** | - **Datos inválidos**: Si algún campo no cumple con el formato requerido, el sistema muestra un mensaje de error.<br>- **Producto duplicado**: Si el producto ya existe, el sistema muestra una advertencia y sugiere actualizarlo. |
| **Requisitos Especiales** | - Se debe permitir la carga de una imagen para el producto.<br>- El sistema debe validar que el precio y el stock sean valores positivos. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU016 |
| **Nombre**           | Actualizar Producto |
| **Actor Principal**  | Supervisor |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe existir al menos un producto registrado.<br>- El usuario debe tener permisos para modificar productos. |
| **Postcondiciones**  | - Los datos del producto son actualizados en la base de datos.<br>- Se genera un registro de auditoría de la modificación. |
| **Escenario Principal** | 1. El usuario accede al módulo de administración de productos.<br>2. Selecciona la opción "Actualizar Producto".<br>3. Busca y selecciona el producto a modificar.<br>4. Edita los datos requeridos.<br>5. Confirma la modificación.<br>6. El sistema guarda los cambios y notifica al usuario. |
| **Escenario Alternativo** | - **Producto no encontrado**: Si el producto no existe en la base de datos, el sistema muestra un mensaje de error.<br>- **Datos inválidos**: Si algún campo no cumple con el formato requerido, el sistema muestra un mensaje de error y solicita corrección. |
| **Requisitos Especiales** | - Todos los cambios deben registrarse en un historial de modificaciones.<br>- Si se cambia el precio del producto, debe actualizarse en la lista de ventas. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU017 |
| **Nombre**           | Eliminar Producto |
| **Actor Principal**  | Supervisor |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe existir al menos un producto registrado.<br>- El usuario debe tener permisos para eliminar productos. |
| **Postcondiciones**  | - El producto es eliminado de la base de datos.<br>- Se genera un registro de auditoría de la eliminación. |
| **Escenario Principal** | 1. El usuario accede al módulo de administración de productos.<br>2. Selecciona la opción "Eliminar Producto".<br>3. Busca y selecciona el producto a eliminar.<br>4. Confirma la acción.<br>5. El sistema elimina el producto de la base de datos.<br>6. Se muestra un mensaje de confirmación. |
| **Escenario Alternativo** | - **Producto no encontrado**: Si el producto no existe en la base de datos, el sistema muestra un mensaje de error.<br>- **Producto en uso**: Si el producto está asociado a una venta, el sistema impide su eliminación y sugiere desactivarlo. |
| **Requisitos Especiales** | - La eliminación de productos debe ser registrada para auditoría.<br>- Si un producto se elimina, no debe afectar registros históricos de ventas. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU018 |
| **Nombre**           | Ver Productos |
| **Actor Principal**  | Supervisor, Empleado |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema .<br>- Debe existir al menos un producto registrado. |
| **Postcondiciones**  | - Se muestra la lista de productos en pantalla.<br>- El usuario puede filtrar y buscar productos según categorías y precios. |
| **Escenario Principal** | 1. El usuario accede al módulo de productos.<br>2. Selecciona la opción "Ver Productos".<br>3. El sistema muestra la lista de productos registrados.<br>4. El usuario puede aplicar filtros y buscar productos específicos.<br>5. Si el usuario selecciona un producto, el sistema muestra su información detallada. |
| **Escenario Alternativo** | - **No hay productos disponibles**: Si no hay productos en la base de datos, el sistema muestra un mensaje informativo. |
| **Requisitos Especiales** | - La lista de productos debe actualizarse en tiempo real.<br>- Se debe permitir la visualización de imágenes y detalles de cada producto. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU019 |
| **Nombre**           | Vender Artículos |
| **Actor Principal**  | Empleado |
| **Precondiciones**   | - El empleado debe estar autenticado en el sistema.<br>- Debe existir stock disponible para los artículos vendidos. |
| **Postcondiciones**  | - La venta se registra en la base de datos.<br>- Se actualiza el stock de los artículos vendidos.<br>- Se genera un recibo o factura de la venta. |
| **Escenario Principal** | 1. El empleado accede al módulo de ventas.<br>2. Escanea o ingresa manualmente los productos a vender.<br>3. El sistema muestra el total de la compra.<br>4. El cliente elige el método de pago (efectivo).<br>5. El empleado confirma la venta.<br>6. El sistema registra la venta y actualiza el inventario.<br>7. Se genera un recibo o factura de la compra. |
| **Escenario Alternativo** | - **Stock insuficiente**: Si no hay suficientes unidades de un producto, el sistema alerta al empleado y sugiere alternativas.<br>- **Error en el precio**: Si hay discrepancias en el precio, el sistema permite corregirlo antes de completar la venta. |
| **Requisitos Especiales** | - Se debe garantizar que el stock se descuente correctamente tras la venta.<br>- La información de la venta debe guardarse en un historial de transacciones. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU020 |
| **Nombre**           | Generar Recibo o Factura |
| **Actor Principal**  | Empleado |
| **Precondiciones**   | - El empleado debe estar autenticado en el sistema.<br>- Se debe haber completado una venta. |
| **Postcondiciones**  | - Se genera un recibo o factura en formato digital o impreso.<br>- Se guarda un registro de la transacción en la base de datos. |
| **Escenario Principal** | 1. El empleado finaliza una venta.<br>2. El sistema solicita la emisión de un recibo o factura.<br>3. El empleado elige el tipo de comprobante.<br>4. El sistema genera el documento con los detalles de la compra.<br>5. El documento se muestra en pantalla y puede ser impreso o enviado por correo al cliente. |
| **Escenario Alternativo** | - **Error en la generación**: Si ocurre un fallo al generar el recibo, el sistema muestra un mensaje de error y permite intentarlo de nuevo. |
| **Requisitos Especiales** | - Los recibos deben incluir detalles de la compra, fecha, nombre del vendedor y total pagado.<br>- Se debe permitir la reimpresión de facturas previas si el cliente lo solicita. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU021 |
| **Nombre**           | Buscar Libro |
| **Actor Principal**  | Usuario |
| **Precondiciones**   | - Debe existir al menos un libro registrado en el sistema. |
| **Postcondiciones**  | - Se muestra una lista de libros según los criterios de búsqueda del usuario. |
| **Escenario Principal** | 1. El usuario accede a la sección de búsqueda de libros.<br>2. Ingresa el término de búsqueda (título, autor, género, etc.).<br>3. El sistema filtra los libros que coinciden con la búsqueda.<br>4. Se muestra la lista de resultados.<br>5. El usuario puede seleccionar un libro para ver su información detallada. |
| **Escenario Alternativo** | - **No hay coincidencias**: Si no se encuentran resultados, el sistema muestra un mensaje indicando que no hay libros disponibles para la búsqueda. |
| **Requisitos Especiales** | - La búsqueda debe ser rápida y soportar filtros avanzados (precio, categoría, autor, etc.). |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU022 |
| **Nombre**           | Agregar Libros al Carrito |
| **Actor Principal**  | Usuario |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe existir al menos un libro disponible en la tienda. |
| **Postcondiciones**  | - El libro es agregado al carrito del usuario. |
| **Escenario Principal** | 1. El usuario navega por la tienda y selecciona un libro.<br>2. Hace clic en la opción "Agregar al Carrito".<br>3. El sistema verifica la disponibilidad del libro.<br>4. El sistema añade el libro al carrito de compras.<br>5. Se muestra un mensaje confirmando la acción. |
| **Escenario Alternativo** | - **Stock agotado**: Si el libro no tiene stock, el sistema muestra una alerta indicando que no está disponible. |
| **Requisitos Especiales** | - Se debe permitir la edición del carrito (modificar cantidad, eliminar productos). |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU023 |
| **Nombre**           | Seleccionar Método de Pago (contra entrega o recoger en tienda) |
| **Actor Principal**  | Usuario |
| **Precondiciones**   | - El usuario debe tener al menos un libro en el carrito.<br>- Debe estar autenticado en el sistema. |
| **Postcondiciones**  | - Se registra el método de pago seleccionado en la orden del usuario. |
| **Escenario Principal** | 1. El usuario accede al carrito de compras y procede al pago.<br>2. Selecciona entre "Pago contra entrega" o "Recoger en tienda".<br>3. Si selecciona "Pago contra entrega", ingresa la dirección de entrega.<br>4. Si selecciona "Recoger en tienda", elige la sucursal.<br>5. Confirma la selección y procede con la compra.<br>6. El sistema guarda la información y muestra un mensaje de confirmación. |
| **Escenario Alternativo** | - **Dirección inválida**: Si la dirección ingresada no es válida, el sistema solicita corrección. |
| **Requisitos Especiales** | - El método de pago debe ser registrado en la base de datos para futuras referencias. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU024 |
| **Nombre**           | Generar Factura Digital |
| **Actor Principal**  | Empleado, Usuario |
| **Precondiciones**   | - El usuario debe haber completado una compra en la tienda. |
| **Postcondiciones**  | - Se genera una factura digital y se almacena en el perfil del usuario. |
| **Escenario Principal** | 1. El usuario finaliza una compra en la tienda.<br>2. El sistema genera automáticamente una factura digital.<br>3. La factura se almacena en la cuenta del usuario.<br>4. El usuario puede descargar la factura en formato PDF. |
| **Escenario Alternativo** | - **Error en generación**: Si ocurre un problema al generar la factura, el sistema muestra un mensaje de error y permite intentarlo de nuevo. |
| **Requisitos Especiales** | - La factura debe cumplir con las regulaciones fiscales.<br>- Debe contener información detallada de la compra. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU025 |
| **Nombre**           | Lista de Deseos |
| **Actor Principal**  | Usuario |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema. |
| **Postcondiciones**  | - El libro es agregado o eliminado de la lista de deseos del usuario. |
| **Escenario Principal** | 1. El usuario navega por la tienda y encuentra un libro de interés.<br>2. Hace clic en "Agregar a Lista de Deseos".<br>3. El sistema añade el libro a su lista personal.<br>4. El usuario puede acceder a su lista de deseos en cualquier momento.<br>5. Puede eliminar libros de la lista si ya no los desea. |
| **Escenario Alternativo** | - **Libro ya en la lista**: Si el libro ya está agregado, el sistema muestra un mensaje indicándolo. |
| **Requisitos Especiales** | - La lista de deseos debe estar vinculada a la cuenta del usuario.<br>- Debe haber una opción para mover libros del carrito a la lista de deseos y viceversa. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU026 |
| **Nombre**           | Ver Libros Más Votados |
| **Actor Principal**  | Usuario (Cliente) |
| **Precondiciones**   | - Debe haber libros con calificaciones de usuarios registradas. |
| **Postcondiciones**  | - Se muestra una lista de libros ordenados por calificación. |
| **Escenario Principal** | 1. El usuario accede a la sección "Más Votados".<br>2. El sistema recupera los libros con mejores calificaciones.<br>3. Se muestra una lista ordenada por puntuación.<br>4. El usuario puede seleccionar un libro para ver su información. |
| **Escenario Alternativo** | - **No hay libros calificados**: Si no hay calificaciones registradas, el sistema muestra un mensaje informativo. |
| **Requisitos Especiales** | - La lista debe actualizarse dinámicamente conforme los usuarios califican los libros. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU027 |
| **Nombre**           | Dejar Comentario y Calificación |
| **Actor Principal**  | Usuario|
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe haber comprado el libro previamente. |
| **Postcondiciones**  | - El comentario y la calificación son registrados en la base de datos.<br>- Se actualiza el promedio de calificación del libro. |
| **Escenario Principal** | 1. El usuario accede a la página del libro comprado.<br>2. Selecciona la opción "Dejar Comentario y Calificación".<br>3. Ingresa su comentario y selecciona una calificación (de 1 a 5 estrellas).<br>4. Confirma la acción.<br>5. El sistema guarda la información y la muestra en la sección de comentarios del libro. |
| **Escenario Alternativo** | - **Usuario no autenticado**: Si el usuario no ha iniciado sesión, el sistema solicita autenticación.<br>- **Usuario no ha comprado el libro**: Si el usuario no ha adquirido el libro, el sistema muestra un mensaje indicando que solo los compradores pueden calificar. |
| **Requisitos Especiales** | - La calificación debe actualizar el promedio general del libro.<br>- El comentario debe cumplir con las normas de la plataforma (sin lenguaje ofensivo). |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU028 |
| **Nombre**           | Editar Comentario |
| **Actor Principal**  | Usuario |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe haber publicado previamente un comentario sobre el libro. |
| **Postcondiciones**  | - Se actualiza el comentario y/o la calificación en la base de datos. |
| **Escenario Principal** | 1. El usuario accede a la sección de comentarios del libro.<br>2. Localiza su propio comentario y selecciona "Editar".<br>3. Modifica el texto del comentario y/o la calificación.<br>4. Confirma la edición.<br>5. El sistema guarda los cambios y actualiza la sección de comentarios. |
| **Escenario Alternativo** | - **Usuario intenta editar comentario de otro usuario**: El sistema impide la acción y muestra un mensaje de error. |
| **Requisitos Especiales** | - Se debe registrar un historial de cambios en la base de datos.<br>- La edición no debe afectar el promedio de calificación anterior. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU029 |
| **Nombre**           | Eliminar Comentario |
| **Actor Principal**  | Usuario |
| **Precondiciones**   | - El usuario debe estar autenticado en el sistema.<br>- Debe haber publicado previamente un comentario sobre el libro. |
| **Postcondiciones**  | - El comentario es eliminado de la base de datos.<br>- Se actualiza el promedio de calificación del libro. |
| **Escenario Principal** | 1. El usuario accede a la sección de comentarios del libro.<br>2. Localiza su propio comentario y selecciona "Eliminar".<br>3. Confirma la eliminación.<br>4. El sistema borra el comentario de la base de datos.<br>5. Se muestra un mensaje confirmando la eliminación. |
| **Escenario Alternativo** | - **Usuario intenta eliminar comentario de otro usuario**: El sistema impide la acción y muestra un mensaje de error. |
| **Requisitos Especiales** | - Si el comentario eliminado contenía una calificación, se debe recalcular el promedio del libro.<br>- Se debe almacenar un registro del comentario eliminado por seguridad. |
| **Sistema** | Librería "Don Héctor" |

---
---
---

| Campo                | Descripción |
|----------------------|-------------|
| **ID Caso de Uso**   | CU030 |
| **Nombre**           | Ver Comentarios y Valoraciones |
| **Actor Principal**  | Supervisor, Usuario |
| **Precondiciones**   | - El usuario debe estar autenticado como supervisor.<br>- Debe haber comentarios registrados en el sistema. |
| **Postcondiciones**  | - El supervisor puede visualizar y filtrar comentarios según calificación o fecha. |
| **Escenario Principal** | 1. El supervisor accede al módulo de gestión de comentarios.<br>2. Selecciona la opción "Ver Comentarios y Valoraciones".<br>3. El sistema muestra una lista de comentarios ordenados por fecha y calificación.<br>4. El supervisor puede aplicar filtros para revisar comentarios específicos.<br>5. Si detecta contenido inapropiado, puede marcarlo para revisión o eliminación. |
| **Escenario Alternativo** | - **No hay comentarios registrados**: El sistema muestra un mensaje indicando que aún no hay valoraciones disponibles. |
| **Requisitos Especiales** | - Se debe permitir al supervisor marcar comentarios inapropiados para revisión.<br>- El sistema debe ofrecer opciones de filtrado avanzado. |
| **Sistema** | Librería "Don Héctor" |
