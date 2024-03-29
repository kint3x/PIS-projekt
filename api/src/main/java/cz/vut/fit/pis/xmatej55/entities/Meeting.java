package cz.vut.fit.pis.xmatej55.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import cz.vut.fit.pis.xmatej55.utils.DateDeserializer;
import jakarta.json.bind.annotation.JsonbTypeDeserializer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "Meeting")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "subject")
    private String subject;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonbTypeDeserializer(DateDeserializer.class)
    @Column(name = "meeting_start")
    private Date start;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonbTypeDeserializer(DateDeserializer.class)
    @Column(name = "meeting_end")
    private Date end;

    @Column(name = "notes")
    private String notes;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "MeetingEmployee", joinColumns = { @JoinColumn(name = "meeting_id") }, inverseJoinColumns = {
            @JoinColumn(name = "employee_id") })
    private Set<Employee> employees = new HashSet<Employee>();

    @ManyToOne(fetch = FetchType.EAGER)
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER)
    private Employee author;

    public Meeting() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Employee getAuthor() {
        return author;
    }

    public void setAuthor(Employee author) {
        this.author = author;
    }

    public void addEmployee(Employee employee) {
        this.employees.add(employee);
    }

    public void removeEmployee(Employee employee) {
        Employee res = null;

        for (Employee e : this.employees) {
            if (e.getId() == employee.getId()) {
                res = e;
                break;
            }
        }

        if (res != null) {
            this.employees.remove(res);
        }
    }
}