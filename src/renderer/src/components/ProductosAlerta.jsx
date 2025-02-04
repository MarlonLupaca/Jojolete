import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import config from '../components/config';

const ProductosAlerta = () => {
    const url = config.API_URL;
    const [productosAlerta, setProductosAlerta] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [nuevoStock, setNuevoStock] = useState('');

    const obtenerProductosAlerta = () => {
        fetch(`${url}/productos/stock-bajo`)
        .then(response => response.json())
        .then(data => setProductosAlerta(data))
        .catch(error => {
            console.error('Error al obtener productos en alerta:', error);
            toast.error('Error al cargar los productos en alerta');
        });
    };

    useEffect(() => {
        obtenerProductosAlerta();
    }, []);

    const handleActualizarStock = () => {
        if (!productoSeleccionado || !nuevoStock || nuevoStock < 0) {
        toast.error('Por favor ingresa una cantidad válida');
        return;
        }

        fetch(`${url}/productos/${productoSeleccionado.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...productoSeleccionado,
            stock: parseInt(nuevoStock)
        }),
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Producto actualizado exitosamente') {
            toast.success('Stock actualizado correctamente');
            obtenerProductosAlerta();
            setProductoSeleccionado(null);
            setNuevoStock('');
            } else {
            toast.error('Error al actualizar el stock');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Error al actualizar el stock');
        });
    };

    return (
        <div className="flex gap-6 h-[75vh] text-white">
        {/* Tabla de productos */}
        <div className="flex-1">
            <div className="rounded-lg px-4">
            <h2 className="text-lg font-bold mb-4">Productos con Stock Bajo</h2>
            <div className="border relative border-gray-600 rounded-lg h-[65vh] overflow-y-auto">
                <table className="w-full border-collapse">
                <thead className="bg-gray-700 sticky top-0">
                    <tr>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-right">Precio (S/)</th>
                    <th className="px-4 py-3 text-center">Stock Actual</th>
                    <th className="px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosAlerta.map((producto) => (
                    <tr 
                        key={producto.id} 
                        className={`border-b border-gray-600 hover:bg-gray-700 transition-colors
                        ${productoSeleccionado?.id === producto.id ? 'bg-gray-700' : ''}`}
                    >
                        <td className="px-4 py-3">{producto.nombre}</td>
                        <td className="px-4 py-3 text-right">S/ {producto.precio.toFixed(2)}</td>
                        <td className="px-4 py-3 flex justify-center items-center">
                            <span className="w-8 h-8 flex justify-center items-center text-center bg-red-500 bg-opacity-20 rounded-full text-red-400">
                                {producto.stock}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                        <button
                            onClick={() => {
                            setProductoSeleccionado(producto);
                            setNuevoStock(producto.stock.toString());
                            }}
                            className="bg-blue-500 bg-opacity-70 text-[14px] font-[700] text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Actualizar Stock
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>

        {/* Formulario de actualización */}
        <div className="w-80 mt-3">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
            <h2 className="text-lg font-bold mb-4">
                {productoSeleccionado ? 'Actualizar Stock' : 'Selecciona un Producto'}
            </h2>
            
            {productoSeleccionado ? (
                <div className="space-y-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Producto seleccionado</div>
                    <div className="font-medium">{productoSeleccionado.nombre}</div>
                    <div className="text-sm text-gray-400 mt-2">Stock actual</div>
                    <div className="font-medium text-red-400">{productoSeleccionado.stock} unidades</div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-300">Nuevo stock</label>
                    <input
                    type="number"
                    min="0"
                    value={nuevoStock}
                    onChange={(e) => setNuevoStock(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Ingresa la nueva cantidad"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button
                    onClick={handleActualizarStock}
                    className="w-full bg-green-500 bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                    Guardar Cambios
                    </button>
                    <button
                    onClick={() => {
                        setProductoSeleccionado(null);
                        setNuevoStock('');
                    }}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                    Cancelar
                    </button>
                </div>
                </div>
            ) : (
                <div className="text-gray-400 text-center py-8">
                Selecciona un producto de la tabla para actualizar su stock
                </div>
            )}
            </div>
        </div>
        </div>
    );
};

export default ProductosAlerta;