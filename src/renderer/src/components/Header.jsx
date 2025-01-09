import React from 'react'

const Header = ({name}) => {
    return (
        <header className='bg-secundario h-[50px] pl-[50px] flex items-center text-textoGris font-[700]'>
            {name}
        </header>
    )
}

export default Header
