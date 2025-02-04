import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SeccionMesas from '../components/SeccionMesas';
import DetalleMesas from '../components/DetalleMesas';
import ModalVenta from '../components/ModalVenta';
import { toast } from 'react-toastify';
import { UserContext } from '../components/UserContext.jsx';
import config from '../components/config';

const Inicio = () => {
    const url = config.API_URL;
    const { user } = useContext(UserContext);

    const [mesas, setMesas] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [buscadorProducto, setBuscadorProducto] = useState('');
    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [platosDisponibles, setPlatosDisponibles] = useState([]);

    const [mostrarConfirmacionVenta, setMostrarConfirmacionVenta] = useState(false);
    const [mesaParaVenta, setMesaParaVenta] = useState(null);

    // Cargar mesas y productos iniciales
    useEffect(() => {
        cargarMesas();
        cargarProductos();
    }, []);

    const cargarMesas = async () => {
        try {
            const response = await fetch(`${url}/api/mesas`);
            const data = await response.json();
            setMesas(data);
        } catch (error) {
            toast.error('Error al cargar las mesas');
        }
    };

    const cargarProductos = async () => {
        try {
            const [productosResponse, platosResponse] = await Promise.all([
                fetch(`${url}/productos`),
                fetch(`${url}/platos`)
            ]);
            const productos = await productosResponse.json();
            const platos = await platosResponse.json();
            setProductosDisponibles(productos);
            setPlatosDisponibles(platos);
        } catch (error) {
            toast.error('Error al cargar productos y platos');
        }
    };

    const calcularTotalMesa = (detalles) =>
        detalles.reduce((total, item) => total + item.subtotal, 0);

    
    const agregarProducto = async (producto) => {
        if (!mesaSeleccionada) return;
    
        // Verificar si el producto ya existe en la mesa
        const detalleExistente = mesaSeleccionada.detalles.find(detalle => 
            (producto.tipo === 'producto' && detalle.producto?.id === producto.id) ||
            (producto.tipo === 'plato' && detalle.plato?.id === producto.id)
        );
    
        if (detalleExistente) {
            // Actualizar cantidad usando el nuevo endpoint
            try {
                const response = await fetch(`${url}/api/mesas/detalles/${detalleExistente.id}/${detalleExistente.cantidad + 1}`, {
                    method: 'PUT'
                });
    
                if (response.ok) {
                    const mesaResponse = await fetch(`${url}/api/mesas/${mesaSeleccionada.nombre}`);
                    const mesaActualizada = await mesaResponse.json();
                    
                    setMesaSeleccionada(mesaActualizada);
                    setMesas(prevMesas => prevMesas.map(mesa => 
                        mesa.nombre === mesaSeleccionada.nombre ? mesaActualizada : mesa
                    ));
                }
            } catch (error) {
                toast.error('Error al actualizar la cantidad del producto');
            }
        } else {
            // Si no existe, crear nuevo detalle (esto se mantiene igual)
            const detalle = {
                platoId: producto.tipo === 'plato' ? producto.id : null,
                productoId: producto.tipo === 'producto' ? producto.id : null,
                cantidad: 1,
                subtotal: producto.precio
            };
    
            try {
                const response = await fetch(`${url}/api/mesas/${mesaSeleccionada.nombre}/detalles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(detalle)
                });
    
                if (response.ok) {
                    const mesaResponse = await fetch(`${url}/api/mesas/${mesaSeleccionada.nombre}`);
                    const mesaActualizada = await mesaResponse.json();
                    
                    setMesaSeleccionada(mesaActualizada);
                    setMesas(prevMesas => prevMesas.map(mesa => 
                        mesa.nombre === mesaSeleccionada.nombre ? mesaActualizada : mesa
                    ));
                }
            } catch (error) {
                toast.error('Error al agregar el producto');
            }
        }
    };

    const actualizarCantidad = async (detalleId, nuevaCantidad) => {
        if (!mesaSeleccionada || nuevaCantidad < 1) return;
    
        try {
            // Usar el nuevo endpoint para actualizar la cantidad
            const response = await fetch(`${url}/api/mesas/detalles/${detalleId}/${nuevaCantidad}`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                const mesaResponse = await fetch(`${url}/api/mesas/${mesaSeleccionada.nombre}`);
                const mesaActualizada = await mesaResponse.json();
                
                setMesaSeleccionada(mesaActualizada);
                setMesas(prevMesas => prevMesas.map(mesa => 
                    mesa.nombre === mesaSeleccionada.nombre ? mesaActualizada : mesa
                ));
            }
        } catch (error) {
            toast.error('Error al actualizar la cantidad');
        }
    };

    const eliminarProducto = async (detalleId) => {
        if (!mesaSeleccionada) return;

        try {
            await fetch(`${url}/api/mesas/detalles/${detalleId}`, {
                method: 'DELETE'
            });

            const mesaResponse = await fetch(`${url}/api/mesas/${mesaSeleccionada.nombre}`);
            const mesaActualizada = await mesaResponse.json();
            
            setMesaSeleccionada(mesaActualizada);
            setMesas(prevMesas => prevMesas.map(mesa => 
                mesa.nombre === mesaSeleccionada.nombre ? mesaActualizada : mesa
            ));
        } catch (error) {
            toast.error('Error al eliminar el producto');
        }
    };

    const agregarMesa = async () => {
        const nuevaMesa = {
            nombre: `mesa ${mesas.length + 1}`,
            estado: 'disponible'
        };

        try {
            const response = await fetch(`${url}/api/mesas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaMesa)
            });

            if (response.ok) {
                cargarMesas(); // Recargar todas las mesas
            }
        } catch (error) {
            toast.error('Error al agregar la mesa');
        }
    };

    const eliminarMesa = async () => {
        if (mesas.length === 0) return;

        const ultimaMesa = mesas[mesas.length - 1];
        
        try {
            await fetch(`${url}/api/mesas/${ultimaMesa.nombre}`, {
                method: 'DELETE'
            });

            if (mesaSeleccionada && mesaSeleccionada.nombre === ultimaMesa.nombre) {
                setMesaSeleccionada(null);
            }

            cargarMesas(); // Recargar todas las mesas
        } catch (error) {
            toast.error('Error al eliminar la mesa');
        }
    };

    
    const realizarVentaConfirmada = async () => {
        if (!mesaParaVenta) return;

        const mesa = mesas.find(m => m.id === mesaParaVenta);
        if (!mesa || mesa.detalles.length === 0) return;
    
        const fecha = new Date().toISOString().split('T')[0];
        const total = calcularTotalMesa(mesa.detalles);
        const mesera = user.nombres + " " + user.apellidos;
    
        const detallesVenta = mesa.detalles.map(detalle => ({
            cantidad: detalle.cantidad,
            subtotal: detalle.subtotal,
            producto: detalle.producto ? { id: detalle.producto.id } : null,
            plato: detalle.plato ? { id: detalle.plato.id } : null
        }));
    
        const ventaData = {
            fecha,
            total,
            mesera,
            detalles: detallesVenta
        };
    
        try {
            const response = await fetch(`${url}/api/ventas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ventaData)
            });
    
            if (response.ok) {
                // Eliminar los detalles de la mesa
                await fetch(`${url}/api/mesas/${mesa.nombre}/detalles`, {
                    method: 'DELETE'
                });
    
                // Recargar la mesa para reflejar los cambios
                const mesaResponse = await fetch(`${url}/api/mesas/${mesa.nombre}`);
                const mesaActualizada = await mesaResponse.json();
                
                setMesaSeleccionada(null);
                setMesas(prevMesas => prevMesas.map(m => 
                    m.nombre === mesa.nombre ? mesaActualizada : m
                ));
                
                toast.success('Venta guardada exitosamente');
            } else {
                toast.error("No hay stock");
            }
        } catch (error) {
            toast.error('Error al guardar la venta: ' + error.message);
        } finally {
            // Reset confirmation modal state
            setMostrarConfirmacionVenta(false);
            setMesaParaVenta(null);
        }
    };

    const guardarVenta = (mesaId) => {
        setMesaParaVenta(mesaId);
        setMostrarConfirmacionVenta(true);
    };
    return (
        <div className="bg-primario text-white flex h-screen">
            <Sidebar />
            <div className="w-full flex flex-col">
                <Header name="Gestión de Mesas" />
                <div className="flex-1 flex p-6">
                    <SeccionMesas 
                        mesas={mesas}
                        setMesaSeleccionada={setMesaSeleccionada} 
                        agregarMesa={agregarMesa} 
                        eliminarMesa={eliminarMesa}
                    />
                    <DetalleMesas 
                        mesaSeleccionada={mesaSeleccionada} 
                        setMostrarModal={setMostrarModal}
                        calcularTotalMesa={calcularTotalMesa}
                        actualizarCantidad={actualizarCantidad}
                        eliminarProducto={eliminarProducto}
                        guardarVenta={guardarVenta}
                    />
                </div>
            </div>

            {mostrarModal && (
                <ModalVenta 
                    buscadorProducto={buscadorProducto}
                    setBuscadorProducto={setBuscadorProducto}
                    productosDisponibles={productosDisponibles}
                    platosDisponibles={platosDisponibles}
                    agregarProducto={agregarProducto}
                    mesaSeleccionada={mesaSeleccionada}
                    actualizarCantidad={actualizarCantidad}
                    calcularTotalMesa={calcularTotalMesa}
                    setMostrarModal={setMostrarModal}
                />
            )}

            {mostrarConfirmacionVenta && (
                <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
                    <div className="bg-secundario text-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirmar Venta</h2>
                        <p className="mb-6">¿Estás seguro de que deseas guardar esta venta?</p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => {
                                    setMostrarConfirmacionVenta(false);
                                    setMesaParaVenta(null);
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={realizarVentaConfirmada}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inicio;