import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Alertas = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                    <Header name="Alertas"/>
                    Alertas
            </div>
        </div>
    )
}

export default Alertas
