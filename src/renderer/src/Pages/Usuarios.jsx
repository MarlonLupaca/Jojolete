import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Usuarios = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                <Header name="Usuarios"/>
                Usuarios
            </div>
        </div>
    )
}

export default Usuarios
