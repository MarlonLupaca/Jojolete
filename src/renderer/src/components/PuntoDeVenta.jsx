import React from "react";

const PuntoDeVenta = ({ productos }) => {
  return (
    <div className="p-4 flex-1 h-[90vh] ">
      <div className="w-full flex flex-col text-textoClaro rounded-lg py-4 px-5 bg-secundario h-full">
        <h4 className=" text-lg font-bold mb-2">Venta</h4>
        <div className=" mb-6">
          <label htmlFor="cliente" className="mr-3">
            Cliente:
          </label>
          <input
            placeholder="Ingresa cliente..."
            type="text"
            id="cliente"
            className="px-3 py-1 border border-acento w-[300px] bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
          />
        </div>

        <div className="border h-[60vh] border-gray-600 rounded-t-lg overflow-y-auto relative">
          <table className="w-full border-collapse">
            <thead className="bg-gray-600 h-[40px] sticky top-0">
              <tr>
                <th className="w-[80px]">Cant.</th>
                <th className="text-start">Producto</th>
                <th className="text-start">Precio unit.</th>
                <th className="text-start">Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((producto, index) => (
                  <tr
                    key={index}
                    className="border-b-2 h-[40px] border-gray-600"
                  >
                    <td className="text-center">{producto.cantidad}</td>
                    <td>{producto.nombre}</td>
                    <td>S/ {producto.precioVenta.toFixed(2)}</td>
                    <td>S/ {producto.total.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-textoGris py-4 italic"
                  >
                    No hay productos en la venta.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-r border-b border-l px-4 py-2 pb-4 rounded-b-lg border-gray-600 grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-1 px-2">
            <span>Efectivo</span>
            <input
              type="number"
              className="px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Cambio</span>
            <input
              type="number"
              className="px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
            />
          </div>
          <div className="flex flex-col gap-1 px-2">
            <span>Total</span>
            <input
              type="number"
              readOnly
              value={productos.reduce((sum, p) => sum + p.total, 0).toFixed(2)}
              className="px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
            />
          </div>
        </div>
        <div className="flex justify-end py-3">
          <button className="w-fit px-4 py-1 bg-terceario text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]">
            Vender
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuntoDeVenta;
