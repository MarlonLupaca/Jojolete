package jojolete.jojolete.controlador;

import jojolete.jojolete.models.CabeceraVenta;
import jojolete.jojolete.models.DetalleVenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import jojolete.jojolete.service.VentaService;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    // Crear una nueva venta
    @PostMapping
    public ResponseEntity<CabeceraVenta> crearVenta(@RequestBody VentaRequest request) {
        // Extraer la cabecera y los detalles de la solicitud
        CabeceraVenta cabeceraVenta = request.getCabeceraVenta();
        List<DetalleVenta> detalles = request.getDetalles();

        try {
            // Llamar al servicio para crear la venta
            CabeceraVenta ventaCreada = ventaService.crearVenta(cabeceraVenta, detalles);
            return ResponseEntity.ok(ventaCreada);  // Respuesta exitosa con la venta creada
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);  // Respuesta de error si hay algún problema
        }
    }

    // Listar todas las ventas
    @GetMapping
    public ResponseEntity<List<CabeceraVenta>> listarVentas() {
        // Llamar al servicio para obtener todas las ventas
        List<CabeceraVenta> ventas = ventaService.listarVentas();
        return ResponseEntity.ok(ventas);  // Responder con la lista de ventas
    }

    // Buscar venta por ID
    @GetMapping("/{id}")
    public ResponseEntity<CabeceraVenta> buscarVentaPorId(@PathVariable Integer id) {
        Optional<CabeceraVenta> venta = ventaService.buscarVentaPorId(id);
        return venta.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar una venta existente
    @PutMapping("/{id}")
    public ResponseEntity<CabeceraVenta> actualizarVenta(@PathVariable Integer id, @RequestBody VentaRequest request) {
        CabeceraVenta nuevaCabecera = request.getCabeceraVenta();
        List<DetalleVenta> nuevosDetalles = request.getDetalles();

        try {
            // Llamar al servicio para actualizar la venta
            CabeceraVenta ventaActualizada = ventaService.actualizarVenta(id, nuevaCabecera, nuevosDetalles);
            return ResponseEntity.ok(ventaActualizada);  // Respuesta exitosa con la venta actualizada
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);  // Respuesta de error si hay algún problema
        }
    }

    // Eliminar una venta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVenta(@PathVariable Integer id) {
        try {
            // Llamar al servicio para eliminar la venta
            ventaService.eliminarVenta(id);
            return ResponseEntity.noContent().build();  // Respuesta exitosa sin contenido
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();  // Respuesta de error si no se encuentra la venta
        }
    }

    // Clase auxiliar para manejar la solicitud
    static class VentaRequest {
        private CabeceraVenta cabeceraVenta;
        private List<DetalleVenta> detalles;

        public CabeceraVenta getCabeceraVenta() {
            return cabeceraVenta;
        }

        public void setCabeceraVenta(CabeceraVenta cabeceraVenta) {
            this.cabeceraVenta = cabeceraVenta;
        }

        public List<DetalleVenta> getDetalles() {
            return detalles;
        }

        public void setDetalles(List<DetalleVenta> detalles) {
            this.detalles = detalles;
        }
    }
}
