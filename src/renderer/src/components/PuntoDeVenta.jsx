import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PuntoDeVenta = ({ productos, setProductosVenta }) => {
  const [efectivo, setEfectivo] = useState("");
  
  // Calcula el total de los productos
  const total = productos.reduce((sum, p) => sum + p.total, 0).toFixed(2);
  const cambio = efectivo - total;

  const formatNumber = (number) =>
    parseFloat(number).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const vender = async () => {
    if (productos.length === 0) {
      toast.error("No hay productos para realizar la venta.");
      return;
    }

    const detalles = productos.map((producto) => ({
      producto: { codigo: producto.codigo, nombre: producto.nombre },
      cantidad: producto.cantidad,
      subtotal: producto.total,
    }));

    const data = {
      cabeceraVenta: {
        cajera: "María Pérez",
        fecha: new Date().toISOString().split("T")[0],
        hora: new Date().toLocaleTimeString(),
        total: parseFloat(total),
      },
      detalles,
    };

    try {
      console.log(data)
      await axios.post("http://localhost:8080/api/ventas", data);
      toast.success("Venta realizada con éxito.");
      setProductosVenta([]);
      setEfectivo("");
    } catch (error) {
      console.error(error);
      toast.error("Error al realizar la venta. Intenta nuevamente.");
    }
  };

  return (
    <div className="p-4 flex-1 h-[90vh]">
      <div className="w-full flex flex-col text-textoClaro rounded-lg py-4 px-5 bg-secundario h-full">
        <h4 className="text-lg font-bold mb-2">Venta</h4>
        
        <div className="border h-[80vh] border-gray-600 rounded-t-lg overflow-y-auto relative">
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
                  <tr key={index} className="border-b-2 h-[40px] border-gray-600">
                    <td className="text-center">{producto.cantidad}</td>
                    <td>{producto.nombre}</td>
                    <td>S/ {formatNumber(producto.precioVenta)}</td>
                    <td>S/ {formatNumber(producto.total)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-textoGris py-4 italic">
                    No hay productos en la venta.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end py-3">
          <button
            onClick={vender}
            className="w-fit px-4 py-1 bg-terceario text-white font-semibold rounded-lg border-2 border-secundario transform transition duration-200 hover:scale-[1.02]"
          >
            Vender
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuntoDeVenta;
