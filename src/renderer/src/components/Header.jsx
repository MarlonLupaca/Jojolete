import React, { useContext } from 'react';
import { UserContext } from './UserContext.jsx'; // Asegúrate de importar el contexto

const Header = ({name}) => {
    const { user } = useContext(UserContext); // Accedemos al contexto UserContext

    return (
        <header className='bg-secundario h-[60px] pl-[50px] flex justify-between items-center '>
            <span className='text-textoGris font-[700]'>
                {name}
            </span>
            <div className=' flex items-center gap-4 cursor-pointer bg-[#313a52] h-full mr-4 px-4'>
                <img 
                    src="./img_mujer.png" 
                    alt="imagen de mujer" 
                    className='h-[35px] rounded-full'
                />
                <div className=' flex flex-col text-white hover:text-terceario'>
                    <span className='text-[14px] font-[700]'>
                        {user.nombres} {/* Usamos el nombre del contexto */}
                    </span>
                    <span className='font-[500] text-[12px]'>
                        {user.apellidos} {/* Usamos los apellidos del contexto */}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;
