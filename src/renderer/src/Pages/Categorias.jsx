import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Categorias = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                <Header name="Categorias"/>
                Categorias
            </div>
        </div>
    )
}

export default Categorias
