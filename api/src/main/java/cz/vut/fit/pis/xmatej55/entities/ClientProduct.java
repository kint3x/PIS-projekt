package cz.vut.fit.pis.xmatej55.entities;

import java.util.Date;

import jakarta.json.bind.annotation.JsonbDateFormat;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "ClientProduct", uniqueConstraints = @UniqueConstraint(columnNames = { "client", "product" }))
public class ClientProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client")
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product")
    @JsonbTransient
    private Product product;

    public enum ProductState {
        ProductState_1,
        ProductState_2,
        ProductState_3
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private ProductState state;

    @Column(name = "date")
    @JsonbDateFormat(value = "dd-MM-yyyy'T'HH:mm:ss", locale = "Locale.ENGLISH")
    @Temporal(TemporalType.DATE)
    private Date date;

    public ClientProduct() {
        
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductState getState() {
        return state;
    }

    public void setState(ProductState state) {
        this.state = state;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setStateWithDate(ProductState state) {
        this.state = state;
        this.date = new Date(System.currentTimeMillis());
    }

    public void setStateWithDate(ProductState state, Date date) {
        this.state = state;
        this.date = date;
    }
}