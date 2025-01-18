import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBarcode } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const EditarProducto = ({ toggleEditar, codigo, fetchProductos }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        categoria: '',
        unidadMedida: '',
        stock: 0,
        precioCompra: 0,
        precioVenta: 0,
        stockMinimo: 0,
        proveedor: '',
        ubicacion: '',
        comentario: '',
    });

    const [categorias, setCategorias] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [mensaje, setMensaje] = useState('');

    // Cargar los datos del producto al iniciar el componente
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/producto/find/${codigo}`);
                setProducto(response.data);
            } catch (error) {
                toast.error('Error al obtener los datos del producto.');
            }
        };

        // Solicitudes para cargar los datos de las categorías, unidades, proveedores y ubicaciones
        const fetchData = async () => {
            try {
                const categoriasResponse = await fetch("http://localhost:8080/categoria/all");
                const categoriasData = await categoriasResponse.json();
                setCategorias(categoriasData);

                const unidadesResponse = await fetch("http://localhost:8080/medida/all");
                const unidadesData = await unidadesResponse.json();
                setUnidades(unidadesData);

                const proveedoresResponse = await fetch("http://localhost:8080/proveedor/all");
                const proveedoresData = await proveedoresResponse.json();
                setProveedores(proveedoresData);

                const ubicacionesResponse = await fetch("http://localhost:8080/ubicacion/all");
                const ubicacionesData = await ubicacionesResponse.json();
                setUbicaciones(ubicacionesData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setMensaje("Error al cargar los datos");
            }
        };

        fetchProducto();
        fetchData();
    }, [codigo]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    // Actualizar el producto
    const handleActualizar = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/producto/update/${codigo}`, producto);
            if (response.data === 'Producto actualizado exitosamente') {
                toast.success('Producto actualizado exitosamente');
                fetchProductos();
                toggleEditar();
            } else {
                toast.error('Error al actualizar el producto.');
            }
        } catch (error) {
            toast.error('Error al actualizar el producto.');
        }
    };

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
            <div className="bg-secundario rounded-lg w-fit py-4 px-5 pb-5">
                <span className="text-[20px] mb-2 text-textoClaro font-[700] text-center block">
                    Editar producto
                </span>
                <form className="text-textoClaro flex flex-col gap-3">
                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="codigo" className="flex items-center gap-2">
                                Código <FaBarcode className="text-[20px]" />
                            </label>
                            <input
                                type="text"
                                name="codigo"
                                id="codigo"
                                value={producto.codigo}
                                readOnly
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                value={producto.nombre}
                                onChange={handleChange}
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="categoria">Categoría</label>
                            <select
                                name="categoria"
                                id="categoria"
                                value={producto.categoria}
                                onChange={handleChange}
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            >
                                <option value="">Seleciona una categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.nombre}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                value={producto.stock}
                                onChange={handleChange}
                                min="0"
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="unidadMedida">Unidad de medida</label>
                            <select
                                name="unidadMedida"
                                id="unidadMedida"
                                value={producto.unidadMedida}
                                onChange={handleChange}
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            >
                                <option value="">Seleciona una unidad</option>
                                {unidades.map((unidad) => (
                                    <option key={unidad.id} value={unidad.nombre}>
                                        {unidad.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="precioCompra">Precio de compra S/.</label>
                            <input
                                type="number"
                                name="precioCompra"
                                id="precioCompra"
                                value={producto.precioCompra}
                                onChange={handleChange}
                                min="0"
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="precioVenta">Precio de venta S/.</label>
                            <input
                                type="number"
                                name="precioVenta"
                                id="precioVenta"
                                value={producto.precioVenta}
                                onChange={handleChange}
                                min="0"
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="proveedor">Proveedor</label>
                            <select
                                name="proveedor"
                                id="proveedor"
                                value={producto.proveedor}
                                onChange={handleChange}
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            >
                                <option value="">Seleciona una proveedor</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id} value={proveedor.nombre}>
                                        {proveedor.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="stockMinimo">Stock mínimo permitido</label>
                            <input
                                type="number"
                                name="stockMinimo"
                                id="stockMinimo"
                                value={producto.stockMinimo}
                                onChange={handleChange}
                                min="0"
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            />
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="ubicacion">Ubicación</label>
                            <select
                                name="ubicacion"
                                id="ubicacion"
                                value={producto.ubicacion}
                                onChange={handleChange}
                                className="w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
                            >
                                <option value="">Seleciona una ubicacion</option>
                                {ubicaciones.map((ubicacion) => (
                                    <option key={ubicacion.id} value={ubicacion.nombre}>
                                        {ubicacion.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="text-[15px] flex flex-col gap-1">
                        <label htmlFor="comentario">Comentario</label>
                        <textarea
                            name="comentario"
                            id="comentario"
                            value={producto.comentario}
                            onChange={handleChange}
                            className="px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario max-h-[70px]"
                        />
                    </div>

                    <div className="mt-2 flex justify-end gap-2 text-[14px] font-[700]">
                        <button
                            onClick={toggleEditar}
                            type="button"
                            className="px-4 py-1 bg-cuarto text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleActualizar}
                            type="button"
                            className="px-4 py-1 bg-quito text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarProducto;
