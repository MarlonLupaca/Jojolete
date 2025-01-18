import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaBarcode } from 'react-icons/fa';
import PuntoDeVenta from '../components/PuntoDeVenta';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [codigo, setCodigo] = useState(''); // Código ingresado
    const [producto, setProducto] = useState(null); // Producto encontrado
    const [productosVenta, setProductosVenta] = useState([]); // Productos en la tabla de venta
    const [cantidad, setCantidad] = useState(1); // Cantidad del producto a agregar

    // Validar que cantidad sea un número entero positivo
    const validarCantidad = (valor) => /^\d+$/.test(valor);

    const handleCantidadChange = (e) => {
        const valor = e.target.value;

        if (!validarCantidad(valor) && valor !== "") {
            toast.error("Ingresa un número entero positivo.");
            return;
        }

        setCantidad(valor === "" ? "" : parseInt(valor, 10));
    };

    const handleInputChange = async (e) => {
        const valor = e.target.value;
        setCodigo(valor);
    
        if (!valor) {
            setProducto(null);
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/producto/find/${valor}`);
            if (response.ok) {
                // Verifica si hay contenido en la respuesta
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text);
                    if (data) {
                        if (cantidad <= 0 || isNaN(cantidad)) {
                            toast.error("Cantidad es errónea.");
                            return;
                        }
                        agregarProductoAVenta(data);
                    }
                    setProducto(data);
                } else {
                    setProducto(null); // No hay producto encontrado
                }
            } else {
                setProducto(null);
                toast.error("Error al buscar el producto.");
            }
        } catch (error) {
            console.error("Error al buscar el producto:", error);
            setProducto(null);
            toast.error("Ocurrió un error al buscar el producto.");
        }
    };
    
    const agregarProductoAVenta = (nuevoProducto) => {
        setProductosVenta((prevProductos) => {
            const productoExistente = prevProductos.find((p) => p.codigo === nuevoProducto.codigo);

            if (productoExistente) {
                return prevProductos.map((p) =>
                    p.codigo === nuevoProducto.codigo
                        ? { ...p, cantidad: p.cantidad + cantidad, total: (p.cantidad + cantidad) * p.precioVenta }
                        : p
                );
            } else {
                return [
                    ...prevProductos,
                    { ...nuevoProducto, cantidad, total: cantidad * nuevoProducto.precioVenta },
                ];
            }
        });

        setCantidad(1);
        setCodigo('');
    };

    return (
        <div className='bg-fondoOscuro flex'>
            <Sidebar />
            <div className='w-full flex flex-col'>
                <Header name="Venta de Caja" />
                <div className='flex flex-1 bg-primario p-2'>
                    <div className='w-[500px] flex flex-col p-4 items-center text-textoClaro'>
                        <div className='bg-secundario rounded-lg pt-4 pb-5 px-6 w-full'>
                            <div className='w-full mb-2'>
                                <label htmlFor="cantidad" className='block text-textoClaro mb-1 font-[700] text-[1.125rem]'>Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    value={cantidad}
                                    onChange={handleCantidadChange}
                                    placeholder="Cantidad"
                                    className="px-3 py-2 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-secundario w-[150px]"
                                />
                            </div>
                            <div className='w-full mb-[10px] text-[1.125rem] font-[700] text-textoClaro'>
                                Código:
                            </div>
                            <div className='pb-2 items-center'>
                                <div className='flex mb-4'>
                                    <FaBarcode className='text-[35px] mr-[10px]' />
                                    <input
                                        type="text"
                                        value={codigo}
                                        onChange={handleInputChange}
                                        className='px-3 py-1 border border-acento bg-slate-200 w-full text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario'
                                        placeholder="Ingresa número..."
                                    />
                                </div>
                            </div>
                        </div>
                        {producto && (
                            <div className='bg-secundario mt-4 p-4 rounded-lg shadow-md w-full text-textoClaro'>
                                <div className='h-[100px] bg-gray-300 rounded-lg mb-3 overflow-hidden flex justify-center items-center'>
                                    <img src="./producto.jpg" className='w-full' alt="Producto" />
                                </div>
                                <h3 className='text-[1.25rem] font-[700] mb-1'>{producto.nombre}</h3>
                                <p className='text-textoGris text-sm mb-2'>Código: {producto.codigo}</p>
                                <p className='text-terceario text-lg font-bold'>S/ {producto.precioVenta.toFixed(2)}</p>
                                <p className='text-textoGris text-sm my-1'>{producto.comentario}</p>
                                <p className='text-sm text-textoGris'>Stock disponible: {producto.stock}</p>
                            </div>
                        )}
                    </div>
                    <PuntoDeVenta 
                        productos={productosVenta} 
                        setProductosVenta={setProductosVenta} 
                    />

                </div>
            </div>
        </div>
    );
};

export default Home;
