package cz.vut.fit.pis.xmatej55.services.impl;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.EmployeeManager;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import java.util.List;
import java.util.Optional;
import jakarta.inject.Inject;

public class EmployeeServiceImpl implements EmployeeService {

    @Inject
    private EmployeeManager employeeManager;

    @Override
    public Employee create(Employee employee) {
        return employeeManager.create(employee);
    }

    @Override
    public Employee update(Employee employee) {
        return employeeManager.update(employee);
    }

    @Override
    public void deleteById(Long id) {
        employeeManager.deleteById(id);
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return employeeManager.findById(id);
    }

    @Override
    public List<Employee> findAll() {
        return employeeManager.findAll();
    }

    @Override
    public List<Meeting> findAllMeetingsByEmployee(Employee employee) {
        return employeeManager.findAllMeetingsByEmployee(employee);
    }
}
