import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../components/config'

const Productos = () => {

    const url = config.API_URL

    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [nombreEditar, setNombreEditar] = useState('');
    const [precioEditar, setPrecioEditar] = useState('');
    const [stockEditar, setStockEditar] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // Obtener productos al cargar el componente
    const jalarDatos = () => {
        fetch(`${url}/productos`)
            .then((response) => response.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error('Error al obtener productos:', error));
    }

    useEffect(() => {
        jalarDatos();
    }, []);

    // Agregar un producto
    const handleAgregarProducto = () => {
        const precioNumerico = parseFloat(precio);
        const stockNumerico = parseInt(stock);

        if (!nombre || isNaN(precioNumerico) || isNaN(stockNumerico)) {
            toast.error('Por favor, ingresa un nombre válido, un precio numérico y un stock válido.');
            return;
        }

        const nuevoProducto = {
            nombre,
            precio: precioNumerico,
            stock: stockNumerico,
        };

        fetch(`${url}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProducto),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === 'Producto guardado exitosamente') {
                    setProductos([...productos, nuevoProducto]);
                    setNombre('');
                    setPrecio('');
                    setStock('');
                    toast.success('Producto agregado exitosamente.');
                    jalarDatos();
                } else {
                    toast.error('Hubo un error al guardar el producto');
                }
            })
            .catch((error) => console.error('Error al agregar producto:', error));
    };

    // Eliminar un producto
    const handleEliminarProducto = (id) => {
        fetch(`${url}/productos/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === 'Producto eliminado exitosamente') {
                    setProductos(productos.filter((producto) => producto.id !== id));
                    toast.success('Producto eliminado exitosamente.');
                    jalarDatos();
                } else {
                    toast.error('Hubo un error al eliminar el producto');
                }
            })
            .catch((error) => console.error('Error al eliminar producto:', error));
    };

    // Actualizar un producto
    const handleActualizarProducto = () => {
        if (!productoSeleccionado || !nombreEditar || isNaN(parseFloat(precioEditar)) || isNaN(parseInt(stockEditar))) {
            toast.error('Completa los datos correctamente.');
            
            return;
        }

        const productoActualizado = {
            nombre: nombreEditar,
            precio: parseFloat(precioEditar),
            stock: parseInt(stockEditar),
        };

        fetch(`${url}/productos/${productoSeleccionado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productoActualizado),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === 'Producto actualizado exitosamente') {
                    setProductos(productos.map((producto) =>
                        producto.id === productoSeleccionado.id ? { ...productoSeleccionado, ...productoActualizado } : producto
                    ));
                    setProductoSeleccionado(null);
                    setNombreEditar('');
                    setPrecioEditar('');
                    setStockEditar('');
                    toast.success('Producto actualizado exitosamente.');
                    jalarDatos();
                } else {
                    toast.error('Hubo un error al actualizar el producto');
                }
            })
            .catch((error) => console.error('Error al actualizar producto:', error));
    };

    return (
        <div className="bg-primario text-white flex h-screen">
            <Sidebar />
            <div className="w-full flex flex-col">
                <Header name="Gestión de Productos" />
                <div className="flex-1 flex p-6">
                    <div className="bg-secundario p-6 border-r border-gray-600 rounded-l-lg w-[700px]">
                        <h2 className="text-lg font-bold mb-4">Agregar Producto</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Nombre del Producto</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Nombre del producto"
                            />
                        </div>
                        <div className='flex gap-2'>
                            <div className="mb-4">
                                <label className="block mb-1">Precio (S/)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    placeholder="Precio del producto"
                                    min="0"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Stock</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="Stock del producto"
                                    min="0"
                                />
                            </div>
                        </div>
                        
                        <button
                            onClick={handleAgregarProducto}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                        >
                            Agregar Producto
                        </button>
                        <h2 className="text-lg font-bold mt-8 mb-4">Editar Producto</h2>
                        {productoSeleccionado ? (
                            <>
                                <div className="mb-4">
                                    <label className="block mb-1">Nombre del Producto</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                        value={nombreEditar}
                                        onChange={(e) => setNombreEditar(e.target.value)}
                                        placeholder="Nombre del producto"
                                    />
                                </div>
                                <div className='flex gap-2'>
                                    <div className="mb-4">
                                        <label className="block mb-1">Precio (S/)</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                            value={precioEditar}
                                            onChange={(e) => setPrecioEditar(e.target.value)}
                                            placeholder="Precio del producto"
                                            min="0"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1">Stock</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                            value={stockEditar}
                                            onChange={(e) => setStockEditar(e.target.value)}
                                            placeholder="Stock del producto"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                
                                <button
                                    onClick={handleActualizarProducto}
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                                >
                                    Actualizar Producto
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-400">Selecciona un producto para editar.</p>
                        )}
                    </div>
                    <div className="w-full rounded-r-lg bg-secundario p-6">
                        <h2 className="text-lg font-bold mb-4">Listado de Productos</h2>
                        <div className="border border-gray-600 rounded-lg max-h-[65vh] overflow-y-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-600 h-[40px]">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Nombre</th>
                                        <th className="px-4 py-2 text-right">Precio (S/)</th>
                                        <th className="px-4 py-2 text-right">Stock</th>
                                        <th className="px-4 py-2 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto) => (
                                        <tr key={producto.id} className="border-b-2 border-gray-600">
                                            <td className="px-4 py-2">{producto.nombre}</td>
                                            <td className="px-4 py-2 text-right">S/ {producto.precio.toFixed(2)}</td>
                                            <td className="px-4 py-2 text-right">{producto.stock}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => {
                                                        setProductoSeleccionado(producto);
                                                        setNombreEditar(producto.nombre);
                                                        setPrecioEditar(producto.precio.toString());
                                                        setStockEditar(producto.stock.toString());
                                                    }}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 mx-1"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleEliminarProducto(producto.id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 mx-1"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productos;
