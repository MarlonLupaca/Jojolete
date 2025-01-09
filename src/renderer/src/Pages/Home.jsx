import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaBarcode } from 'react-icons/fa';
import PuntoDeVenta from '../components/PuntoDeVenta';

const Home = () => {


    return (
        <div className='bg-fondoOscuro flex'>
            <Sidebar />
            <div className=' w-full flex flex-col'>
                <Header name="Venta de Caja"/>
                <div className='flex flex-1 bg-primario p-2 '>
                    
                    <div className=' w-[500px] flex flex-col p-4 items-center  text-textoClaro'>
                        <div className='bg-secundario rounded-lg pt-4 pb-5 px-6 w-full '>
                            <div className='w-full mb-2'>
                                <label htmlFor="cantidad" className='block text-textoClaro mb-1 font-[700] text-[1.125rem]'>Cantidad:</label>
                                <input
                                    placeholder='1'
                                    type="number"
                                    className='px-3 py-2 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-secundario w-[150px]'
                                />
                            </div>
                            <div className='w-full mb-[10px] text-[1.125rem]  font-[700] text-textoClaro'>
                                Codigo:
                            </div>
                            
                            <div className='pb-2 items-center '>
                                <div className='flex  mb-4'>
                                    <FaBarcode className=' text-[35px] mr-[10px]'/>
                                    <input
                                        type="text"
                                        className='px-3 py-1 border border-acento bg-slate-200 w-full text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario'
                                        placeholder="Ingresa numero..."
                                    />
                                </div>
                                <div className='flex'>
                                    <button className=' px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]'>
                                        Buscar
                                    </button>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        
                    </div>

                    <PuntoDeVenta/>

                

                </div>
            </div>
        </div>
    );
}

export default Home;
