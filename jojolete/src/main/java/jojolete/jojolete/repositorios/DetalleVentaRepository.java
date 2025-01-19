package jojolete.jojolete.repositorios;

import jojolete.jojolete.models.CabeceraVenta;
import jojolete.jojolete.models.DetalleVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Integer> {

    // Buscar detalles por la cabecera de venta
    List<DetalleVenta> findByCabeceraVenta(CabeceraVenta cabeceraVenta);

    // Buscar detalles por ID de cabecera de venta (si necesitas buscar por ID en lugar de la entidad)
    List<DetalleVenta> findByCabeceraVentaId(Integer cabeceraVentaId);

    // Buscar detalles por código de producto
    List<DetalleVenta> findByProductoCodigo(String productoCodigo);

    // Eliminar todos los detalles asociados a una cabecera de venta específica
    void deleteByCabeceraVenta(CabeceraVenta cabeceraVenta);

    // Contar cuántas veces se ha vendido un producto específico
    long countByProductoCodigo(String productoCodigo);

    // Buscar detalles donde la cantidad vendida sea mayor a un valor específico
    List<DetalleVenta> findByCantidadGreaterThan(Integer cantidad);
}
