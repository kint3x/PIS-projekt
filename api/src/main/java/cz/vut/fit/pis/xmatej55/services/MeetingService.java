package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.MeetingManager;
import cz.vut.fit.pis.xmatej55.services.MeetingService;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MeetingService {

    @Inject
    private MeetingManager meetingManager;

    public Meeting create(Meeting meeting) {
        return meetingManager.create(meeting);
    }

    public Meeting update(Meeting meeting) {
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
}
