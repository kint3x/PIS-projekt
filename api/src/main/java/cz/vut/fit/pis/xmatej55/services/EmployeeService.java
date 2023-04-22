package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.managers.EmployeeManager;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class EmployeeService{

    @Inject
    private EmployeeManager employeeManager;

    public Employee create(Employee employee) {
        return employeeManager.create(employee);
    }

    public Employee update(Employee employee) {
        return employeeManager.update(employee);
    }

    public void deleteById(Long id) {
        employeeManager.deleteById(id);
    }

    public Optional<Employee> findById(Long id) {
        return employeeManager.findById(id);
    }

    public Optional<Employee> findByUsername(String username) {
        return employeeManager.findByUsername(username);
    }

    public List<Employee> findAll() {
        return employeeManager.findAll();
    }
}
