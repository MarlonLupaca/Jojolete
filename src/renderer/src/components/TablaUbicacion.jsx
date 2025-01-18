import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa"; // Importar íconos
import AgregarUbicacion from './AgregarUbicacion';
import axios from 'axios'; // Para hacer peticiones HTTP
import { toast } from 'react-toastify'; // Importar toast
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de toast

const TablaUbicacion = () => {
    const [datos, setDatos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [ubicacion, setUbicacion] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState({ id: '', nombre: '', comentario: '' });

    const toggleUbicacion = () => {
        setUbicacion(!ubicacion);
    };

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const fetchData = () => {
        fetch("http://localhost:8080/ubicacion/all")
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setDatos(data);
                    setMensaje(""); // Limpiar el mensaje si hay datos
                } else {
                    setMensaje("No se encontraron ubicaciones");
                }
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                setMensaje("Error al cargar los datos");
            });
    };

    const handleEdit = (id, nombre, comentario) => {
        setEditData({ id, nombre, comentario });
        setModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedData = {
            nombre: editData.nombre,
            comentario: editData.comentario
        };

        axios.put(`http://localhost:8080/ubicacion/update/${editData.id}`, updatedData)
            .then(response => {
                if (response.data === "Ubicación actualizada exitosamente") {
                    setMensaje("Ubicación actualizada exitosamente");
                    toast.success("Ubicación actualizada exitosamente");
                    fetchData(); // Refrescar la lista
                } else {
                    setMensaje("Ubicación no encontrada");
                    toast.error("Ubicación no encontrada");
                }
                setModalOpen(false); // Cerrar el modal
            })
            .catch(error => {
                console.error("Error al actualizar la ubicación", error);
                setMensaje("Error al actualizar la ubicación");
                toast.error("Error al actualizar la ubicación");
            });
    };

    const handleDelete = (id) => {
        // Enviar petición DELETE al servidor
        axios.delete(`http://localhost:8080/ubicacion/delete/${id}`)
            .then(response => {
                if (response.data === "Ubicación eliminada exitosamente") {
                    setMensaje("Ubicación eliminada exitosamente");
                    toast.success("Ubicación eliminada exitosamente");
                    fetchData(); // Refrescar la lista
                } else {
                    setMensaje("Ubicación no encontrada");
                    toast.error("Ubicación no encontrada");
                }
            })
            .catch(error => {
                console.error("Error al eliminar la ubicación", error);
                setMensaje("Error al eliminar la ubicación");
                toast.error("Error al eliminar la ubicación");
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const datosFiltrados = datos.filter((dato) =>
        dato.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="h-[74vh] px-1 py-4 flex flex-col items-center bg-secundario text-white mt-6 rounded-lg">
            <div className="p-3 pt-0 mb-2 flex justify-between w-full">
                <button
                    className="text-[14px] px-4 py-1 bg-terceario text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                    onClick={toggleUbicacion}
                >
                    Agregar +
                </button>
                <div className="flex justify-center items-center gap-3">
                    <label htmlFor="buscar">Buscar:</label>
                    <input
                        id="buscar"
                        type="text"
                        value={busqueda}
                        onChange={handleBusqueda}
                        className="px-3 py-[3px] border border-acento text-[14px] bg-slate-200 w-[260px] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                    />
                </div>
            </div>

            <div className="w-[50vw] border border-gray-600 rounded-lg h-[60vh] overflow-y-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-600 h-[40px] sticky top-0 z-[1]">
                        <tr>
                            <th className="px-4 py-2 text-center">ID</th> {/* Columna ID */}
                            <th className="px-4 py-2 text-start">Nombre</th>
                            <th className="px-4 py-2 text-start">Comentario</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mensaje && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">{mensaje}</td> {/* Mensaje de error */}
                            </tr>
                        )}
                        {datosFiltrados.map((dato, index) => (
                            <tr key={index} className="border-b border-gray-700">
                                <td className="px-4 py-2 text-center">{dato.id}</td> {/* Mostrar ID */}
                                <td className="px-4 py-2">{dato.nombre}</td> {/* Nombre */}
                                <td className="px-4 py-2">{dato.comentario}</td> {/* Comentario */}
                                <td className="px-4 py-2 gap-2 flex justify-center items-center">
                                    <button
                                        className="text-blue-400 hover:text-blue-600"
                                        onClick={() => handleEdit(dato.id, dato.nombre, dato.comentario)}
                                    >
                                        <FaEdit /> {/* Ícono de edición */}
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-600"
                                        onClick={() => handleDelete(dato.id)}
                                    >
                                        <FaTrash /> {/* Ícono de eliminar */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de edición */}
            {modalOpen && (
                <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
                    <div className="bg-secundario p-6 rounded-lg w-[400px]">
                        <h2 className="text-lg font-semibold mb-4 text-textClaro">Editar Ubicación</h2>
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-textClaro">Nombre</label>
                            <input
                                type="text"
                                value={editData.nombre}
                                onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                                className="w-full px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm mb-2 text-textClaro">Comentario</label>
                            <input
                                type="text"
                                value={editData.comentario}
                                onChange={(e) => setEditData({ ...editData, comentario: e.target.value })}
                                className="w-full px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-cuarto text-white px-4 py-2 rounded"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-terceario text-white px-4 py-2 rounded"
                                onClick={handleUpdate}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {ubicacion && <AgregarUbicacion toggleUbicacion={toggleUbicacion} fetchData={fetchData} />}
        </div>
    );
};

export default TablaUbicacion;
