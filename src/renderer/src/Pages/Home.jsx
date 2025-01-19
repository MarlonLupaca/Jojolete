import React, { useState, useEffect, useRef } from 'react';
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
    const [showPriceModal, setShowPriceModal] = useState(false); // Controla la visibilidad del modal
    const [precioManual, setPrecioManual] = useState(""); // Precio ingresado manualmente

    // Referencia al input de precio en el modal
    const precioInputRef = useRef(null);

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
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text);
                    setProducto(data); // Guardamos el producto encontrado, siempre se mostrará la tarjeta

                    if (!data.precioVenta) {
                        // Si el producto no tiene precio, mostrar el modal
                        setShowPriceModal(true);
                    } else {
                        // Si el producto tiene precio, agregamos el producto automáticamente
                        if (cantidad <= 0 || isNaN(cantidad)) {
                            toast.error("Cantidad es errónea.");
                            return;
                        }
                        agregarProductoAVenta(data);
                    }
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

    const handlePrecioChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 0) {
            setPrecioManual(value);
        } else {
            toast.error("Ingresa un precio válido.");
        }
    };

    const confirmarPrecio = () => {
        if (precioManual <= 0) {
            toast.error("El precio debe ser mayor a 0.");
            return;
        }

        // Asigna el precio manual al producto
        const productoConPrecio = { ...producto, precioVenta: parseFloat(precioManual) };
        agregarProductoAVenta(productoConPrecio);
        setShowPriceModal(false);
    };

    // useEffect para establecer el foco en el input del modal cuando se abre
    useEffect(() => {
        if (showPriceModal && precioInputRef.current) {
            precioInputRef.current.focus(); // Establece el foco en el input de precio
        }
    }, [showPriceModal]);

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
                        {/* Mostrar tarjeta siempre que haya un producto */}
                        {producto && (
                            <div className='bg-secundario mt-4 p-4 rounded-lg shadow-md w-full text-textoClaro'>
                                <div className='h-[100px] bg-gray-300 rounded-lg mb-3 overflow-hidden flex justify-center items-center'>
                                    <img src="./producto.jpg" className='w-full' alt="Producto" />
                                </div>
                                <h3 className='text-[1.25rem] font-[700] mb-1'>{producto.nombre}</h3>
                                <p className='text-textoGris text-sm mb-2'>Código: {producto.codigo}</p>
                                <p className='text-terceario text-lg font-bold'>
                                    {producto.precioVenta ? `S/ ${producto.precioVenta.toFixed(2)}` : 'Precio no disponible'}
                                </p>
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
            
            {/* Modal para ingresar el precio */}
            {showPriceModal && (
                <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
                    <div className="modal-content bg-secundario text-white p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Ingresa el Precio del Producto</h2>
                        <input
                            ref={precioInputRef} // Agregar referencia aquí
                            type="number"
                            value={precioManual}
                            onChange={handlePrecioChange}
                            placeholder="Precio del producto"
                            className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        <div className="mt-4 flex justify-between">
                            <button onClick={confirmarPrecio} className="bg-terceario text-white p-2 rounded-lg">Confirmar</button>
                            <button onClick={() => setShowPriceModal(false)} className="btn bg-gray-500 text-white p-2 rounded-lg">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
