import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaTable, FaEdit, FaTrash } from "react-icons/fa"; // Importar íconos

const Categorias = () => {
    const [tablaActiva, setTablaActiva] = useState(null); // Estado para la tabla visible
    const [busqueda, setBusqueda] = useState(""); // Estado para el texto del buscador
    const [tablasFiltradas, setTablasFiltradas] = useState({}); // Estado para las tablas filtradas

    const tablas = {
        tabla1: [
            { name: 'Ricky Antony', email: 'ricky@example.com' },
            { name: 'Emma Watson', email: 'emma@example.com' },
        ],
        tabla2: [
            { name: 'Rowen Atkinson', email: 'rown@example.com' },
            { name: 'Antony Hopkins', email: 'antony@example.com' },
        ],
        tabla3: [
            { name: 'Jennifer Schramm', email: 'jennifer@example.com' },
            { name: 'Steve Jobs', email: 'steve@example.com' },
        ],
        tabla4: [
            { name: 'Mark Zuckerberg', email: 'mark@example.com' },
            { name: 'Elon Musk', email: 'elon@example.com' },
        ],
    };

    // Filtrar datos de la tabla activa según la búsqueda
    const handleBusqueda = (e) => {
        const valorBusqueda = e.target.value.toLowerCase();
        setBusqueda(valorBusqueda);
        if (tablaActiva && tablas[tablaActiva]) {
            setTablasFiltradas({
                ...tablasFiltradas,
                [tablaActiva]: tablas[tablaActiva].filter(
                    (item) =>
                        item.name.toLowerCase().includes(valorBusqueda) ||
                        item.email.toLowerCase().includes(valorBusqueda)
                ),
            });
        }
    };

    const renderTabla = (tablaKey) => {
        const datos = tablasFiltradas[tablaKey] || tablas[tablaKey];
        return (
            <div className="h-[74vh] px-1 py-4 flex flex-col items-center bg-secundario text-white mt-6 rounded-lg">
                <div className="p-3 pt-0 mb-2 flex justify-between w-full">
                    <button
                        className="text-[14px] px-4 py-1 bg-terceario text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
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
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((dato, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{dato.name}</td>
                                    <td className="px-4 py-2">{dato.email}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="text-blue-400 hover:text-blue-600">
                                            <FaEdit /> {/* Ícono de edición */}
                                        </button>
                                        <button className="text-red-400 hover:text-red-600">
                                            <FaTrash /> {/* Ícono de eliminar */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-primario h-[100vh] flex ">
            <Sidebar />
            <div className="w-full h-full">
                <Header name="Datos/Tablas" />
                <div className="p-6 h-full ">
                    {/* Botones para cambiar de tabla */}
                    <div className="flex gap-4 mb-4 p-4 text-[14px]  bg-secundario rounded-lg">
                        <button
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setTablaActiva('tabla1')}
                        >
                            <FaTable /> Tabla 1
                        </button>
                        <button
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setTablaActiva('tabla2')}
                        >
                            <FaTable /> Tabla 2
                        </button>
                        <button
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setTablaActiva('tabla3')}
                        >
                            <FaTable /> Tabla 3
                        </button>
                        <button
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setTablaActiva('tabla4')}
                        >
                            <FaTable /> Tabla 4
                        </button>
                    </div>

                    {/* Contenedor de tabla */}
                    <div className="w-full mx-auto">
                        {tablaActiva && renderTabla(tablaActiva)}
                        {!tablaActiva && (
                            <p className="text-white text-center">
                                Selecciona una tabla para mostrar los datos.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categorias;
