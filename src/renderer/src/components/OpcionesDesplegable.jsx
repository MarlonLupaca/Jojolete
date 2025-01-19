import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";

const OpcionesDesplegable = () => {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const toggleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    return (
        <div className="relative text-[14px]">
            {/* Botón de opciones */}
            <div
                className="border gap-1 text-[14px] border-textoGris h-[30px] w-[90px] flex justify-center items-center rounded-lg cursor-pointer hover:scale-[1.01]"
                onClick={toggleOpciones}
            >
                Opciones <RxCaretDown />
            </div>

            {/* Opciones desplegables */}
            {mostrarOpciones && (
                <div className="absolute z-50 bg-secundario gap-[3px] left-0 top-[100%] border rounded-lg border-textoGris flex flex-col items-start p-2">
                    <button
                        className="transition-all duration-100 hover:text-terceario"
                        onClick={() => setMostrarOpciones(false)}
                    >
                        Eliminar
                    </button>
                    <button
                        className="transition-all duration-100 hover:text-terceario"
                        onClick={() => setMostrarOpciones(false)}
                    >
                        Editar
                    </button>
                    <button
                        className="transition-all duration-100 hover:text-terceario"
                        onClick={() => setMostrarOpciones(false)}
                    >
                        Ver detalles
                    </button>
                </div>
            )}
        </div>
    );
};

export default OpcionesDesplegable;
