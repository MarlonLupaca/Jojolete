import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AgregarProducto from "../components/AgregarProducto";
import { useEffect, useState } from "react";
import AgregarCategoria from "../components/AgregarCategoria";
import AgregarMedida from "../components/AgregarMedida";
import AgregarProveedor from "../components/AgregarProveedor";
import AgregarUbicacion from "../components/AgregarUbicacion";
import { RxButton } from "react-icons/rx";
import BotonOpciones from "../components/BotonOpciones";
import BotonAgregar from "../components/BotonAgregar";
import axios from "axios";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [search, setSearch] = useState(""); 
    const [modales, setModales] = useState({
        agregar: false,
        categoria: false,
        medida: false,
        proveedor: false,
        ubicacion: false,
    });

    const fetchProductos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/producto/all");
            setProductos(response.data);
            setProductosFiltrados(response.data); 
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const addProducto = (data) => {
        setProductos((prev) => [
            ...prev,
            { 
                codigo: data.codigo, 
                nombre: data.nombre, 
                stock: data.stock, 
                precioVenta: data.precioVenta, 
                ubicacion: data.ubicacion 
            }
        ]);
        setProductosFiltrados((prev) => [
            ...prev,
            { 
                codigo: data.codigo, 
                nombre: data.nombre, 
                stock: data.stock, 
                precioVenta: data.precioVenta, 
                ubicacion: data.ubicacion 
            }
        ]);
    };

    const toggleModal = (modal) => {
        setModales((prevState) => ({ ...prevState, [modal]: !prevState[modal] }));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setProductosFiltrados(productos);
        } else {
            setProductosFiltrados(
                productos.filter((item) =>
                    item.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                )
            );
        }
    };

    return (
        <div className="bg-primario flex">
            <Sidebar />
            <div className="w-full">
                <Header name="Productos" />
                <div className="p-6 flex flex-col">
                    <div className="text-[14px] font-[700] flex gap-3 p-4 rounded-lg bg-secundario">
                        <BotonAgregar label="Agregar Producto" onClick={() => toggleModal("agregar")} />
                        <BotonAgregar label="Agregar Categoria" onClick={() => toggleModal("categoria")} />
                        <BotonAgregar label="Agregar Medida" onClick={() => toggleModal("medida")} />
                        <BotonAgregar label="Agregar Proveedor" onClick={() => toggleModal("proveedor")} />
                        <BotonAgregar label="Agregar Ubicacion" onClick={() => toggleModal("ubicacion")} />
                    </div>

                    {modales.agregar && <AgregarProducto addProducto={addProducto} toggleAgregar={() => toggleModal("agregar")} />}
                    {modales.categoria && <AgregarCategoria toggleCategoria={() => toggleModal("categoria")} />}
                    {modales.medida && <AgregarMedida toggleMedida={() => toggleModal("medida")} />}
                    {modales.proveedor && <AgregarProveedor toggleProveedor={() => toggleModal("proveedor")} />}
                    {modales.ubicacion && <AgregarUbicacion toggleUbicacion={() => toggleModal("ubicacion")} />}

                    <div className="p-4 py-6 h-[73vh] bg-secundario text-white mt-6 rounded-lg">
                        <div className="p-3 pt-0 mb-2 flex justify-end">
                            <div className="flex justify-center items-center gap-3">
                                <label htmlFor="buscar">Buscar:</label>
                                <input
                                    id="buscar"
                                    type="text"
                                    value={search}
                                    onChange={handleSearch}
                                    className="px-3 py-[3px] border border-acento text-[14px] bg-slate-200 w-[260px] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                                />
                            </div>
                        </div>
                        <div className="border border-gray-600 rounded-lg h-[90%] overflow-y-auto relative">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-600 h-[40px] sticky top-0 z-[1]">
                                    <tr>
                                        <th className="w-[200px]">
                                            <RxButton className="m-auto text-[25px] font-[700]" />
                                        </th>
                                        <th className="text-start">Nombre</th>
                                        <th className="text-start w-[150px]">Stock</th>
                                        <th className="text-start w-[150px]">Precio Venta</th>
                                        <th className="text-start">Ubicacion</th>
                                        <th className="text-start w-[150px]">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosFiltrados.map((item) => (
                                        <tr key={item.codigo} className="border-b-2 h-[50px] border-gray-600">
                                            <td className="text-center">{item.codigo}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.stock}</td>
                                            <td>S/. {item.precioVenta}</td>
                                            <td>{item.ubicacion}</td>
                                            <td>
                                                <BotonOpciones fetchProductos={fetchProductos} codigo={item.codigo} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productos;
