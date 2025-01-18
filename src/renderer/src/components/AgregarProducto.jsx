import { useEffect, useState } from "react";
import { FaBarcode } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';  // Importa el toast para las notificaciones

const AgregarProducto = ({ toggleAgregar, addProducto }) => {
    // Estado para el formulario
    const [formData, setFormData] = useState({
        codigo: "",
        nombre: "",
        categoria: "",
        stock: "",
        unidadMedida: "",
        precioCompra: "",
        precioVenta: "",
        proveedor: "",
        stockMinimo: "",
        ubicacion: "",
        comentario: ""
    });

    // Estado para las opciones de select
    const [categorias, setCategorias] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación de campos obligatorios
        const requiredFields = [
            /** aqui reemplaza unidadMedida por "Unidad" y stockMonimo por "Stock Minimo si reemplazas reemplazalo donde se deb apra que funciones como esta funcionando " */
            'codigo', 'nombre', 'categoria', 'stock', 'unidadMedida', 'precioCompra',
            'precioVenta', 'proveedor', 'stockMinimo', 'ubicacion'
        ];
    
        for (let field of requiredFields) {
            if (!formData[field] || formData[field] === "") {
                toast.error(`El campo ${field} es obligatorio.`);
                return;
            }
        }
    
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:8080/producto/save', formData);
            if (response.data === "Producto guardado exitosamente") {
                toast.success("Producto guardado exitosamente");
                addProducto(formData);  // Agregar el producto al estado global si es necesario
                // Limpiar el formulario después de enviar
                setFormData({
                    codigo: "",
                    nombre: "",
                    categoria: "",
                    stock: "",
                    unidadMedida: "",
                    precioCompra: "",
                    precioVenta: "",
                    proveedor: "",
                    stockMinimo: "",
                    ubicacion: "",
                    comentario: ""
                });
            } else {
                toast.error(response.data);  // Si la respuesta es otro mensaje, mostrarlo como error
            }
        } catch (error) {
            toast.error("Error al guardar el producto. Intenta de nuevo.");
            console.error("Error al enviar los datos:", error);
        }
    };
    
    useEffect(() => {
        // Solicitud para obtener las categorías
        fetch("http://localhost:8080/categoria/all")
            .then((response) => response.json())
            .then((data) => {
                setCategorias(data);
            })
            .catch((error) => {
                console.error("Error al obtener las categorías:", error);
                setMensaje("Error al cargar las categorías");
            });

        // Solicitud para obtener las unidades
        fetch("http://localhost:8080/medida/all")
            .then((response) => response.json())
            .then((data) => {
                setUnidades(data);
            })
            .catch((error) => {
                console.error("Error al obtener las unidades:", error);
                setMensaje("Error al cargar las unidades");
            });

        // Solicitud para obtener los proveedores
        fetch("http://localhost:8080/proveedor/all")
            .then((response) => response.json())
            .then((data) => {
                setProveedores(data);
            })
            .catch((error) => {
                console.error("Error al obtener los proveedores:", error);
                setMensaje("Error al cargar los proveedores");
            });

        // Solicitud para obtener las ubicaciones
        fetch("http://localhost:8080/ubicacion/all")
            .then((response) => response.json())
            .then((data) => {
                setUbicaciones(data);
            })
            .catch((error) => {
                console.error("Error al obtener las ubicaciones:", error);
                setMensaje("Error al cargar las ubicaciones");
            });
    }, []);

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
        <div className="bg-secundario rounded-lg w-fit py-4 px-5 pb-5">
            <span className="text-[20px] mb-2 text-textoClaro font-[700] text-center block">
            Agregar productos
            </span>
            <form onSubmit={handleSubmit} className="text-textoClaro flex flex-col gap-3">
            <div className="flex gap-4">
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="codigo" className="flex items-center gap-2">
                    Codigo <FaBarcode className="text-[20px]" />
                </label>
                <input
                    placeholder="codigo"
                    type="text"
                    name="codigo"
                    id="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                />
                </div>
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="nombre">Nombre</label>
                <input
                    placeholder="nombre"
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                />
                </div>
            </div>

            {/* Categoria y Stock */}
            <div className="flex gap-4">
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="categoria">Categoria</label>
                <select
                    name="categoria"
                    id="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                >
                    <option value="">Seleciona una categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
                    ))}
                </select>
                </div>
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                    placeholder="stock"
                    type="number"
                    name="stock"
                    id="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                />
                </div>
            </div>

            {/* Unidad y Precios */}
            <div className="flex gap-4">
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="unidadMedida">Unidad de medida</label>
                <select
                    name="unidadMedida"
                    id="unidadMedida"
                    value={formData.unidadMedida}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                >
                    <option value="">Seleciona una medida</option>
                    {unidades.map((unidad) => (
                        <option key={unidad.id} value={unidad.nombre}>{unidad.nombre}</option>
                    ))}
                </select>
                </div>
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="precioCompra">Precio de compra S/.</label>
                <input
                    placeholder="compra"
                    type="number"
                    name="precioCompra"
                    id="precioCompra"
                    value={formData.precioCompra}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                />
                </div>
            </div>

            {/* Precio Venta, Proveedor y Stock Mínimo */}
            <div className="flex gap-4">
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="precioVenta">Precio de venta S/.</label>
                <input
                    placeholder="venta"
                    type="number"
                    name="precioVenta"
                    id="precioVenta"
                    value={formData.precioVenta}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                />
                </div>
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="proveedor">Proveedor</label>
                <select
                    name="proveedor"
                    id="proveedor"
                    value={formData.proveedor}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                >
                    <option value="">Seleciona una proveedor</option>
                    {proveedores.map((proveedor) => (
                        <option key={proveedor.id} value={proveedor.nombre}>{proveedor.nombre}</option>
                    ))}
                </select>
                </div>
            </div>

            {/* Stock Mínimo y Ubicación */}
            <div className="flex gap-4">
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="stockMinimo">Stock minimo permitido</label>
                <input
                    placeholder="minimo"
                    type="number"
                    name="stockMinimo"
                    id="stockMinimo"
                    value={formData.stockMinimo}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                />
                </div>
                <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="ubicacion">Ubicacion</label>
                <select
                    name="ubicacion"
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                >
                    <option value="">Seleciona una ubicacion</option>
                    {ubicaciones.map((ubicacion) => (
                        <option key={ubicacion.id} value={ubicacion.nombre}>{ubicacion.nombre}</option>
                    ))}
                </select>
                </div>
            </div>

            {/* Comentarios */}
            <div className="text-[15px] flex flex-col gap-1">
                <label htmlFor="comentario">Comentario</label>
                <textarea
                placeholder="Comentario"
                name="comentario"
                id="comentario"
                value={formData.comentario}
                onChange={handleChange}
                className="px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario max-h-[70px]"
                />
            </div>

            {/* Botones */}
            <div className="mt-2 flex justify-end gap-2 text-[14px] font-[700]">
                <button
                onClick={toggleAgregar}
                className="px-4 py-1 bg-cuarto text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                >
                Agregar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default AgregarProducto;
