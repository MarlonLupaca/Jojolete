package jojolete.jojolete.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import jojolete.jojolete.models.Producto;
import jojolete.jojolete.service.ProductoServicio;

@RestController
@RequestMapping("/producto")
@CrossOrigin(origins = "*")  // Permitir todas las conexiones (ajustar según sea necesario)
public class ProductoControlador {

    @Autowired
    private ProductoServicio productoServicio;

    // Endpoint para obtener todos los productos
    @GetMapping("/all")
    public List<Producto> getAllProductos() {
        return productoServicio.getAllProductos();
    }

    // Endpoint para guardar un producto
    @PostMapping("/save")
    public String saveProducto(@RequestBody Producto producto) {
        return productoServicio.saveProducto(producto);
    }

    // Endpoint para actualizar un producto
    @PutMapping("/update/{codigo}")
    public String updateProducto(@PathVariable String codigo, @RequestBody Producto producto) {
        return productoServicio.updateProducto(codigo, producto);
    }

    // Endpoint para eliminar un producto
    @DeleteMapping("/delete/{codigo}")
    public String deleteProducto(@PathVariable String codigo) {
        return productoServicio.deleteProducto(codigo);
    }

    // Endpoint para buscar un producto por código
    @GetMapping("/find/{codigo}")
    public Producto getProductoByCodigo(@PathVariable String codigo) {
        return productoServicio.getProductoByCodigo(codigo);
    }
}
