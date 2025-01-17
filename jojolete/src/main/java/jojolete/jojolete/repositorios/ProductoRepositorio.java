package jojolete.jojolete.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import jojolete.jojolete.models.Producto;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long> {
    boolean existsByCodigo(String codigo);

    Optional<Producto> findByCodigo(String codigo);
}
