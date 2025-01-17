import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductoModal = ({ toggleDetalle, codigo }) => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product data on component mount
    useEffect(() => {
        // Función para obtener los datos del producto
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/producto/find/${codigo}`);
                setProducto(response.data);
                setLoading(false);
            } catch (error) {
                setError("Hubo un error al cargar los detalles del producto.");
                setLoading(false);
            }
        };

        fetchProducto();
    }, [codigo]);

    if (loading) {
        return (
            <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
                <div className="bg-secundario rounded-lg w-[450px] py-6 px-6 pb-8">
                    <span className="text-[20px] mb-4 text-textoClaro font-bold text-center block">
                        Cargando detalles del producto...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
                <div className="bg-secundario rounded-lg w-[450px] py-6 px-6 pb-8">
                    <span className="text-[20px] mb-4 text-textoClaro font-bold text-center block">
                        {error}
                    </span>
                    <div className="mt-6 flex justify-end gap-4 text-[14px]">
                        <button
                            onClick={toggleDetalle}
                            className="px-4 py-1 bg-cuarto text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
            <div className="bg-secundario rounded-lg w-[450px] py-6 px-6 pb-8">
                <span className="text-[20px] mb-4 text-textoClaro font-bold text-center block">
                    Detalles del Producto
                </span>
                <div className="flex flex-col gap-4 text-textoClaro">
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Código:</span>
                        <span>{producto.codigo}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Nombre:</span>
                        <span>{producto.nombre}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Categoría:</span>
                        <span>{producto.categoria}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Unidad de Medida:</span>
                        <span>{producto.unidadMedida}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Stock:</span>
                        <span>{producto.stock}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Precio de Compra:</span>
                        <span>S/. {producto.precioCompra}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Precio de Venta:</span>
                        <span>S/. {producto.precioVenta}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Stock Mínimo:</span>
                        <span>{producto.stockMinimo}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Proveedor:</span>
                        <span>{producto.proveedor}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Ubicación:</span>
                        <span>{producto.ubicacion}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                        <span className="font-semibold">Comentario:</span>
                        <span>{producto.comentario}</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4 text-[14px]">
                    <button
                        onClick={toggleDetalle}
                        className="px-4 py-1 bg-cuarto text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductoModal;
