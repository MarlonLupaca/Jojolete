import React, { useState } from 'react';

const ModalVenta = ({
    buscadorProducto,
    setBuscadorProducto,
    agregarProducto,
    mesaSeleccionada,
    actualizarCantidad,
    calcularTotalMesa,
    setMostrarModal,
    productosDisponibles,
    platosDisponibles
}) => {
    const [seleccionado, setSeleccionado] = useState('producto');

    const productosFiltrados = productosDisponibles.filter((p) =>
        p.nombre.toLowerCase().includes(buscadorProducto.toLowerCase())
    );

    const platosFiltrados = platosDisponibles.filter((p) =>
        p.nombre.toLowerCase().includes(buscadorProducto.toLowerCase())
    );

    const renderTarjetas = (items) => {
        return items.map((item) => (
            <div
                key={item.id}
                className="border border-gray-600 p-4 m-2 cursor-pointer hover:bg-gray-200"
                onClick={() => agregarProducto(item)}
            >
                <h4 className="font-semibold">{item.nombre}</h4>
                <p>Precio: S/ {item.precio.toFixed(2)}</p>
                {item.stock && <p>Stock: {item.stock}</p>}
            </div>
        ));
    };

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
            <div className="bg-secundario p-6 h-[80vh] rounded-lg w-2/3">
                <h2 className="text-lg font-bold mb-4">Gestionar Productos</h2>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <h3 className="text-md font-semibold mb-2">Buscar {seleccionado === 'producto' ? 'Producto' : 'Plato'}</h3>
                        <input
                            type="text"
                            className="w-[480px] px-4 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            placeholder={`Buscar ${seleccionado === 'producto' ? 'producto' : 'plato'}...`}
                            value={buscadorProducto}
                            onChange={(e) => setBuscadorProducto(e.target.value)}
                        />
                        <select
                            className="mt-2 w-full px-4 py-1 border border-acento bg-slate-200 text-black rounded-lg"
                            onChange={(e) => setSeleccionado(e.target.value)}
                            value={seleccionado}
                        >
                            <option value="producto">Producto</option>
                            <option value="plato">Plato</option>
                        </select>

                        <div className="mt-4 max-h-[300px] overflow-y-auto">
                            {seleccionado === 'producto'
                                ? renderTarjetas(productosFiltrados)
                                : renderTarjetas(platosFiltrados)}
                        </div>
                    </div>

                    <div className="w-1/2">
                        <h3 className="text-md font-semibold mb-2">Productos de la Mesa</h3>
                        <div className="overflow-auto h-[50vh] border rounded-lg border-gray-600">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-600">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Producto</th>
                                        <th className="px-4 py-2 text-center">Cantidad</th>
                                        <th className="px-4 py-2 text-right">Precio</th>
                                        <th className="px-4 py-2 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mesaSeleccionada.detalles.map((detalle, index) => (
                                        <tr key={index} className="border-b border-gray-600">
                                            <td className="px-4 py-2">{detalle.nombre}</td>
                                            <td className="px-4 py-2 text-center">
                                                <input
                                                    type="number"
                                                    className="w-[64px] px-3 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                                                    min="1"
                                                    value={detalle.cantidad}
                                                    onChange={(e) => actualizarCantidad(index, parseInt(e.target.value, 10))}
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-right">S/ {detalle.precio.toFixed(2)}</td>
                                            <td className="px-4 py-2 text-right">
                                                S/ {(detalle.precio * detalle.cantidad).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 text-right font-bold text-lg">
                            Total: S/ {calcularTotalMesa(mesaSeleccionada.detalles).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setMostrarModal(false)}
                        className="mt-4 bg-cuarto text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalVenta;