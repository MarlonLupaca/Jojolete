import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Reportes = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                <Header name="Reportes"/>
                Reportes
            </div>
        </div>
    )
}

export default Reportes
