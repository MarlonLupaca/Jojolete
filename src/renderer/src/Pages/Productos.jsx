
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import AgregarProducto from "../components/AgregarProducto"
import { useState } from "react"
import AgregarCategoria from "../components/AgregarCategoria"
import AgregarMedida from "../components/AgregarMedida"
import AgregarProveedor from "../components/AgregarProveedor"
import AgregarUbicacion from "../components/AgregarUbicacion"
import { RxButton, RxCaretDown  } from "react-icons/rx"

const Productos = () => {

    const [agregar, setagregar] = useState(false)
    const [categoria, setcategoria] = useState(false)
    const [medida, setmedida] = useState(false)
    const [proveedor, setproveedor] = useState(false)
    const [ubicacion, setubicacion] = useState(false)

    const [opciones, setopciones] = useState(false)

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

    const toggleOpciones = () => {
        setopciones(!opciones)
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
                    <div className="p-4 py-6 h-[73vh]  bg-secundario text-white mt-6 rounded-lg">
                        <div className="border border-gray-600 rounded-lg h-[100%] overflow-y-auto relative">
                            <table className="w-full border-collapse">
                            <thead className="bg-gray-600 h-[40px] sticky top-0">
                                <tr>
                                    <th className="w-[80px]"><RxButton className="m-auto text-[25px] font-[700]"/></th>
                                    <th className="text-start">Nombre</th>
                                    <th className="text-start">Stock</th>
                                    <th className="text-start">Venta</th>
                                    <th className="text-start">Ubicacion</th>
                                    <th className="text-start w-[150px] ">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b-2 h-[50px] border-gray-600">
                                    <td className="text-center">1</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">Cell</td>
                                    <td className="">
                                        <button className="border text-[14px] relative border-textoGris px-2 py-1 rounded-lg transition-all duration-75 hover:scale-[1.01]">
                                            <span 
                                                className="flex items-center gap-1" 
                                                onClick={toggleOpciones}>Opciones <RxCaretDown /></span>
                                            
                                            {
                                                opciones && <div className="bg-secundario gap-[3px] left-0 top-[100%] absolute border rounded-lg border-textoGris flex flex-col items-start p-2">
                                                                <button>
                                                                    Eliminar
                                                                </button>
                                                                <button>
                                                                    Editar
                                                                </button>
                                                                <button className="text-nowrap">
                                                                    Ver detalles
                                                                </button>
                                                            </div>
                                            }
                                            
                                        </button>
                                    </td>
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
