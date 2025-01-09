
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import AgregarProducto from "../components/AgregarProducto"
import { useState } from "react"
import AgregarCategoria from "../components/AgregarCategoria"
import AgregarMedida from "../components/AgregarMedida"
import AgregarProveedor from "../components/AgregarProveedor"
import AgregarUbicacion from "../components/AgregarUbicacion"

const Productos = () => {

    const [agregar, setagregar] = useState(false)
    const [categoria, setcategoria] = useState(false)
    const [medida, setmedida] = useState(false)
    const [proveedor, setproveedor] = useState(false)
    const [ubicacion, setubicacion] = useState(false)

    const toggleAgregar = () => {
        setagregar(!agregar)
    }

    const toggleCategoria = () => {
        setcategoria(!categoria)
    }

    const toggleMedida = () => {
        setmedida(!medida)
    }

    const toggleProveedor = () => {
        setproveedor(!proveedor)
    }
    const toggleUbicacion = () => {
        setubicacion(!ubicacion)
    }

    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                <Header name="Productos"/>
                <div className="p-6 flex flex-col">
                    <div className="text-[14px] font-[700] flex gap-3 p-4 rounded-lg bg-secundario">
                        <button 
                            className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                            onClick={toggleAgregar}
                        >
                            Agregar Producto +
                        </button>
                        <button 
                            className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                            onClick={toggleCategoria}
                        >
                            Agregar Categoria +
                        </button>
                        <button 
                            className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                            onClick={toggleMedida}
                        >
                            Agregar Medida +
                        </button>
                        <button 
                            className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                            onClick={toggleProveedor}
                        >
                            Agregar Proveedor +
                        </button>
                        <button 
                            className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                            onClick={toggleUbicacion}
                        >
                            Agregar Ubicacion +
                        </button>
                    </div>
                    {
                        agregar && <AgregarProducto toggleAgregar={toggleAgregar}/>
                    }
                    {
                        categoria && <AgregarCategoria toggleCategoria={toggleCategoria}/>
                    }
                    {
                        medida && <AgregarMedida toggleMedida={toggleMedida}/>
                    }
                    {
                        proveedor && <AgregarProveedor toggleProveedor={toggleProveedor}/>
                    }
                    {
                        ubicacion && <AgregarUbicacion toggleUbicacion={toggleUbicacion}/>
                    }
                    <div className="p-4 py-6  bg-secundario text-white mt-6 rounded-lg">
                        <div className="border border-gray-600 rounded-lg h-[557px] overflow-y-auto relative">
                            <table className="w-full border-collapse">
                            <thead className="bg-gray-600 h-[40px] sticky top-0">
                                <tr>
                                    <th className="w-[80px]">Cant.</th>
                                    <th className="text-start">Descripcion</th>
                                    <th className="text-start">Precio unit</th>
                                    <th className="text-start">Unidad</th>
                                    <th className="text-start">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                <tr className="border-b-2 h-[40px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                </tr>
                                
                            </tbody>
                            </table>
                        </div>            
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Productos
