package cz.vut.fit.pis.xmatej55.entities;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "Client")
public class Client extends Person {

    @Column(name = "notes")
    private String notes;

    @OneToMany(mappedBy = "client", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ClientProduct> clientProducts = new HashSet<ClientProduct>();

    @OneToMany(mappedBy = "client", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Meeting> meetings = new HashSet<Meeting>();

    public Client(String phone, String address, Date dob, String name, String surname, String email, String image,
            String notes, Set<ClientProduct> clientProducts, Set<Meeting> meetings) {
        super(phone, address, dob, name, surname, email, image);
        this.notes = notes;
        this.clientProducts = clientProducts;
        this.meetings = meetings;
    }

    public Client(String notes, Set<ClientProduct> clientProducts, Set<Meeting> meetings) {
        this.notes = notes;
        this.clientProducts = clientProducts;
        this.meetings = meetings;
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

    public Set<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(Set<Meeting> meetings) {
        this.meetings = meetings;
    }
}
