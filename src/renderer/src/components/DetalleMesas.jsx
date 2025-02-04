import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DetalleMesas = ({ 
    mesaSeleccionada, 
    setMostrarModal, 
    calcularTotalMesa, 
    actualizarCantidad, 
    eliminarProducto,
    guardarVenta 
}) => {
    return (
        <div className="w-2/3 rounded-lg bg-secundario p-6">
            {mesaSeleccionada ? (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">{mesaSeleccionada.nombre}</h2>
                        <div className="space-x-2">
                            <button
                                onClick={() => setMostrarModal(true)}
                                className="bg-blue-500 bg-opacity-70 text-[14px] font-[700] text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Gestionar Productos
                            </button>
                            {mesaSeleccionada.detalles.length > 0 && (
                                <button
                                    onClick={() => guardarVenta(mesaSeleccionada.id)}
                                    className="bg-green-500 bg-opacity-70 text-[14px] font-[700] text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Guardar Venta
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-[65vh] overflow-y-auto relative border border-gray-600 rounded-lg">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-600 h-[40px] sticky top-0 z-[1]">
                                <tr>
                                    <th className="px-4 py-2 text-left">Producto</th>
                                    <th className="px-4 py-2 text-center">Cantidad</th>
                                    <th className="px-4 py-2 text-right">Precio</th>
                                    <th className="px-4 py-2 text-right">Subtotal</th>
                                    <th className="px-4 py-2 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mesaSeleccionada.detalles.map((detalle) => (
                                    <tr key={detalle.id} className="border-b-2 border-gray-600 h-[50px]">
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
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => eliminarProducto(detalle.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                                title="Eliminar producto"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {mesaSeleccionada.detalles.length === 0 && (
                                    <tr>
                                        <td className="px-4 py-2 text-center" colSpan={5}>
                                            No hay productos en esta mesa.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-right font-bold text-lg">
                        Total: S/ {calcularTotalMesa(mesaSeleccionada.detalles).toFixed(2)}
                    </div>
                </>
            ) : (
                <p className="text-gray-500">Seleccione una mesa para ver el detalle</p>
            )}
        </div>
    );
};

export default DetalleMesas;