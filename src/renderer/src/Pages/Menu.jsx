import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
    const [platos, setPlatos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [nombreEditar, setNombreEditar] = useState('');
    const [precioEditar, setPrecioEditar] = useState('');
    const [platoSeleccionado, setPlatoSeleccionado] = useState(null);

    useEffect(() => {
        obtenerPlatos();
    }, []);

    const obtenerPlatos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/platos');
            setPlatos(response.data);
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
            await axios.post('http://localhost:8080/platos', { nombre, precio: precioNumerico });
            toast.success('Plato guardado exitosamente');
            obtenerPlatos();
            setNombre('');
            setPrecio('');
        } catch (error) {
            toast.error('Error al guardar el plato');
        }
    };

    const handleEliminarPlato = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/platos/${id}`);
            toast.success('Plato eliminado exitosamente');
            obtenerPlatos();
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
            await axios.put(`http://localhost:8080/platos/${platoSeleccionado.id}`, {
                nombre: nombreEditar,
                precio: parseFloat(precioEditar),
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
                            <input type="text" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del plato" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Precio (S/)</label>
                            <input type="number" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio del plato" min="0" />
                        </div>
                        <button onClick={handleAgregarPlato} className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80">
                            Agregar Plato
                        </button>
                        <h2 className="text-lg font-bold mt-8 mb-4">Editar Plato</h2>
                        {platoSeleccionado ? (
                            <>
                                <div className="mb-4">
                                    <label className="block mb-1">Nombre del Plato</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                        value={nombreEditar} onChange={(e) => setNombreEditar(e.target.value)} placeholder="Nombre del plato" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Precio (S/)</label>
                                    <input type="number" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black"
                                        value={precioEditar} onChange={(e) => setPrecioEditar(e.target.value)} placeholder="Precio del plato" min="0" />
                                </div>
                                <button onClick={handleActualizarPlato} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80">
                                    Actualizar Plato
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-400">Selecciona un plato para editar.</p>
                        )}
                    </div>
                    <div className="w-full rounded-r-lg bg-secundario p-6">
                        <h2 className="text-lg font-bold mb-4">Listado de Platos</h2>
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
                                            <td className="px-4 py-2 text-center">
                                                <button onClick={() => { setPlatoSeleccionado(plato); setNombreEditar(plato.nombre); setPrecioEditar(plato.precio.toString()); }}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 mx-1">Editar</button>
                                                <button onClick={() => handleEliminarPlato(plato.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 mx-1">Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
