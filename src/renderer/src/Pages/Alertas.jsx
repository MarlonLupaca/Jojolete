import Header from "../components/Header"
import ProductosAlerta from "../components/ProductosAlerta"
import Sidebar from "../components/Sidebar"

const Alertas = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full ">
                    <Header name="Alertas"/>
                    <div className=" p-6">
                        <div className="flex-1 bg-secundario rounded-lg text-white  p-6">
                            <ProductosAlerta />
                        </div>
                    </div>
                    
            </div>
        </div>
    )
}

export default Alertas
