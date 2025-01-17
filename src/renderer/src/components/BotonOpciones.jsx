import { useState } from 'react';
import { RxCaretDown } from 'react-icons/rx';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductoModal from './ProductoModal';
import EditarProducto from './EditarProducto';

const BotonOpciones = ({ codigo, fetchProductos }) => {
    const [opciones, setOpciones] = useState(false);
    const [VerDetalle, setVerDetalle] = useState(false)

    const [Editar, setEditar] = useState(false)

    const toggleDetalle = () => {
        setVerDetalle(!VerDetalle)
    }
    const toggleEditar = () => {
        setEditar(!Editar)
    }

    const toggleOpciones = () => {
        setOpciones(!opciones);
    };

    const eliminarProducto = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/producto/delete/${codigo}`);
            if (response.data === "Producto eliminado exitosamente") {
                toast.success("Producto eliminado exitosamente");
                fetchProductos();
            } else {
                toast.error("Producto no encontrado");
            }
        } catch (error) {
            toast.error("Error al eliminar el producto");
        }
    };

    return (
        <>
            { VerDetalle && <ProductoModal toggleDetalle={toggleDetalle} codigo={codigo}/> }
            { Editar && <EditarProducto fetchProductos={fetchProductos} toggleEditar={toggleEditar} codigo={codigo}/>  }
            <div className="border text-[14px] relative border-textoGris h-[30px] w-[90px] flex justify-center items-center rounded-lg">
                <span
                    className="cursor-pointer flex w-full h-full items-center justify-center gap-1 transition-all duration-75 hover:scale-[1.01]"
                    onClick={toggleOpciones}
                >
                    Opciones <RxCaretDown />
                </span>

                {opciones && (
                    <div className="z-50 bg-secundario gap-[3px] left-0 top-[100%] absolute border rounded-lg border-textoGris flex flex-col items-start p-2">
                        <button
                            className="transition-all duration-100 hover:text-terceario"
                            onClick={() => {
                                toggleOpciones();
                                eliminarProducto();
                            }}
                        >
                            Eliminar
                        </button>
                        <button
                            className="transition-all duration-100 hover:text-terceario"
                            onClick={() => {
                                toggleOpciones();
                                toggleEditar();
                            }}
                        >
                            Editar
                        </button>
                        <button
                            className="text-nowrap transition-all duration-100 hover:text-terceario"
                            onClick={() => {
                                toggleOpciones()
                                toggleDetalle()
                            }}
                        >
                            Ver detalles
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default BotonOpciones;
