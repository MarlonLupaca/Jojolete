import React, { useState } from 'react'
import { FaBarcode } from 'react-icons/fa'

const EditarProducto = ({producto, cerrarEditar}) => {

    const [venta, setventa] = useState(producto.precioVenta)

    const handleVenta = (e) =>{
        console.log(venta)
        setventa(e.target.value)
        
    }

    
    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
            <div className="bg-secundario rounded-lg w-fit py-4 px-5 pb-5">
                <span className="text-[20px] mb-2 text-textoClaro font-[700] text-center block">Agregar productos</span>
                <form className="text-textoClaro flex flex-col gap-3">
                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="nombre" className="flex items-center gap-2">Codigo <FaBarcode className=' text-[20px]'/>
                            </label>
                            <input
                                placeholder="codigo" 
                                type="text" 
                                name="nombre" 
                                id="nombre"
                                value={producto.codigo}
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario' 
                            />
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                placeholder="nombre"
                                type="text" 
                                name="nombre" 
                                id="nombre"
                                value={producto.nombre}
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario' 
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="nombre">Categoria</label>
                            <select 
                                name="" 
                                id=""
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario'
                                >
                                <option value="">Categoria 1</option>
                                <option value="">Categoria 2</option>
                                <option value="">Categoria 3</option>
                                <option value="">Categoria 4</option>
                            </select>
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="Stock">Stock</label>
                            <input 
                                placeholder="stock"
                                type="number"
                                min={0} 
                                name="Stock" 
                                id="Stock"
                                value={producto.stock}
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario' 
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="Unidad">Unidad de medida</label>
                            <select 
                                name="" 
                                id=""
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario'
                                >
                                <option value="">Unidad 1</option>
                                <option value="">Unidad 2</option>
                                <option value="">Unidad 3</option>
                                <option value="">Unidad 4</option>
                            </select>
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="Stock">Precio de compra S/.</label>
                            <input 
                                placeholder="compra"
                                type="number"
                                min={0} 
                                name="Stock" 
                                id="Stock"
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario' 
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="Stock">Precio de venta S/.</label>
                            <input 
                                placeholder="venta"
                                type="number"
                                min={0} 
                                name="Stock" 
                                id="Stock"
                                value={venta}
                                onChange={handleVenta}
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario' 
                            />
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="Unidad">Proveedor</label>
                            <select 
                                name="" 
                                id=""
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario'
                                >
                                <option value="">Proveedor 1</option>
                                <option value="">Proveedor 2</option>
                                <option value="">Proveedor 3</option>
                                <option value="">Proveedor 4</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="Stock">Stock minimo permitido</label>
                            <input 
                                placeholder="minimo"
                                type="number"
                                min={0} 
                                name="Stock" 
                                id="Stock"
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario' 
                            />
                        </div>
                        <div className="text-[15px] flex flex-col gap-1">
                            <label htmlFor="Unidad">Ubicacion</label>
                            <select 
                                name="" 
                                id=""
                                className='w-[250px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario'
                                >
                                <option value="">Ubicacion 1</option>
                                <option value="">Ubicacion 2</option>
                                <option value="">Ubicacion 3</option>
                                <option value="">Ubicacion 4</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-[15px] flex flex-col gap-1">
                        <label htmlFor="Descripcion">Comentario</label>
                        <textarea
                            placeholder="Comentario"
                            type="text"
                            name="Descripcion" 
                            id="Descripcion"
                            className=' px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario max-h-[70px]' 
                        />
                    </div>
                    <div className="mt-2 flex justify-end gap-2 text-[14px] font-[700]">
                        <button 
                            onClick={cerrarEditar}
                            type='button'
                            className="px-4 py-1 bg-cuarto text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                        >
                            Cancelar
                        </button>
                        <button
                            type='button'
                            className="px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                        >
                            Agregar
                        </button>
                    </div>
                    
                    
                </form>
                
            </div>
        </div>
    )
}

export default EditarProducto
