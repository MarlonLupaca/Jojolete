import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaTable, FaEdit, FaTrash } from "react-icons/fa";
import TablaCategoria from '../components/TablaCategoria';
import TablaMedida from '../components/TablaMedida';
import TablaPorveedores from '../components/TablaPorveedores';
import TablaUbicacion from '../components/TablaUbicacion';

const Categorias = () => {
    // Estados para controlar qué tabla se muestra
    const [categoria, setCategoria] = useState(true);  // Empezamos con la tabla de categoria activa
    const [medida, setMedida] = useState(false);
    const [proveedor, setProveedor] = useState(false);
    const [ubicacion, setUbicacion] = useState(false);

    // Funciones para cambiar entre las tablas
    const showCategoria = () => {
        setCategoria(true);
        setMedida(false);
        setProveedor(false);
        setUbicacion(false);
    }

    const showMedida = () => {
        setCategoria(false);
        setMedida(true);
        setProveedor(false);
        setUbicacion(false);
    }

    const showProveedor = () => {
        setCategoria(false);
        setMedida(false);
        setProveedor(true);
        setUbicacion(false);
    }

    const showUbicacion = () => {
        setCategoria(false);
        setMedida(false);
        setProveedor(false);
        setUbicacion(true);
    }

    return (
        <div className="bg-primario h-[100vh] flex">
            <Sidebar />
            <div className="w-full h-full">
                <Header name="Datos/Tablas" />
                <div className="p-6 h-full">
                    {/* Botones para cambiar de tabla */}
                    <div className="flex gap-4 mb-4 p-4 text-[14px] bg-secundario rounded-lg">
                        <button
                            onClick={showCategoria}
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FaTable /> Tabla Categoría
                        </button>
                        <button
                            onClick={showMedida}
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FaTable /> Tabla Medida
                        </button>
                        <button
                            onClick={showProveedor}
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FaTable /> Tabla Proveedor
                        </button>
                        <button
                            onClick={showUbicacion}
                            className="px-4 py-1 flex items-center gap-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FaTable /> Tabla Ubicación
                        </button>
                    </div>

                    <div className="w-full mx-auto">
                        {categoria && <TablaCategoria />}
                        {medida && <TablaMedida />}
                        {proveedor && <TablaPorveedores />}
                        {ubicacion && <TablaUbicacion />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categorias;
