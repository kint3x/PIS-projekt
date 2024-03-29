package cz.vut.fit.pis.xmatej55.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import cz.vut.fit.pis.xmatej55.utils.DateDeserializer;
import jakarta.json.bind.annotation.JsonbTypeDeserializer;

public class MeetingDTO {
    private String subject;

    @JsonbTypeDeserializer(DateDeserializer.class)
    private Date start;

    @JsonbTypeDeserializer(DateDeserializer.class)
    private Date end;

    private String notes;

    private Set<Long> employeeIds = new HashSet<Long>();

    private Long clientId;

    private Long authorId;

    public MeetingDTO() {

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

    public Set<Long> getEmployeeIds() {
        return employeeIds;
    }

    public void setEmployeeIds(Set<Long> employeeIds) {
        this.employeeIds = employeeIds;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }
}
