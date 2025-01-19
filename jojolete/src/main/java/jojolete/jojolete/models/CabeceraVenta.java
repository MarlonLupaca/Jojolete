package jojolete.jojolete.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class CabeceraVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "cajera", nullable = false)
    private String cajera;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "hora", nullable = false)
    private String hora;

    @Column(name = "total", nullable = false)
    private double total;

    @OneToMany(mappedBy = "cabeceraVenta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetalleVenta> detalles;

    public CabeceraVenta() {
    }

    public CabeceraVenta(String cajera, LocalDate fecha, String hora, double total) {
        this.cajera = cajera;
        this.fecha = fecha;
        this.hora = hora;
        this.total = total;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCajera() {
        return cajera;
    }

    public void setCajera(String cajera) {
        this.cajera = cajera;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<DetalleVenta> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleVenta> detalles) {
        this.detalles = detalles;
    }
}
