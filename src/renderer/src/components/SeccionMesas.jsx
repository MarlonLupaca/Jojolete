
import React from 'react';

const SeccionMesas = ({ setMesaSeleccionada, agregarMesa, eliminarMesa, mesas }) => {
    return (
        <div className="relative w-1/3 bg-secundario border-r rounded-l-lg p-6 border-textoGris">
            <h2 className="text-lg font-bold mb-4">Mesas</h2>
            <div className="grid grid-cols-3 gap-2">
                {mesas.map((mesa) => (
                    <div
                        key={mesa.id}
                        className={`p-4 rounded-md text-center cursor-pointer transition-transform transform hover:scale-105 ${
                            mesa.estado === 'Ocupada'
                                ? 'bg-cuarto text-white'
                                : 'bg-sexto text-white'
                        }`}
                        onClick={() => setMesaSeleccionada(mesa)}
                    >
                        <h3 className="text-sm font-semibold">{mesa.numero}</h3>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-6 font-[700] w-full text-[14px] left-0 flex justify-center items-center gap-4">
                <button
                    onClick={agregarMesa}
                    className="bg-sexto text-white px-3 py-2 rounded-md hover:bg-green-700"
                >
                    Agregar Mesa
                </button>
                <button
                    onClick={eliminarMesa}
                    className="bg-cuarto text-white px-3 py-2 rounded-md hover:bg-red-700"
                >
                    Eliminar Mesa
                </button>
            </div>
        </div>
    );
};

export default SeccionMesas;