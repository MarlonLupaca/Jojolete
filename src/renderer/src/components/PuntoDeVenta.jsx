import React, { useState } from "react";

const PuntoDeVenta = ({ productos, setProductosVenta }) => {
  const [efectivo, setEfectivo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precioVenta: "",
    cantidad: 1,
  });

  // Calcula el total de los productos
  const total = productos.reduce((sum, p) => sum + p.total, 0).toFixed(2);
  const cambio = efectivo - total;

  // Formatea números con comas
  const formatNumber = (number) =>
    parseFloat(number).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: name === "precioVenta" || name === "cantidad" ? parseFloat(value) || "" : value,
    });
  };

  const agregarProductoGenerico = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precioVenta || nuevoProducto.cantidad <= 0) {
      alert("Por favor, llena todos los campos correctamente.");
      return;
    }

    setProductosVenta((prevProductos) => [
      ...prevProductos,
      {
        ...nuevoProducto,
        total: nuevoProducto.precioVenta * nuevoProducto.cantidad,
      },
    ]);

    setNuevoProducto({ nombre: "", precioVenta: "", cantidad: 1 });
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 flex-1 h-[90vh]">
      <div className="w-full flex flex-col text-textoClaro rounded-lg py-4 px-5 bg-secundario h-full">
        <h4 className="text-lg font-bold mb-2">Venta</h4>
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="cliente" className="mr-3">
            Cliente:
          </label>
          <input
            placeholder="Ingresa cliente..."
            type="text"
            id="cliente"
            className="px-3 py-1 border border-acento w-[300px] bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 font-[700] bg-terceario text-[14px] text-white rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
          >
            Agregar Producto Genérico +
          </button>
        </div>

        {/* Tabla de productos */}
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
                    <td>S/ {formatNumber(producto.precioVenta)}</td>
                    <td>S/ {formatNumber(producto.total)}</td>
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

        {/* Totales */}
        <div className="border-r border-b border-l px-4 py-2 pb-4 rounded-b-lg border-gray-600 grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-1 px-2">
            <span>Efectivo</span>
            <input
              type="number"
              value={efectivo}
              onChange={(e) => setEfectivo(e.target.value)}
              className="px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Cambio</span>
            <input
              type="text"
              readOnly
              value={cambio > 0 ? `S/ ${formatNumber(cambio)}` : ""}
              className={`px-3 py-1 text-[15px] border border-acento bg-slate-200 text-black rounded-lg ${
                cambio > 0 ? "focus:ring-2 focus:ring-terceario" : ""
              }`}
            />
          </div>
          <div className="flex flex-col gap-1 px-2">
            <span>Total</span>
            <input
              type="text"
              readOnly
              value={`S/ ${formatNumber(total)}`}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-[#000000bc] top-0 left-0 z-[100]">
          <div className="bg-secundario text-white p-6 rounded-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Agregar Producto Genérico</h3>
            <div className="flex flex-col">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
                className="w-full mb-2 px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
              />
              <label htmlFor="precioVenta">Precio</label>
              <input
                type="number"
                name="precioVenta"
                placeholder="Precio unitario"
                value={nuevoProducto.precioVenta}
                onChange={handleInputChange}
                className="mb-2 w-full px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
              />
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={nuevoProducto.cantidad}
                onChange={handleInputChange}
                className="mb-2 w-full px-2 py-1 border border-acento bg-slate-200 text-black rounded-lg focus:outline-none focus:ring-secundario"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-[700] bg-cuarto text-[14px] text-white rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
              >
                Cancelar
              </button>
              <button
                onClick={agregarProductoGenerico}
                className="px-4 py-2 font-[700] bg-terceario text-[14px] text-white rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuntoDeVenta;
