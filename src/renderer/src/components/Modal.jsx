const Modal = ({ productos, onClose }) => {
    return (
        <div className="fixed  text-[15px] flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
            <div className="bg-secundario p-6 rounded-lg w-[80%] max-h-[80vh] max-w-[500px]">
                <h2 className="text-xl font-semibold mb-4 text-textClaro">Productos</h2>
                <div className="border border-gray-600 rounded-lg h-[60vh] overflow-y-auto">
                    <table className="w-full">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="text-start px-5 h-[30px]">Nombre</th>
                                <th className="text-center px-5 h-[30px]" >Cantidad</th>
                                <th className="text-start px-5 h-[30px]">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.length > 0 ? (
                                productos.map((producto, index) => (
                                    <tr key={index} className="border-b border-gray-600">
                                        <td className="text-start px-5 h-[30px]">{producto.nombre}</td>
                                        <td className="text-center px-5 h-[30px]">{producto.cantidad}</td>
                                        <td className="text-start px-5 h-[30px]">S/. {producto.subtotal.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No se encontraron productos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button onClick={onClose} className="mt-4 px-4 py-2 text-[14px] font-[700] bg-cuarto bg-opacity-70 hover:bg-red-700 text-white rounded-lg">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
