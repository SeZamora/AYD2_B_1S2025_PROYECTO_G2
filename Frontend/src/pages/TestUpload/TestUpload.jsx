import { useState, useEffect } from "react";

const ProductoPage = () => {    
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        codigo: "",
        categoria: "",
        precio_compra: "",
        precio_venta: "",
        cantidad: "",
        imagen: null,
    });

    const [productos, setProductos] = useState([]);

    // Función para obtener productos desde el backend
    const fetchProductos = async () => {
        try {
            const response = await fetch("http://localhost:3000/product/getAllProducts");
            const data = await response.json();
            if (data.success) {
                setProductos(data.data);
            } else {
                console.error("Error obteniendo productos:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        
        try {
            const response = await fetch("http://localhost:3000/product/addProduct", {
                method: "POST",
                body: data,
            });
            
            if (response.ok) {
                alert("Producto agregado con éxito");
                setFormData({
                    nombre: "",
                    descripcion: "",
                    codigo: "",
                    categoria: "",
                    precio_compra: "",
                    precio_venta: "",
                    cantidad: "",
                    imagen: null,
                });

                // Refrescar la lista de productos después de agregar uno nuevo
                fetchProductos();
            } else {
                alert("Error al agregar el producto");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Formulario de Producto */}
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mb-10">
                <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
                    <input type="text" name="codigo" placeholder="Código" value={formData.codigo} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" name="precio_compra" placeholder="Precio de Compra" value={formData.precio_compra} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" name="precio_venta" placeholder="Precio de Venta" value={formData.precio_venta} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="file" name="imagen" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Enviar</button>
                </form>
            </div>

            {/* Grid de Productos */}
            <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
            <div className="grid grid-cols-3 gap-6">
                {productos.map((product) => (
                    <div key={product.id_producto} className="border p-4 rounded-lg shadow-lg">
                        {product.imagen && (
                            <img
                                src={`data:image/jpeg;base64,${product.imagen}`}
                                alt={product.nombre}
                                className="w-full h-48 object-cover rounded-md"
                            />
                        )}
                        <h2 className="text-lg font-bold mt-2">{product.nombre}</h2>
                        <p className="text-gray-600">{product.descripcion}</p>
                        <p className="text-blue-500 font-semibold mt-2">${product.precio_venta}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductoPage;
