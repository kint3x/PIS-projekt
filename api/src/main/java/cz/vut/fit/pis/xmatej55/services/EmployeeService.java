package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    Employee create(Employee employee);

    Employee update(Employee employee);

    void deleteById(Long id);

    Optional<Employee> findById(Long id);

    List<Employee> findAll();

    public List<Meeting> findAllMeetingsByEmployee(Employee employee);
}
