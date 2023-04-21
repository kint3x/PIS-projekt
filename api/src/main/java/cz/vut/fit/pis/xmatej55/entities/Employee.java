package cz.vut.fit.pis.xmatej55.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    public enum EmployeeType {
        Worker,
        Manager,
        Owner
    }

    @Enumerated(EnumType.STRING)
    private EmployeeType type;

    @ManyToMany(mappedBy = "employees", fetch = FetchType.EAGER)
    private Set<Meeting> meetings = new HashSet<Meeting>();

    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
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
}