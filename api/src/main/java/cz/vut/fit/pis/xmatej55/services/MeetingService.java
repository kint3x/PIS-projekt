package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import java.util.List;
import java.util.Optional;

public interface MeetingService {

    Meeting create(Meeting meeting);

    Meeting update(Meeting meeting);

    void deleteById(Long id);

    Optional<Meeting> findById(Long id);

    List<Meeting> findAll();

    List<Meeting> findAllByClient(Client client);

    List<Meeting> findAllByEmployee(Employee employee);

}
