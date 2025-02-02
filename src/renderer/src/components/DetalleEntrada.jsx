import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import ExcelJS from "exceljs";
import { toast } from "react-toastify";

const quitarTildes = (texto) => {
    const mapaAcentos = {
        á: "a", é: "e", í: "i", ó: "o", ú: "u", ñ: "n",
        Á: "A", É: "E", Í: "I", Ó: "O", Ú: "U", Ñ: "N",
    };
    return texto.replace(/[áéíóúñÁÉÍÓÚÑ]/g, (match) => mapaAcentos[match]);
};

const DetalleEntrada = () => {
    const [ventas, setVentas] = useState([]);
    const [filtroTexto, setFiltroTexto] = useState("");
    const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
    const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
    const [filtroMesera, setFiltroMesera] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [productosModal, setProductosModal] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchVentas();
    }, []);

    const fetchVentas = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/ventas");
            const data = await response.json();
            setVentas(data);
            console.log(data)
        } catch (error) {
            console.error("Error al cargar las ventas:", error);
            setAlertMessage("Error al cargar las ventas");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Está seguro que desea eliminar esta venta?")) {
            setIsDeleting(true);
            try {
                const response = await fetch(`http://localhost:8080/api/ventas/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    toast.success("Venta eliminada exitosamente");
                    setVentas(ventas.filter(venta => venta.id !== id));
                } else {
                    setAlertMessage("Error al eliminar la venta");
                }
            } catch (error) {
                console.error("Error al eliminar la venta:", error);
                setAlertMessage("Error al eliminar la venta");
            }
            setIsDeleting(false);
            
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
        }
    };

    const limpiarFiltros = () => {
        setFiltroTexto("");
        setFiltroFechaDesde("");
        setFiltroFechaHasta("");
        setFiltroMesera("");
    };

    const ventasFiltradas = ventas.filter((venta) => {
        const coincideTexto = filtroTexto 
            ? venta.id.toString().toLowerCase().includes(filtroTexto.toLowerCase())
            : true;
        
        const coincideMesera = filtroMesera
            ? quitarTildes(venta.mesera.toLowerCase()).includes(quitarTildes(filtroMesera.toLowerCase()))
            : true;
        
        let coincideFecha = true;
        const fechaVenta = new Date(venta.fecha);
        
        if (filtroFechaDesde) {
            const fechaDesde = new Date(filtroFechaDesde);
            fechaDesde.setHours(0, 0, 0, 0);
            coincideFecha = coincideFecha && fechaVenta >= fechaDesde;
        }
        
        if (filtroFechaHasta) {
            const fechaHasta = new Date(filtroFechaHasta);
            fechaHasta.setHours(23, 59, 59, 999);
            coincideFecha = coincideFecha && fechaVenta <= fechaHasta;
        }
    
        return coincideTexto && coincideFecha && coincideMesera;
    });

    const totalFiltrado = ventasFiltradas.reduce((acum, venta) => acum + venta.total, 0);

    const verDetalles = (detalles) => {
        const items = detalles.map((detalle) => ({
            nombre: detalle.plato ? detalle.plato.nombre : detalle.producto.nombre,
            cantidad: detalle.cantidad,
            subtotal: detalle.subtotal,
            tipo: detalle.plato ? 'Plato' : 'Producto',
            precioUnitario: detalle.plato ? detalle.plato.precio : detalle.producto.precio
        }));
        setProductosModal(items);
        setModalVisible(true);
    };

    const formatearFecha = (fechaStr) => {
        const [year, month, day] = fechaStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const descargarExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Ventas');
        
        worksheet.columns = [
            { header: 'ID Venta', key: 'id', width: 15 },
            { header: 'Fecha', key: 'fecha', width: 20 },
            { header: 'Detalles', key: 'detalles', width: 50 },
            { header: 'Total', key: 'total', width: 20 },
        ];
    
        worksheet.getRow(1).eachCell(cell => {
            cell.style = {
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' } },
                font: { color: { argb: 'FFFFFFFF' }, bold: true },
                alignment: { horizontal: 'center', vertical: 'middle' },
                border: { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } }
            };
        });
    
        ventasFiltradas.forEach(venta => {
            const detalles = venta.detalles.map(detalle => {
                const item = detalle.plato ? detalle.plato : detalle.producto;
                return `${item.nombre} (${detalle.plato ? 'Plato' : 'Producto'} - Cant.: ${detalle.cantidad}, SubTo.: S/. ${detalle.subtotal.toFixed(2)})`;
            }).join('; ');
    
            worksheet.addRow({
                id: venta.id,
                fecha: formatearFecha(venta.fecha),
                detalles,
                total: `S/. ${venta.total.toFixed(2)}`,
            });
        });
    
        worksheet.addRow([]);
        worksheet.addRow([
            '', '', 'Total General:', `S/. ${totalFiltrado.toFixed(2)}`,
        ]);
    
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
            {alertMessage && (
                <div className={`mb-4 p-4 rounded-lg ${
                    alertMessage.includes("exitosamente") 
                    ? "bg-green-500 text-white" 
                    : "bg-red-500 text-white"
                }`}>
                    {alertMessage}
                </div>
            )}

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
                            placeholder="ID de Venta"
                            className="px-3 py-[3px] border border-acento text-[14px] bg-slate-200 w-[200px] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="mesera" className="text-sm">
                            Filtrar por Mesera:
                        </label>
                        <input
                            id="mesera"
                            type="text"
                            value={filtroMesera}
                            onChange={(e) => setFiltroMesera(e.target.value)}
                            placeholder="Nombre de Mesera"
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
                </div>

                <button
                    onClick={limpiarFiltros}
                    className="mt-4 px-4 py-2 bg-cuarto text-[14px] font-[700] text-white rounded-lg hover:bg-red-600 transition-all"
                >
                    Limpiar Filtros
                </button>
            </div>

            <div className="border h-[75%] text-[15px] border-gray-600 rounded-lg overflow-y-auto relative">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-600 h-[40px] sticky top-0 z-[1]">
                        <tr>
                            <th className="w-[100px] text-center">ID Venta</th>
                            <th className="text-start w-[150px]">Fecha</th>
                            <th className="text-start w-[250px]">Trabajador</th>
                            <th className="text-start">Detalles</th>
                            <th className="text-start w-[150px]">Total</th>
                            <th className="text-center w-[150px]">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasFiltradas.length > 0 ? (
                            ventasFiltradas.map((venta) => (
                                <tr key={venta.id} className="border-b-2 h-[50px] border-gray-600">
                                    <td className="text-center">{venta.id}</td>
                                    <td>{formatearFecha(venta.fecha)}</td>
                                    <td>{venta.mesera}</td>
                                    <td>
                                        <button
                                            onClick={() => verDetalles(venta.detalles)}
                                            className="text-terceario"
                                        >
                                            Ver detalles
                                        </button>
                                    </td>
                                    <td>S/. {venta.total.toFixed(2)}</td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDelete(venta.id)}
                                            disabled={isDeleting}
                                            className={`text-cuarto text-[16px] hover:text-red-400 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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

            {modalVisible && <Modal productos={productosModal} onClose={() => setModalVisible(false)} />}
        </div>
    );
};

export default DetalleEntrada;