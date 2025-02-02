import DetalleEntrada from "../components/DetalleEntrada"
import DetalleVenta from "../components/DetalleVenta"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Entradas = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                <Header name="Entradas"/>
                <div className="p-6">
                    <DetalleEntrada/>
                </div>
                
            </div>
        </div>
    )
}

export default Entradas
