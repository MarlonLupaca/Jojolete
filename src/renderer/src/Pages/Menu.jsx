import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../components/config'

const Menu = () => {
    const url = config.API_URL;

    const [platos, setPlatos] = useState([]);
    const [platosOriginal, setPlatosOriginal] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [nombreEditar, setNombreEditar] = useState('');
    const [precioEditar, setPrecioEditar] = useState('');
    const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    const [mostrarConfirmacionVenta, setMostrarConfirmacionVenta] = useState(false);
    
    // Confirmación states
    const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);
    const [platoAEliminar, setPlatoAEliminar] = useState(null);

    useEffect(() => {
        obtenerPlatos();
    }, []);

    const obtenerPlatos = async () => {
        try {
            const response = await axios.get(`${url}/platos`);
            const platosActivos = response.data.filter(plato => plato.estado);
            setPlatos(platosActivos);
            setPlatosOriginal(platosActivos);
        } catch (error) {
            toast.error('Error al obtener los platos');
        }
    };

    const handleAgregarPlato = async () => {
        const precioNumerico = parseFloat(precio);
        if (!nombre || isNaN(precioNumerico)) {
            toast.warning('Por favor, ingresa un nombre válido y un precio numérico.');
            return;
        }

        try {
            await axios.post(`${url}/platos`, { nombre, precio: precioNumerico, estado: true });
            toast.success('Plato guardado exitosamente');
            obtenerPlatos();
            setNombre('');
            setPrecio('');
        } catch (error) {
            toast.error('Error al guardar el plato');
        }
    };

    const confirmarEliminarPlato = (plato) => {
        setPlatoAEliminar(plato);
        setMostrarConfirmacionEliminar(true);
    };

    const handleEliminarPlato = async () => {
        if (!platoAEliminar) return;

        try {
            await axios.put(`${url}/platos/estado/${platoAEliminar.id}?estado=false`);
            toast.success('Plato eliminado exitosamente');
            obtenerPlatos();
            setMostrarConfirmacionEliminar(false);
            setPlatoAEliminar(null);
        } catch (error) {
            toast.error('Error al eliminar el plato');
        }
    };

    const handleActualizarPlato = async () => {
        if (!platoSeleccionado || !nombreEditar || isNaN(parseFloat(precioEditar))) {
            toast.warning('Completa los datos correctamente.');
            return;
        }

        try {
            await axios.put(`${url}/platos/${platoSeleccionado.id}`, {
                nombre: nombreEditar,
                precio: parseFloat(precioEditar),
                estado: true
            });
            toast.success('Plato actualizado exitosamente');
            obtenerPlatos();
            setPlatoSeleccionado(null);
            setNombreEditar('');
            setPrecioEditar('');
        } catch (error) {
            toast.error('Error al actualizar el plato');
        }
    };

    const handleBuscarPlato = (textoBusqueda) => {
        setBusqueda(textoBusqueda);
        if (!textoBusqueda) {
            setPlatos(platosOriginal);
            return;
        }

        const platosFiltrados = platosOriginal.filter(plato => 
            plato.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
        );
        setPlatos(platosFiltrados);
    };

    return (
        <div className="bg-primario text-white flex h-screen">
            <Sidebar />
            <div className="w-full flex flex-col">
                <Header name="Gestión de Platos" />
                <div className="flex-1 flex p-6">
                    <div className="bg-secundario p-6 border-r border-gray-600 rounded-l-lg w-[700px]">
                        <h2 className="text-lg font-bold mb-4">Agregar Plato</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Nombre del Plato</label>
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                placeholder="Nombre del plato" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Precio (S/)</label>
                            <input 
                                type="number" 
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} 
                                placeholder="Precio del plato" min="0" 
                            />
                        </div>
                        <button onClick={handleAgregarPlato} className="text-[14px] font-[700] w-full bg-green-500 bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            Agregar Plato
                        </button>
                        <h2 className="text-lg font-bold mt-8 mb-4">Editar Plato</h2>
                        {platoSeleccionado ? (
                            <>
                                <div className="mb-4">
                                    <label className="block mb-1">Nombre del Plato</label>
                                    <input 
                                        type="text"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                        value={nombreEditar} 
                                        onChange={(e) => setNombreEditar(e.target.value)} 
                                        placeholder="Nombre del plato" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Precio (S/)</label>
                                    <input 
                                        type="number" 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                        value={precioEditar} 
                                        onChange={(e) => setPrecioEditar(e.target.value)} 
                                        placeholder="Precio del plato" 
                                        min="0" />
                                </div>
                                <button onClick={handleActualizarPlato} className="text-[14px] font-[700] w-full bg-blue-500 bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Actualizar Plato
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-400">Selecciona un plato para editar.</p>
                        )}
                    </div>
                    <div className="w-full rounded-r-lg bg-secundario p-6">
                        <h2 className="text-lg font-bold mb-4">Listado de Platos</h2>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                value={busqueda} 
                                onChange={(e) => handleBuscarPlato(e.target.value)} 
                                placeholder="Buscar platos por nombre" 
                            />
                        </div>
                        <div className="border border-gray-600 rounded-lg max-h-[65vh] overflow-y-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-600 h-[40px]">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Nombre</th>
                                        <th className="px-4 py-2 text-right">Precio (S/)</th>
                                        <th className="px-4 py-2 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {platos.map((plato) => (
                                        <tr key={plato.id} className="border-b-2 border-gray-600">
                                            <td className="px-4 py-2">{plato.nombre}</td>
                                            <td className="px-4 py-2 text-right">S/ {plato.precio.toFixed(2)}</td>
                                            <td className="px-4 py-2 text-center text-[14px]">
                                                <button 
                                                    onClick={() => { 
                                                        setPlatoSeleccionado(plato); 
                                                        setNombreEditar(plato.nombre); 
                                                        setPrecioEditar(plato.precio.toString()); 
                                                    }}
                                                    className="bg-blue-500 bg-opacity-70 text-[14px] text-white px-2 py-1 rounded-md hover:bg-blue-700 mx-1"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => confirmarEliminarPlato(plato)} 
                                                    className="text-[14px] bg-red-500 text-white px-2 bg-opacity-70 py-1 rounded-md hover:bg-red-700 mx-1"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {platos.length === 0 && (
                                <div className="text-center py-4 text-gray-400">
                                    No se encontraron platos
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmación de Eliminación */}
            {mostrarConfirmacionEliminar && (
                <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
                    <div className="bg-secundario text-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                        <p className=" mb-6">¿Estás seguro de que deseas eliminar el plato "{platoAEliminar?.nombre}"?</p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => setMostrarConfirmacionEliminar(false)} 
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleEliminarPlato} 
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;