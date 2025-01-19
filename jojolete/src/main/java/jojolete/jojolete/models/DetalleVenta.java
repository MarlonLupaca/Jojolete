package jojolete.jojolete.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_cabecera_venta", nullable = false)
    @JsonBackReference 
    private CabeceraVenta cabeceraVenta;

    @ManyToOne
    @JoinColumn(name = "codigo_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad", nullable = false)
    private int cantidad;

    @Column(name = "subtotal", nullable = false)
    private double subtotal;

    public DetalleVenta() {
    }

    public DetalleVenta(CabeceraVenta cabeceraVenta, Producto producto, int cantidad, double subtotal) {
        this.cabeceraVenta = cabeceraVenta;
        this.producto = producto;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public CabeceraVenta getCabeceraVenta() {
        return cabeceraVenta;
    }

    public void setCabeceraVenta(CabeceraVenta cabeceraVenta) {
        this.cabeceraVenta = cabeceraVenta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}
