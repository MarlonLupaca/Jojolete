import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SeccionMesas from '../components/SeccionMesas';
import DetalleMesas from '../components/DetalleMesas';
import ModalVenta from '../components/ModalVenta';
import { toast } from 'react-toastify';
import { UserContext } from '../components/UserContext.jsx'; 
import config from '../components/config'

const Inicio = () => {

    const url = config.API_URL

    const { user } = useContext(UserContext);

    const [mesas, setMesas] = useState(() => {
        const mesasGuardadas = localStorage.getItem('mesas');
        return mesasGuardadas ? JSON.parse(mesasGuardadas) : [
            {
                id: 1,
                numero: 'Mesa 1',
                estado: 'Disponible',
                detalles: []
            },
            {
                id: 2,
                numero: 'Mesa 2',
                estado: 'Disponible',
                detalles: []
            },
            {
                id: 3,
                numero: 'Mesa 3',
                estado: 'Disponible',
                detalles: []
            },
            {
                id: 4,
                numero: 'Mesa 4',
                estado: 'Disponible',
                detalles: []
            },
        ];
    });

    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [buscadorProducto, setBuscadorProducto] = useState('');
    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [platosDisponibles, setPlatosDisponibles] = useState([]);

    useEffect(() => {
        localStorage.setItem('mesas', JSON.stringify(mesas));
    }, [mesas]);

    useEffect(() => {
        fetch(`${url}/productos`)
            .then((response) => response.json())
            .then((data) => setProductosDisponibles(data));

        fetch(`${url}/platos`)
            .then((response) => response.json())
            .then((data) => setPlatosDisponibles(data));
    }, []);

    const calcularTotalMesa = (detalles) =>
        detalles.reduce((total, item) => total + item.precio * item.cantidad, 0);

    const agregarProducto = (producto) => {
        if (!mesaSeleccionada) return;

        setMesaSeleccionada((prevMesa) => {
            const productoExistente = prevMesa.detalles.find(
                (detalle) => detalle.nombre === producto.nombre
            );

            const nuevaMesa = productoExistente
                ? {
                    ...prevMesa,
                    estado: 'Ocupada',
                    detalles: prevMesa.detalles.map((detalle) =>
                        detalle.nombre === producto.nombre
                            ? { ...detalle, cantidad: detalle.cantidad + 1 }
                            : detalle
                    )
                }
                : {
                    ...prevMesa,
                    estado: 'Ocupada',
                    detalles: [
                        ...prevMesa.detalles,
                        { nombre: producto.nombre, precio: producto.precio, cantidad: 1 }
                    ]
                };

            setMesas(prevMesas =>
                prevMesas.map(mesa =>
                    mesa.id === prevMesa.id ? nuevaMesa : mesa
                )
            );

            return nuevaMesa;
        });
    };

    const actualizarCantidad = (index, nuevaCantidad) => {
        if (!mesaSeleccionada || nuevaCantidad < 1) return;

        setMesaSeleccionada((prevMesa) => {
            const nuevosDetalles = [...prevMesa.detalles];
            nuevosDetalles[index].cantidad = nuevaCantidad;

            const nuevaMesa = {
                ...prevMesa,
                detalles: nuevosDetalles
            };

            setMesas(prevMesas =>
                prevMesas.map(mesa =>
                    mesa.id === prevMesa.id ? nuevaMesa : mesa
                )
            );

            return nuevaMesa;
        });
    };

    const eliminarProducto = (index) => {
        if (!mesaSeleccionada) return;

        setMesaSeleccionada((prevMesa) => {
            const nuevosDetalles = prevMesa.detalles.filter((_, i) => i !== index);
            
            const nuevaMesa = {
                ...prevMesa,
                estado: nuevosDetalles.length === 0 ? 'Disponible' : 'Ocupada',
                detalles: nuevosDetalles
            };

            setMesas(prevMesas =>
                prevMesas.map(mesa =>
                    mesa.id === prevMesa.id ? nuevaMesa : mesa
                )
            );

            return nuevaMesa;
        });
    };

    const agregarMesa = () => {
        const maxNumero = mesas.length > 0
            ? Math.max(...mesas.map((mesa) => parseInt(mesa.numero.replace('Mesa ', ''), 10)))
            : 0;

        const nuevaMesa = {
            id: mesas.length + 1,
            numero: `Mesa ${maxNumero + 1}`,
            estado: 'Disponible',
            detalles: []
        };

        setMesas([...mesas, nuevaMesa]);
    };

    const eliminarMesa = () => {
        if (mesas.length === 0) return;

        const ultimaMesa = mesas[mesas.length - 1];
        
        if (mesaSeleccionada && mesaSeleccionada.id === ultimaMesa.id) {
            setMesaSeleccionada(null);
        }

        setMesas(prevMesas => prevMesas.slice(0, -1));
    };

    const guardarVenta = async (mesaId) => {
        const mesa = mesas.find(m => m.id === mesaId);
        if (!mesa || mesa.detalles.length === 0) return;

        const fecha = new Date().toISOString().split('T')[0];
        const total = calcularTotalMesa(mesa.detalles);
        const mesera = user.nombres + " " + user.apellidos

        const detallesVenta = mesa.detalles.map(detalle => {
            const productoEncontrado = productosDisponibles.find(p => p.nombre === detalle.nombre);
            const platoEncontrado = platosDisponibles.find(p => p.nombre === detalle.nombre);

            return {
                cantidad: detalle.cantidad,
                subtotal: detalle.precio * detalle.cantidad,
                producto: productoEncontrado ? { id: productoEncontrado.id } : null,
                plato: platoEncontrado ? { id: platoEncontrado.id } : null
            };
        });

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
                setMesas(prevMesas => 
                    prevMesas.map(m => 
                        m.id === mesaId 
                            ? { ...m, estado: 'Disponible', detalles: [] }
                            : m
                    )
                );
                setMesaSeleccionada(null);
                alert('Venta guardada exitosamente');
            } else {
                toast.error("No hay stock")
            }
        } catch (error) {
            alert('Error al guardar la venta: ' + error.message);
        }
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
        </div>
    );
};

export default Inicio;