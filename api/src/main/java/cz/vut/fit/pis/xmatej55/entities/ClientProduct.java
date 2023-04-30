package cz.vut.fit.pis.xmatej55.entities;

import java.util.Date;

import jakarta.json.bind.annotation.JsonbDateFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    @JoinColumn(name = "employee")
    private Employee employee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product")
    private Product product;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "date")
    @JsonbDateFormat(value = "yyyy-MM-dd'T'HH:mm:ss", locale = "Locale.ENGLISH")
    @Temporal(TemporalType.TIMESTAMP)
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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setActivateWithDate(Boolean active) {
        this.active = active;
        this.date = new Date(System.currentTimeMillis());
    }

    public void setActivateWithDate(Boolean active, Date date) {
        this.active = active;
        this.date = date;
    }
}