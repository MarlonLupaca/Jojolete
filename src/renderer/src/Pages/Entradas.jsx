import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Entradas = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                <Header name="Entradas"/>
                Entradas
            </div>
        </div>
    )
}

export default Entradas
