package jojolete.jojolete.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import jojolete.jojolete.models.Producto;
import jojolete.jojolete.repositorios.ProductoRepositorio;

@Service
public class ProductoServicio {

    @Autowired
    private ProductoRepositorio productoRepositorio;

    // Obtener todos los productos
    public List<Producto> getAllProductos() {
        return productoRepositorio.findAll();
    }

    // Guardar un producto
    public String saveProducto(Producto producto) {
        System.out.println(producto);
        // Verificar si el código ya existe en la base de datos
        if (productoRepositorio.existsByCodigo(producto.getCodigo())) {
            return "Código de producto existente"; // Si ya existe, retorna el mensaje
        }

        try {
            productoRepositorio.save(producto); // Si no existe, guarda el producto
            return "Producto guardado exitosamente";
        } catch (Exception e) {
            return "Error al guardar el producto: " + e.getMessage();
        }
    }

    // Actualizar un producto (basado en el código)
    public String updateProducto(String codigo, Producto productoActualizado) {
        Optional<Producto> productoOptional = productoRepositorio.findByCodigo(codigo);

        if (productoOptional.isPresent()) {
            Producto producto = productoOptional.get();

            // Actualizar campos del producto
            producto.setNombre(productoActualizado.getNombre());
            producto.setCategoria(productoActualizado.getCategoria());
            producto.setUnidadMedida(productoActualizado.getUnidadMedida());
            producto.setStock(productoActualizado.getStock());
            producto.setPrecioCompra(productoActualizado.getPrecioCompra());
            producto.setPrecioVenta(productoActualizado.getPrecioVenta());
            producto.setStockMinimo(productoActualizado.getStockMinimo());
            producto.setProveedor(productoActualizado.getProveedor());
            producto.setUbicacion(productoActualizado.getUbicacion());
            producto.setComentario(productoActualizado.getComentario());

            try {
                productoRepositorio.save(producto);
                return "Producto actualizado exitosamente";
            } catch (Exception e) {
                return "Error al actualizar el producto: " + e.getMessage();
            }
        } else {
            return "Producto no encontrado";
        }
    }

    // Eliminar un producto (basado en el código)
    public String deleteProducto(String codigo) {
        Optional<Producto> productoOptional = productoRepositorio.findByCodigo(codigo);

        if (productoOptional.isPresent()) {
            try {
                productoRepositorio.delete(productoOptional.get());
                return "Producto eliminado exitosamente";
            } catch (Exception e) {
                return "Error al eliminar el producto: " + e.getMessage();
            }
        } else {
            return "Producto no encontrado";
        }
    }

    // Buscar producto por código
    public Producto getProductoByCodigo(String codigo) {
        return productoRepositorio.findByCodigo(codigo).orElse(null);
    }
}