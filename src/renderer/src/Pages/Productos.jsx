import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../components/config';

const Productos = () => {
    const url = config.API_URL;

    const [productos, setProductos] = useState([]);
    const [productosOriginal, setProductosOriginal] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [nombreEditar, setNombreEditar] = useState('');
    const [precioEditar, setPrecioEditar] = useState('');
    const [stockEditar, setStockEditar] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    
    // Confirmación states
    const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const jalarDatos = () => {
        fetch(`${url}/productos`)
            .then((response) => response.json())
            .then((data) => {
                const productosActivos = data.filter((producto) => producto.estado === true);
                setProductos(productosActivos);
                setProductosOriginal(productosActivos);
            })
            .catch((error) => console.error('Error al obtener productos:', error));
    };

    useEffect(() => {
        jalarDatos();
    }, []);

    // Búsqueda de productos
    const handleBuscarProducto = (textoBusqueda) => {
        setBusqueda(textoBusqueda);
        if (!textoBusqueda) {
            setProductos(productosOriginal);
            return;
        }

        const productosFiltrados = productosOriginal.filter(producto => 
            producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
        );
        setProductos(productosFiltrados);
    };

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
            estado: true,
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

    // Confirmar eliminación de producto
    const confirmarEliminarProducto = (producto) => {
        setProductoAEliminar(producto);
        setMostrarConfirmacionEliminar(true);
    };

    // Eliminar producto
    const handleEliminarProducto = async () => {
        if (!productoAEliminar) return;

        try {
            const response = await fetch(`${url}/productos/estado/${productoAEliminar.id}?estado=false`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            // Limpiar selección si el producto eliminado estaba seleccionado
            if (productoSeleccionado && productoSeleccionado.id === productoAEliminar.id) {
                setProductoSeleccionado(null);
                setNombreEditar('');
                setPrecioEditar('');
                setStockEditar('');
            }
            
            toast.success('Producto eliminado exitosamente');
            setMostrarConfirmacionEliminar(false);
            jalarDatos();
            
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            toast.error('Error al eliminar el producto');
        }
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
            estado: true,
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
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
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
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
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
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="Stock del producto"
                                    min="0"
                                />
                            </div>
                        </div>
                        
                        <button
                            onClick={handleAgregarProducto}
                            className="w-full bg-green-500 text-[14px] font-[700] bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-green-700"
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
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
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
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
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
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                            value={stockEditar}
                                            onChange={(e) => setStockEditar(e.target.value)}
                                            placeholder="Stock del producto"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                
                                <button
                                    onClick={handleActualizarProducto}
                                    className="w-full bg-blue-500 text-[14px] font-[700] bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
                        <div className="mb-4">
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                value={busqueda} 
                                onChange={(e) => handleBuscarProducto(e.target.value)} 
                                placeholder="Buscar productos por nombre" 
                            />
                        </div>
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
                                        <tr key={producto.id} className="border-t border-gray-500">
                                            <td className="px-4 py-2">{producto.nombre}</td>
                                            <td className="px-4 py-2 text-right">{producto.precio}</td>
                                            <td className="px-4 py-2 text-right">{producto.stock}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => {
                                                        setProductoSeleccionado(producto);
                                                        setNombreEditar(producto.nombre);
                                                        setPrecioEditar(producto.precio);
                                                        setStockEditar(producto.stock);
                                                    }}
                                                    className="bg-blue-500 bg-opacity-70 text-[14px] text-white px-2 py-1 rounded-md hover:bg-blue-700 mx-1"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => confirmarEliminarProducto(producto)}
                                                    className="text-[14px] bg-red-500 text-white px-2 bg-opacity-70 py-1 rounded-md hover:bg-red-700 mx-1"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {productos.length === 0 && (
                                <div className="text-center py-4 text-gray-400">
                                    No se encontraron productos
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmación de Eliminación */}
            {mostrarConfirmacionEliminar && (
            <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
                <div className="bg-secundario text-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                    <p className="mb-6">¿Estás seguro de que deseas eliminar el producto "{productoAEliminar?.nombre}"?</p>
                    <div className="flex justify-end space-x-4">
                        <button 
                            onClick={() => setMostrarConfirmacionEliminar(false)} 
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleEliminarProducto} 
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Productos;