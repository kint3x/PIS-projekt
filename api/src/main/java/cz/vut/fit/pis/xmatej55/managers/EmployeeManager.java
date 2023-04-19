package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;

import java.util.List;
import java.util.Optional;

public interface EmployeeManager {
    Employee create(Employee employee);

    Employee update(Employee employee);

    void deleteById(Long id);

    Optional<Employee> findById(Long id);

    List<Employee> findAll();

    List<Meeting> findAllMeetingsByEmployee(Employee employee);

}