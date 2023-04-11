package cz.vut.fit.pis.xmatej55.data;

import java.sql.Date;
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

@Entity
@Table(name = "Employee")
public class Employee extends Person {

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    public enum EmployeeType {
        EmployeeType_1,
        EmployeeType_2,
        EmployeeType_3
    }

    @Enumerated(EnumType.STRING)
    private EmployeeType type;

    @ManyToMany(mappedBy = "employees", fetch = FetchType.EAGER)
    private Set<Meeting> meetings = new HashSet<Meeting>();

    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Meeting> created_meetings = new HashSet<Meeting>();

    public Employee(String phone, String address, Date dob, String name, String surname, String email, String image,
            String username, String password, EmployeeType type, Set<Meeting> meetings) {
        super(phone, address, dob, name, surname, email, image);
        this.username = username;
        this.password = password;
        this.type = type;
        this.meetings = meetings;
    }

    public Employee(String username, String password, EmployeeType type, Set<Meeting> meetings) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.meetings = meetings;
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