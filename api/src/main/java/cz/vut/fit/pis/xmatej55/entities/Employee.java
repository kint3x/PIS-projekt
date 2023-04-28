package cz.vut.fit.pis.xmatej55.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "Employee",
    uniqueConstraints=
        @UniqueConstraint(columnNames={"username"}))
public class Employee extends Person {

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    public enum EmployeeType {
        Worker,
        Manager,
        Owner
    }

    @Enumerated(EnumType.STRING)
    private EmployeeType type;

    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonbTransient
    private Set<ClientProduct> clientProducts = new HashSet<ClientProduct>();

    @ManyToMany(mappedBy = "employees", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonbTransient
    private Set<Meeting> meetings = new HashSet<Meeting>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "EmployeeProduct", joinColumns = { @JoinColumn(name = "employee_id") }, inverseJoinColumns = {
            @JoinColumn(name = "product_id") })
    @JsonbTransient
    private Set<Product> products = new HashSet<Product>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "EmployeeClient", joinColumns = { @JoinColumn(name = "employee_id") }, inverseJoinColumns = {
            @JoinColumn(name = "client_id") })
    @JsonbTransient
    private Set<Client> clients = new HashSet<Client>();

    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonbTransient
    private Set<Meeting> created_meetings = new HashSet<Meeting>();

    public Employee() {
        
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public EmployeeType getType() {
        return type;
    }

    public void setType(EmployeeType type) {
        this.type = type;
    }

    public Set<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(Set<Meeting> meetings) {
        this.meetings = meetings;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }

    public void addClient(Client client) {
        this.clients.add(client);
    }

    public void removeClient(Client client) {
        Client res = null;
        
        for (Client c : this.clients) {
            if (c.getId() == client.getId()) {
                res = c;
                break;
            }
        }

        if (res != null) {
            this.clients.remove(res);
        }
    }

    public Set<ClientProduct> getClientProducts() {
        return clientProducts;
    }

    public void setClientProducts(Set<ClientProduct> clientProducts) {
        this.clientProducts = clientProducts;
    }

    public void addProduct(Product product) {
        this.products.add(product);
    }

    public void removeProduct(Product product) {
        Product res = null;

        for (Product p : this.products) {
            if (p.getId() == product.getId()) {
                res = p;
                break;
            }
        }

        if (res != null) {
            this.products.remove(res);
        }
    }
}