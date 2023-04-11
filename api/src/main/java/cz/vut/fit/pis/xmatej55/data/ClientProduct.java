package cz.vut.fit.pis.xmatej55.data;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "ClientProduct")
public class ClientProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.EAGER)
    @Column(name = "client")
    private Client client;

    @ManyToOne(fetch=FetchType.EAGER)
    @Column(name = "product")
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
    private Date date;

    public ClientProduct(Long id, Client client, Product product, ProductState state, Date date) {
        this.id = id;
        this.client = client;
        this.product = product;
        this.state = state;
        this.date = date;
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
}