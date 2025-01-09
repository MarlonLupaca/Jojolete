import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Stock = () => {
    return (
        <div className="bg-primario flex">
            <Sidebar/>
            <div className="w-full">
                <Header name="Stock"/>
                Stock
            </div>
        </div>
    )
}

export default Stock
