import React from 'react'

const ItemsSidebar = ({isOpen,name, Icon}) => {
    return (
        <div className="relative group text-textoGris cursor-pointer flex items-center h-[40px] px-[8px] hover:text-terceario rounded-lg">
            <Icon className="text-[28px] py-1 h-[40px] flex-shrink-0" />
            <span className={`font-[700] text-[16px] ml-[15px] overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 ' : 'opacity-0'}`}>
                {name}
            </span>

            {!isOpen && (
                <div className="font-[700] absolute left-[120%] bg-terceario text-textoClaro text-[14px] p-2 rounded-lg invisible opacity-0 transform -translate-x-4 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
                    {name}
                </div>
            )}
        </div>
    )
}

export default ItemsSidebar
