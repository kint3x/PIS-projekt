package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.MeetingManager;
import cz.vut.fit.pis.xmatej55.services.MeetingService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MeetingService {

    @Inject
    private MeetingManager meetingManager;

    public Meeting create(Meeting meeting) {
        List<String> errors = validateMeeting(meeting);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
        return meetingManager.create(meeting);
    }

    public Meeting update(Meeting meeting) {
        List<String> errors = validateMeeting(meeting);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
        return meetingManager.update(meeting);
    }

    public void deleteById(Long id) {
        meetingManager.deleteById(id);
    }

    public Optional<Meeting> findById(Long id) {
        return meetingManager.findById(id);
    }

    public List<Meeting> findAll() {
        return meetingManager.findAll();
    }

    public List<Meeting> findAllByClient(Client client) {
        return meetingManager.findAllByClient(client);
    }

    public List<Meeting> findAllByEmployee(Employee employee) {
        return meetingManager.findAllByEmployee(employee);
    }

    private List<String> validateMeeting(Meeting meeting) {
        List<String> errors = new ArrayList<>();

        if (meeting.getClient() == null) {
            errors.add("Client have to be set");
        }
        if (meeting.getEmployees().isEmpty()) {
            errors.add("Employee have to be set");
        }
        if (meeting.getStart() == null || meeting.getEnd() == null || !meeting.getStart().before(meeting.getEnd())) {
            errors.add("Invalid meeting date range");
        }
        if (meeting.getSubject() == null || meeting.getSubject().trim().isEmpty()) {
            errors.add("Subject is empty");
        }

        return errors;
    }
}
