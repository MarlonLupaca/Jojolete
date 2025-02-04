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

    const renderTarjetas = (items, name) => {
        return items.map((item) => {
            const itemData = {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                tipo: seleccionado // agregamos el tipo para diferenciar entre producto y plato
            };

            return (
                <div
                    key={item.id}
                    className="rounded-lg w-fit border-gray-600 p-4 m-2 cursor-pointer hover:bg-[#00000034] text-[15px]"
                    onClick={() => agregarProducto(itemData)}
                >
                    <img src={name} alt="platos" className='w-[170px] mb-2 opacity-60' />
                    <h4 className="font-semibold">{item.nombre}</h4>
                    <p>Precio: S/ {item.precio.toFixed(2)}</p>
                    {item.stock && <p>Stock: {item.stock}</p>}
                </div>
            );
        });
    };

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100] p-5">
            <div className="bg-secundario p-6 w-full h-full rounded-lg">
                <h2 className="text-lg font-bold mb-4">Gestionar Productos</h2>
                <div className="flex gap-4 h-[75vh]">
                    <div className="w-1/2 h-full">
                        <h3 className="text-md font-semibold mb-2">Buscar {seleccionado === 'producto' ? 'Producto' : 'Plato'}</h3>
                        <input
                            type="text"
                            className="mb-3 w-full text-[16px] px-3 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={`Buscar ${seleccionado === 'producto' ? 'producto' : 'plato'}...`}
                            value={buscadorProducto}
                            onChange={(e) => setBuscadorProducto(e.target.value)}
                        />
                        <select
                            className="w-full text-[16px] px-3 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                            onChange={(e) => setSeleccionado(e.target.value)}
                            value={seleccionado}
                        >
                            <option value="producto">Producto</option>
                            <option value="plato">Plato</option>
                        </select>

                        <div className="mt-4 max-h-[62vh] grid grid-cols-3 overflow-y-auto">
                            {seleccionado === 'producto'
                                ? renderTarjetas(productosFiltrados, "./producto.jpg")
                                : renderTarjetas(platosFiltrados, "./platos_peruanos.jpg")}
                        </div>
                    </div>

                    <div className="w-1/2 ">
                        <h3 className="text-md font-semibold mb-2">Productos de la Mesa</h3>
                        <div className="overflow-auto h-[58vh] border rounded-lg border-gray-600">
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
                                    {mesaSeleccionada.detalles.map((detalle) => (
                                        <tr key={detalle.id} className="border-b border-gray-600">
                                            <td className="px-4 py-2">
                                                {detalle.producto?.nombre || detalle.plato?.nombre}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <input
                                                    type="number"
                                                    className="w-[64px] text-[14px] px-3 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                                    min="1"
                                                    value={detalle.cantidad}
                                                    onChange={(e) => 
                                                        actualizarCantidad(detalle.id, parseInt(e.target.value, 10))
                                                    }
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                S/ {(detalle.producto?.precio || detalle.plato?.precio).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                S/ {detalle.subtotal.toFixed(2)}
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
                        className="mt-4 bg-cuarto text-[14px] font-[700] bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalVenta;