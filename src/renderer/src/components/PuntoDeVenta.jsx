import React, { useState } from "react";

const PuntoDeVenta = () => {
  const [productos, setProductos] = useState([
    { id: 1, descripcion: "Cepillo", precioUnit: 50, unidad: "Kilos", total: 50 },
    { id: 2, descripcion: "Cerveza", precioUnit: 50, unidad: "Kilos", total: 50 },
    { id: 3, descripcion: "Chocolate", precioUnit: 50, unidad: "Kilos", total: 50 },
    { id: 4, descripcion: "Huevo", precioUnit: 50, unidad: "Kilos", total: 50 },
  ]);

  return (
    <div className="p-4 flex-1">
      <div className="w-full flex flex-col text-textoClaro rounded-lg py-4 px-5 bg-secundario h-full">
          <h4 className="text-lg font-bold mb-2">Venta</h4>
          <div className="flex flex-col gap-3 mb-4">
            <div>
              <label htmlFor="cajero" className="mr-4">Cajero:</label>
              <input
                placeholder="Ingresa cajero..."  
                type="text" 
                id="cajero" 
                className="px-3 py-1 border border-acento w-[300px] bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"/>
            </div>
            <div>
              <label htmlFor="cliente" className="mr-3">Cliente:</label>
              <input 
                placeholder="Ingresa cliente..."
                type="text" 
                id="cliente" 
                className="px-3 py-1 border border-acento w-[300px] bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"/>
            </div>
          </div>

          <div className="border border-gray-600 rounded-t-lg  h-[385px] overflow-y-auto relative">
            <table className="w-full border-collapse">
              <thead className="bg-gray-600 h-[40px] sticky top-0">
                <tr>
                  <th className="w-[80px]">Cant.</th>
                  <th className="text-start">Descripcion</th>
                  <th className="text-start">Precio unit</th>
                  <th className="text-start">Unidad</th>
                  <th className="text-start">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                <tr className="border-b-2 h-[40px] border-gray-600">
                  <td className="text-center">1</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                  <td className="">Cell</td>
                </tr>
                
              </tbody>
            </table>
          </div>
          <div className="border-r border-b  border-l px-4 py-2 pb-4 rounded-b-lg border-gray-600 grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-1 px-2">
              <span>Efectivo</span>
              <input type="number" className="px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario" />
            </div>
            <div className="flex flex-col gap-1"> 
              <span>Cambio</span>
              <input type="number" className="px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"/>
            </div>
            <div className="flex flex-col gap-1 px-2">
              <span>Total</span>
              <input type="number" className="px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"/>
            </div>
            
          </div>
          <div className="flex justify-end py-3">
            <button className="w-fit px-4 py-1 bg-terceario text-white font-semibold rounded-lg  border-2 border-secundario transform transition duration-200 hover:scale-[1.02]">
              Vender
            </button>
          </div>
          
      </div>
    </div>
  );
};

export default PuntoDeVenta;
