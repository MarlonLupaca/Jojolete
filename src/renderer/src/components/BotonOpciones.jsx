import { useState } from 'react'
import { RxCaretDown } from 'react-icons/rx'
import AgregarProducto from './AgregarProducto'

const BotonOpciones = ({editarProducto, producto}) => {

    const [opciones, setopciones] = useState(false)

    const toggleOpciones = () => {
        setopciones(!opciones)
    }

    return (
        <>
            <div className="border text-[14px] relative border-textoGris h-[30px] w-[90px] flex justify-center items-center rounded-lg">
                <span 
                    className="cursor-pointer flex w-full h-full items-center justify-center gap-1 transition-all duration-75 hover:scale-[1.01] " 
                    onClick={toggleOpciones}>Opciones <RxCaretDown /></span>
                
                {
                    opciones && <div className="z-50 bg-secundario gap-[3px] left-0 top-[100%] absolute border rounded-lg border-textoGris flex flex-col items-start p-2">
                                    <button 
                                        className='transition-all duration-100 hover:text-terceario'
                                        onClick={()=>{
                                            toggleOpciones()
                                        }}
                                        >
                                        Eliminar
                                    </button>
                                    <button 
                                        className='transition-all duration-100 hover:text-terceario'
                                        onClick={ () =>  { 
                                            toggleOpciones()
                                            editarProducto(producto)
                                        }}
                                        >
                                        Editar
                                    </button>
                                    <button 
                                        className="text-nowrap transition-all duration-100 hover:text-terceario" 
                                        onClick={()=>{
                                            toggleOpciones()
                                        }}
                                        >
                                        Ver detalles
                                    </button>
                                </div>
                }
            
                
            </div>
        </>
    )
}

export default BotonOpciones
