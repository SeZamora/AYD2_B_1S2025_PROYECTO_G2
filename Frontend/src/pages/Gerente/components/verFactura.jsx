import { jsPDF } from "jspdf"; // Importar jsPDF para generar PDFs
import { useState, useEffect } from "react"; // Importar useEffect y useState

const VerFactura = ({ facturaEncontrada }) => {
    const [productos, setProductos] = useState({}); // Estado para almacenar los nombres de los productos

    
    const ProductName = async (producto_id) => {
        try {
            const response = await fetch("http://localhost:3000/product/getProductById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_producto: producto_id }), 
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data.product.nombre; 
            } else {
                console.error("Error al obtener el nombre del producto");
                return "Producto desconocido";
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return "Producto desconocido";
        }
    };

    // Obtener los nombres de los productos al cargar el componente
    useEffect(() => {
        const fetchProductos = async () => {
            const productosMap = {};
            for (const detalle of facturaEncontrada.detalles) {
                const nombreProducto = await ProductName(detalle.producto_id);
                productosMap[detalle.producto_id] = nombreProducto;
            }
            setProductos(productosMap);
        };

        fetchProductos();
    }, [facturaEncontrada.detalles]);

    // Función para descargar la factura como archivo de texto
    const downloadTextFactura = () => {
        const contenido = `
      Factura #${facturaEncontrada.id_facturas}
      ========================
      Vendedor: ${facturaEncontrada.nombre_vendedor}
      Comprador: ${facturaEncontrada.nombre_comprador}
      Fecha y Hora: ${new Date(facturaEncontrada.fecha_hora).toLocaleString()}
      Total de Venta: Q${facturaEncontrada.total_venta}

      Detalles de la Factura:
      ------------------------
      ${facturaEncontrada.detalles
                .map(
                    (detalle) => `
        Producto: ${productos[detalle.producto_id] || "Producto desconocido"}
        Producto ID: ${detalle.producto_id}
        Unidades Compradas: ${detalle.unidades_compradas}
        Precio Unitario: Q${detalle.precio_producto}
        Subtotal: Q${(detalle.unidades_compradas * parseFloat(detalle.precio_producto)).toFixed(2)}
      `
                )
                .join("\n")}
    `;

        // Crear un archivo de texto
        const blob = new Blob([contenido], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.download = `factura_${facturaEncontrada.id_facturas}.txt`; // Nombre del archivo
        document.body.appendChild(link);
        link.click();

        // Limpiar
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Función para descargar la factura como PDF
    const downloadPDFFactura = () => {
        const doc = new jsPDF();

        // Agregar contenido al PDF
        doc.text(`Factura #${facturaEncontrada.id_facturas}`, 10, 10);
        doc.text(`Vendedor: ${facturaEncontrada.nombre_vendedor}`, 10, 20);
        doc.text(`Comprador: ${facturaEncontrada.nombre_comprador}`, 10, 30);
        doc.text(`Fecha y Hora: ${new Date(facturaEncontrada.fecha_hora).toLocaleString()}`, 10, 40);
        doc.text(`Total de Venta: Q${facturaEncontrada.total_venta}`, 10, 50);

        // Agregar detalles de la factura
        let y = 60;
        facturaEncontrada.detalles.forEach((detalle) => {
            doc.text(`Producto: ${productos[detalle.producto_id] || "Producto desconocido"}`, 10, y);
            doc.text(`Producto ID: ${detalle.producto_id}`, 10, y + 10);
            doc.text(`Unidades Compradas: ${detalle.unidades_compradas}`, 10, y + 20);
            doc.text(`Precio Unitario: Q${detalle.precio_producto}`, 10, y + 30);
            doc.text(`Subtotal: Q${(detalle.unidades_compradas * parseFloat(detalle.precio_producto)).toFixed(2)}`, 10, y + 40);
            y += 50;
        });

        // Guardar el PDF
        doc.save(`factura_${facturaEncontrada.id_facturas}.pdf`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            {/* Encabezado de la factura */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Factura #{facturaEncontrada.id_facturas}</h1>
                <p className="text-sm text-gray-500">Detalles de la transacción</p>
            </div>

            {/* Información de la factura */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <p className="text-gray-600"><strong>Vendedor:</strong> {facturaEncontrada.nombre_vendedor}</p>
                    <p className="text-gray-600"><strong>Comprador:</strong> {facturaEncontrada.nombre_comprador}</p>
                </div>
                <div>
                    <p className="text-gray-600"><strong>Fecha y Hora:</strong> {new Date(facturaEncontrada.fecha_hora).toLocaleString()}</p>
                    <p className="text-gray-600"><strong>ID Empleado:</strong> {facturaEncontrada.empleados_id}</p>
                </div>
            </div>

            {/* Tabla de detalles de la factura */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Producto</th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Unidades Compradas</th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Precio Unitario</th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturaEncontrada.detalles.map((detalle, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {productos[detalle.producto_id] || "Cargando..."}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">{detalle.unidades_compradas}</td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">Q {detalle.precio_producto}</td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">Q {(detalle.unidades_compradas * parseFloat(detalle.precio_producto)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total de la venta */}
            <div className="mt-8 text-right">
                <p className="text-lg font-semibold text-gray-800">
                    <strong>Total de la Venta:</strong> Q {facturaEncontrada.total_venta}
                </p>
            </div>

            {/* Botones para descargar la factura */}
            <div className="mt-8 flex justify-end gap-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={downloadTextFactura}
                >
                    Descargar como TXT
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={downloadPDFFactura}
                >
                    Descargar como PDF
                </button>
            </div>
        </div>
    );
};

export default VerFactura;