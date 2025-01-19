package jojolete.jojolete.service;

import jojolete.jojolete.models.CabeceraVenta;
import jojolete.jojolete.models.DetalleVenta;
import jojolete.jojolete.models.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import jojolete.jojolete.repositorios.CabeceraVentaRepository;
import jojolete.jojolete.repositorios.DetalleVentaRepository;
import jojolete.jojolete.repositorios.ProductoRepositorio;

@Service
public class VentaService {

    @Autowired
    private CabeceraVentaRepository cabeceraVentaRepository;

    @Autowired
    private DetalleVentaRepository detalleVentaRepository;

    @Autowired
    private ProductoRepositorio productoRepository;

    @Transactional
    public CabeceraVenta crearVenta(CabeceraVenta cabeceraVenta, List<DetalleVenta> detalles) {
        // Guardar cabecera
        CabeceraVenta cabeceraGuardada = cabeceraVentaRepository.save(cabeceraVenta);

        // Validar y guardar detalles
        for (DetalleVenta detalle : detalles) {
            Producto producto = productoRepository.findById(detalle.getProducto().getCodigo())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + detalle.getProducto().getCodigo()));

            // Verificar si el stock es null y asignar un valor por defecto si es necesario
            Integer stock = producto.getStock();
            if (stock == null) {
                stock = 0; // Asignar un valor por defecto si el stock es null
            }

            // Verificar si el producto tiene stock suficiente
            if (stock > 0) {
                // Si el producto tiene stock suficiente, validar y actualizar stock
                if (stock < detalle.getCantidad()) {
                    throw new IllegalArgumentException("Stock insuficiente para el producto: " + producto.getCodigo());
                }

                // Actualizar stock
                producto.setStock(stock - detalle.getCantidad());
                productoRepository.save(producto);
            } else {
                // Si no tiene stock, tratamos como producto genérico
                System.out.println("Producto sin stock disponible, se procesará como genérico: " + producto.getCodigo());
            }

            // Asociar detalle con la cabecera
            detalle.setCabeceraVenta(cabeceraGuardada);
            detalleVentaRepository.save(detalle);
        }

        return cabeceraGuardada;
    }



    public List<CabeceraVenta> listarVentas() {
        return cabeceraVentaRepository.findAll();
    }

    public Optional<CabeceraVenta> buscarVentaPorId(Integer id) {
        return cabeceraVentaRepository.findById(id);
    }

    @Transactional
    public CabeceraVenta actualizarVenta(Integer id, CabeceraVenta nuevaCabecera, List<DetalleVenta> nuevosDetalles) {
        CabeceraVenta cabeceraExistente = cabeceraVentaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venta no encontrada con ID: " + id));

        // Eliminar detalles existentes y restablecer stock
        List<DetalleVenta> detallesExistentes = detalleVentaRepository.findByCabeceraVenta(cabeceraExistente);
        for (DetalleVenta detalle : detallesExistentes) {
            Producto producto = productoRepository.findById(detalle.getProducto().getCodigo())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + detalle.getProducto().getCodigo()));
            producto.setStock(producto.getStock() + detalle.getCantidad());
            productoRepository.save(producto);
            detalleVentaRepository.delete(detalle);
        }

        // Actualizar cabecera
        cabeceraExistente.setCajera(nuevaCabecera.getCajera());
        cabeceraExistente.setFecha(nuevaCabecera.getFecha());
        CabeceraVenta cabeceraActualizada = cabeceraVentaRepository.save(cabeceraExistente);

        // Guardar nuevos detalles
        for (DetalleVenta detalle : nuevosDetalles) {
            Producto producto = productoRepository.findById(detalle.getProducto().getCodigo())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + detalle.getProducto().getCodigo()));

            if (producto.getStock() < detalle.getCantidad()) {
                throw new IllegalArgumentException("Stock insuficiente para el producto: " + producto.getCodigo());
            }

            producto.setStock(producto.getStock() - detalle.getCantidad());
            productoRepository.save(producto);

            detalle.setCabeceraVenta(cabeceraActualizada);
            detalleVentaRepository.save(detalle);
        }

        return cabeceraActualizada;
    }

    @Transactional
    public void eliminarVenta(Integer id) {
        CabeceraVenta cabeceraVenta = cabeceraVentaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venta no encontrada con ID: " + id));

        // Restablecer stock y eliminar detalles
        List<DetalleVenta> detalles = detalleVentaRepository.findByCabeceraVenta(cabeceraVenta);
        for (DetalleVenta detalle : detalles) {
            Producto producto = productoRepository.findById(detalle.getProducto().getCodigo())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + detalle.getProducto().getCodigo()));

            // Verificar si el stock es null y asignar un valor por defecto si es necesario
            Integer stock = producto.getStock();
            if (stock == null) {
                stock = 0; // Asignar un valor por defecto si el stock es null
            }

            producto.setStock(stock + detalle.getCantidad());
            productoRepository.save(producto);
            detalleVentaRepository.delete(detalle);
        }

        // Eliminar cabecera
        cabeceraVentaRepository.delete(cabeceraVenta);
    }
}
