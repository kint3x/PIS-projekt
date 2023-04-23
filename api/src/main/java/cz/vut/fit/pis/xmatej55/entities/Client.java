package cz.vut.fit.pis.xmatej55.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "Client")
public class Client extends Person {

    @Column(name = "notes")
    private String notes;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "EmployeeClient", joinColumns = { @JoinColumn(name = "client_id") }, inverseJoinColumns = {
            @JoinColumn(name = "employee_id") })
    @JsonbTransient
    private Set<Employee> employees = new HashSet<Employee>();

    @OneToMany(mappedBy = "client", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonbTransient
    private Set<ClientProduct> clientProducts = new HashSet<ClientProduct>();

    @OneToMany(mappedBy = "client", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonbTransient
    private Set<Meeting> meetings = new HashSet<Meeting>();

    public Client() {
        
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Set<ClientProduct> getClientProducts() {
        return clientProducts;
    }

    public void setClientProducts(Set<ClientProduct> clientProducts) {
        this.clientProducts = clientProducts;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(Set<Meeting> meetings) {
        this.meetings = meetings;
    }
}
