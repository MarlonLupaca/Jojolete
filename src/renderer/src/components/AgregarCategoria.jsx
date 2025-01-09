import { FaBarcode } from 'react-icons/fa'

const AgregarCategoria = ( {toggleCategoria} ) => {
    return (
        <div  className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
            <div className="bg-secundario rounded-lg w-fit py-4 px-5 pb-5">
                <span className="text-[20px] mb-2 text-textoClaro font-[700] text-center block">Agregar categoria</span>
                <form className="text-textoClaro flex flex-col gap-3">
                    <div className="text-[15px] flex flex-col gap-1">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            placeholder='nombre'
                            type="text" 
                            name="nombre" 
                            id="nombre"
                            className='w-[450px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario' 
                        />
                    </div>
                    <div className="text-[15px] flex flex-col gap-1">
                        <label htmlFor="Descripcion">Comentario</label>
                        <textarea
                            placeholder='comentario'
                            type="text"
                            name="Descripcion" 
                            id="Descripcion"
                            className=' px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario max-h-[70px]' 
                        />
                    </div>
                    <div className="mt-2 flex justify-end gap-2 text-[14px] font-[700]">
                        <button 
                            onClick={toggleCategoria}
                            className="px-4 py-1 bg-cuarto text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
                        >
                            Cancelar
                        </button>
                        <button
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

export default AgregarCategoria
