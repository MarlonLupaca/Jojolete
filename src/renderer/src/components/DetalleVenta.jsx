import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";  // Importa ExcelJS

const quitarTildes = (texto) => {
    const mapaAcentos = {
        á: "a", é: "e", í: "i", ó: "o", ú: "u", ñ: "n", Á: "A", É: "E", Í: "I", Ó: "O", Ú: "U", Ñ: "N",
    };
    return texto.replace(/[áéíóúñÁÉÍÓÚÑ]/g, (match) => mapaAcentos[match]);
};

const DetalleVenta = () => {
    const [ventas, setVentas] = useState([]);
    const [filtroTexto, setFiltroTexto] = useState("");
    const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
    const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
    const [filtroProducto, setFiltroProducto] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [productosModal, setProductosModal] = useState([]);

    // Cargar datos desde el backend
    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/ventas");
                const data = await response.json();
                setVentas(data);
            } catch (error) {
                console.error("Error al cargar las ventas:", error);
            }
        };

        fetchVentas();
    }, []);

    const limpiarFiltros = () => {
        setFiltroTexto("");
        setFiltroFechaDesde("");
        setFiltroFechaHasta("");
        setFiltroProducto("");
    };

    const ventasFiltradas = ventas.filter((venta) => {
        const coincideTexto =
            quitarTildes(venta.cajera.toLowerCase()).includes(quitarTildes(filtroTexto.toLowerCase())) ||
            venta.id.toString().includes(filtroTexto);

        const coincideFecha =
            (!filtroFechaDesde || new Date(venta.fecha) >= new Date(filtroFechaDesde)) &&
            (!filtroFechaHasta || new Date(venta.fecha) <= new Date(filtroFechaHasta));

        const coincideProducto =
            !filtroProducto || venta.detalles.some((detalle) =>
                quitarTildes(detalle.producto.nombre.toLowerCase()).includes(quitarTildes(filtroProducto.toLowerCase()))
            );

        return coincideTexto && coincideFecha && coincideProducto;
    });

    const totalFiltrado = ventasFiltradas.reduce((acum, venta) => acum + venta.total, 0);

    const verProductos = (detalles) => {
        const productos = detalles.map((detalle) => ({
            nombre: detalle.producto.nombre,
            cantidad: detalle.cantidad,
            subtotal: detalle.subtotal,
        }));
        setProductosModal(productos);
        setModalVisible(true);
    };

    const eliminarVenta = async (idVenta) => {
        try {
            const respuesta = await fetch(`http://localhost:8080/api/ventas/${idVenta}`, {
                method: "DELETE",
            });
    
            if (respuesta.status === 204) {
                // Elimina la venta localmente después de un éxito
                const nuevaListaVentas = ventas.filter((venta) => venta.id !== idVenta);
                setVentas(nuevaListaVentas);
                toast.success(`Venta eliminada correctamente.`);
            } else if (respuesta.status === 404) {
                toast.error(`No se encontró la venta con ID ${idVenta}.`);
            } else {
                throw new Error("Error desconocido al intentar eliminar la venta.");
            }
        } catch (error) {
            console.error("Error al eliminar la venta:", error);
            toast.error("Ocurrió un error al eliminar la venta.");
        }
    };

    const descargarExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Ventas');
        
        // Estilo general
        worksheet.getCell('A1').style = { font: { bold: true, size: 12 }, alignment: { horizontal: 'center', vertical: 'middle' } };
        worksheet.getCell('B1').style = { font: { bold: true, size: 12 }, alignment: { horizontal: 'center', vertical: 'middle' } };
        worksheet.getCell('C1').style = { font: { bold: true, size: 12 }, alignment: { horizontal: 'center', vertical: 'middle' } };
        worksheet.getCell('D1').style = { font: { bold: true, size: 12 }, alignment: { horizontal: 'center', vertical: 'middle' } };
        worksheet.getCell('E1').style = { font: { bold: true, size: 12 }, alignment: { horizontal: 'center', vertical: 'middle' } };
        worksheet.getCell('F1').style = { font: { bold: true, size: 12 }, alignment: { horizontal: 'center', vertical: 'middle' } };
        
        // Definir columnas
        worksheet.columns = [
            { header: 'ID Venta', key: 'id', width: 15 },
            { header: 'Cajera', key: 'cajera', width: 30 },
            { header: 'Fecha', key: 'fecha', width: 20 },
            { header: 'Hora', key: 'hora', width: 20 },
            { header: 'Productos', key: 'productos', width: 50 },
            { header: 'Total', key: 'total', width: 20 },
        ];
    
        // Estilo de las cabeceras
        worksheet.getRow(1).eachCell(cell => {
            cell.style = {
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' } }, // Fondo azul
                font: { color: { argb: 'FFFFFFFF' }, bold: true },
                alignment: { horizontal: 'center', vertical: 'middle' },
                border: { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } }
            };
        });
    
        // Añadir las filas con los detalles de ventas y productos
        ventasFiltradas.forEach(venta => {
            const productos = venta.detalles.map(detalle => 
                `${detalle.producto.nombre} (Can.: ${detalle.cantidad}, SubTo.: S/. ${detalle.subtotal.toFixed(2)})`
            ).join('; ');
    
            worksheet.addRow({
                id: venta.id,
                cajera: venta.cajera,
                fecha: venta.fecha,
                hora: venta.hora,
                productos: productos,
                total: `S/. ${venta.total.toFixed(2)}`,
            });
        });
    
        // Fila con el total global de todas las ventas
        worksheet.addRow([]);
        worksheet.addRow([
            '', '', '', 'Total General:', `S/. ${totalFiltrado.toFixed(2)}`,
        ]);
    
        // Estilizar la fila de Total
        const totalRow = worksheet.lastRow;
        totalRow.eachCell(cell => {
            cell.style = {
                font: { bold: true, size: 12 },
                alignment: { horizontal: 'center', vertical: 'middle' },
                border: { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } }
            };
        });
    
        // Descargar el archivo Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ventas.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    

    return (
        <div className="p-6 h-[85vh] text-white bg-secundario text-textClaro rounded-lg">
            {/* Filtros */}
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="buscar" className="text-sm">
                            Buscar Venta:
                        </label>
                        <input
                            id="buscar"
                            type="text"
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                            placeholder="ID o Cajera"
                            className="px-3 py-[3px] border border-acento text-[14px] bg-slate-200 w-[200px] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fecha-desde" className="text-sm">
                            Fecha Desde:
                        </label>
                        <input
                            id="fecha-desde"
                            type="date"
                            value={filtroFechaDesde}
                            onChange={(e) => setFiltroFechaDesde(e.target.value)}
                            className="px-3 py-[3px] border border-acento text-[14px] bg-slate-200 w-[150px] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fecha-hasta" className="text-sm">
                            Fecha Hasta:
                        </label>
                        <input
                            id="fecha-hasta"
                            type="date"
                            value={filtroFechaHasta}
                            onChange={(e) => setFiltroFechaHasta(e.target.value)}
                            className="px-3 py-[3px] border border-acento text-[14px] bg-slate-200 w-[150px] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="producto" className="text-sm">
                            Buscar Producto:
                        </label>
                        <input
                            id="producto"
                            type="text"
                            value={filtroProducto}
                            onChange={(e) => setFiltroProducto(e.target.value)}
                            placeholder="Nombre del Producto"
                            className="px-3 py-[3px] border border-acento text-[14px] bg-slate-200 w-[200px] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                        />
                    </div>
                </div>

                <button
                    onClick={limpiarFiltros}
                    className="mt-4 px-4 py-2 bg-cuarto text-[14px] font-[700] text-white rounded-lg hover:bg-red-600 transition-all"
                >
                    Limpiar Filtros
                </button>
            </div>

            {/* Tabla de detalles de ventas */}
            <div className="border h-[80%] text-[15px] border-gray-600 rounded-lg overflow-y-auto relative">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-600 h-[40px] sticky top-0 z-[1]">
                        <tr>
                            <th className="w-[100px] text-center">ID Venta</th>
                            <th className="text-start">Cajera</th>
                            <th className="text-start w-[150px]">Fecha</th>
                            <th className="text-start w-[150px]">Hora</th>
                            <th className="text-start">Productos</th>
                            <th className="text-start w-[150px]">Total</th>
                            <th className="text-center w-[150px]">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasFiltradas.length > 0 ? (
                            ventasFiltradas.map((venta) => (
                                <tr key={venta.id} className="border-b-2 h-[50px] border-gray-600">
                                    <td className="text-center">{venta.id}</td>
                                    <td>{venta.cajera}</td>
                                    <td>{venta.fecha}</td>
                                    <td>{venta.hora}</td>
                                    <td>
                                        <button
                                            onClick={() => verProductos(venta.detalles)}
                                            className="text-terceario"
                                        >
                                            Ver productos
                                        </button>
                                    </td>
                                    <td>S/. {venta.total.toFixed(2)}</td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => eliminarVenta(venta.id)}
                                            className="text-cuarto text-[16px]"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Total general y botón para descargar Excel */}
            <div className="mt-4 flex justify-between items-center">
                <div className="text-end text-lg font-semibold">
                    Total General: <span className="text-terceario">S/. {totalFiltrado.toFixed(2)}</span>
                </div>
                <button
                    onClick={descargarExcel}
                    className="px-4 py-2 bg-terceario text-white text-[14px] font-[700] rounded-lg hover:bg-acento transition-all"
                >
                    Descargar Excel
                </button>
            </div>

            {/* Modal */}
            {modalVisible && <Modal productos={productosModal} onClose={() => setModalVisible(false)} />}
        </div>
    );
};

export default DetalleVenta;
