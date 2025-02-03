import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import config from './config'

const AgregarUbicacion = ({ toggleUbicacion , fetchData = null }) => {

    const url = config.API_URL

    const [nombre, setNombre] = useState('')
    const [comentario, setComentario] = useState('')

    // Función para manejar la validación y el envío de datos
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validación: nombre obligatorio
        if (!nombre) {
            toast.error('El nombre es obligatorio')
            return
        }

        // Si el comentario está vacío, guardamos "sin comentario"
        const ubicacionData = {
            nombre: nombre,
            comentario: comentario || 'sin comentario',
        }

        try {
            const response = await axios.post(`${url}/ubicacion/save}`, ubicacionData)

            if (response.data === 'Ubicación guardada exitosamente') {
                toast.success('Ubicación guardada exitosamente')
                if (fetchData != null) {
                    fetchData()
                }
                // Opcional: Limpiar campos o realizar otras acciones
                setNombre('')
                setComentario('')
            } else {
                toast.error('Hubo un error al guardar la ubicación')
            }
        } catch (error) {
            toast.error('Error de servidor, intente nuevamente')
        }
    }

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
            <div className="bg-secundario rounded-lg w-fit py-4 px-5 pb-5">
                <span className="text-[20px] mb-2 text-textoClaro font-[700] text-center block">Agregar ubicación</span>
                <form className="text-textoClaro flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="text-[15px] flex flex-col gap-1">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            placeholder="nombre"
                            type="text" 
                            name="nombre" 
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-[450px] px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario" 
                        />
                    </div>
                    <div className="text-[15px] flex flex-col gap-1">
                        <label htmlFor="Descripcion">Comentario</label>
                        <textarea
                            placeholder="comentario"
                            type="text"
                            name="Descripcion" 
                            id="Descripcion"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            className="px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario max-h-[70px]" 
                        />
                    </div>
                    <div className="mt-2 flex justify-end gap-2 text-[14px] font-[700]">
                        <button 
                            type="button"
                            onClick={toggleUbicacion}
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
    )
}

export default AgregarUbicacion
