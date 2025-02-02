import React, { useState } from 'react';
import { FaBoxes,FaAngleDoubleRight, FaRegClipboard ,FaGraduationCap, FaHome, FaExchangeAlt, FaListAlt, FaWarehouse, FaUserAlt, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { MdRestaurantMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import ItemsSidebar from './ItemsSidebar';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    return (
        <div className={`relative flex ${isOpen ? 'w-[260px]' : 'w-20'} z-[100] flex flex-col justify-between h-screen bg-secundario text-textoClaro transition-all duration-300 ease-linear`}>
            <button onClick={toggleSidebar} className="z-[100] top-[11px] absolute right-[-35px] h-[35px] w-[35px] bg-fondoOscuro  p-1 flex items-center justify-center rounded-lg text-[25px] text-textoGris hover:text-terceario font-semibold">
                <FaAngleDoubleRight
                    className={`transition-transform duration-300 ease-linear ${isOpen ? '' : 'rotate-180'}`}
                />
            </button>
            
            {/* Sidebar */}
            <div className={`flex  ${isOpen?'':''} h-fit  flex-col w-full p-4 pt-3 gap-6`}>
                {/* Toggler */}
                <div className="flex items-center px-[8px]">
                    <FaGraduationCap className="text-[30px] min-w-[30px] flex-shrink-0" />
                    <span className={`ml-[15px] tracking-[8px] text-[15px] overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 ' : 'opacity-0'}`}>INVETARIOS</span>
                </div>
                

                <span className={` text-[12px] tracking-wide transition-opacity duration-300  ${isOpen ? 'opacity-100 ' : 'opacity-0'}`}>NAVEGACION</span>

                <nav className=' flex flex-col gap-[16px]'>
                    
                    <Link to="/inicio">
                        <ItemsSidebar isOpen={isOpen} name="Dashboard" Icon={FaHome} />
                    </Link>

                    <Link to="/Menu">
                        <ItemsSidebar isOpen={isOpen} name="Menu" Icon={MdRestaurantMenu} />
                    </Link>
                    
                    <Link to="/Productos">
                        <ItemsSidebar isOpen={isOpen} name="Productos" Icon={FaBoxes} />
                    </Link>

                    <Link to="/Entradas">
                        <ItemsSidebar isOpen={isOpen} name="Entradas/Salidas" Icon={FaExchangeAlt} />
                    </Link>
                </nav>

                
            </div>
            <div className="flex flex-col mb-4 items-center mt-8 space-y-4 ">
                <Link to="/">
                    <button className="flex items-center gap-2 text-textoGris  text-[14px] font-[700] hover:text-cuarto transition duration-200">
                        <FaSignOutAlt size={16}/>
                        Salir
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
