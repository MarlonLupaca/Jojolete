import { useState } from "react";
import { FaBarcode } from "react-icons/fa";

const AgregarProducto = ({ toggleAgregar, addProducto }) => {
  // Estado para el formulario
    const [formData, setFormData] = useState({
        codigo: "",
        nombre: "",
        categoria: "",
        stock: "",
        unidad: "",
        precioCompra: "",
        precioVenta: "",
        proveedor: "",
        stockMinimo: "",
        ubicacion: "",
        comentario: ""
    });

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
        addProducto(formData)
        // Aquí puedes agregar la lógica para guardar o procesar los datos
        setFormData({
        codigo: "",
        nombre: "",
        categoria: "",
        stock: "",
        unidad: "",
        precioCompra: "",
        precioVenta: "",
        proveedor: "",
        stockMinimo: "",
        ubicacion: "",
        comentario: ""
        }); // Limpiar el formulario después de enviar
    };

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
                    <option value="Categoria 1">Categoria 1</option>
                    <option value="Categoria 2">Categoria 2</option>
                    <option value="Categoria 3">Categoria 3</option>
                    <option value="Categoria 4">Categoria 4</option>
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
                <label htmlFor="unidad">Unidad de medida</label>
                <select
                    name="unidad"
                    id="unidad"
                    value={formData.unidad}
                    onChange={handleChange}
                    className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                >
                    <option value="Unidad 1">Unidad 1</option>
                    <option value="Unidad 2">Unidad 2</option>
                    <option value="Unidad 3">Unidad 3</option>
                    <option value="Unidad 4">Unidad 4</option>
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
                    <option value="Proveedor 1">Proveedor 1</option>
                    <option value="Proveedor 2">Proveedor 2</option>
                    <option value="Proveedor 3">Proveedor 3</option>
                    <option value="Proveedor 4">Proveedor 4</option>
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
                    <option value="Ubicacion 1">Ubicacion 1</option>
                    <option value="Ubicacion 2">Ubicacion 2</option>
                    <option value="Ubicacion 3">Ubicacion 3</option>
                    <option value="Ubicacion 4">Ubicacion 4</option>
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
