package cz.vut.fit.pis.xmatej55.services.impl;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.MeetingManager;
import cz.vut.fit.pis.xmatej55.services.MeetingService;
import java.util.List;
import java.util.Optional;
import jakarta.inject.Inject;

public class MeetingServiceImpl implements MeetingService {

    @Inject
    private MeetingManager meetingManager;

    @Override
    public Meeting create(Meeting meeting) {
        return meetingManager.create(meeting);
    }

    @Override
    public Meeting update(Meeting meeting) {
        return meetingManager.update(meeting);
    }

    @Override
    public void deleteById(Long id) {
        meetingManager.deleteById(id);
    }

    @Override
    public Optional<Meeting> findById(Long id) {
        return meetingManager.findById(id);
    }

    @Override
    public List<Meeting> findAll() {
        return meetingManager.findAll();
    }

    @Override
    public List<Meeting> findAllByClient(Client client) {
        return meetingManager.findAllByClient(client);
    }

    @Override
    public List<Meeting> findAllByEmployee(Employee employee) {
        return meetingManager.findAllByEmployee(employee);
    }
}
