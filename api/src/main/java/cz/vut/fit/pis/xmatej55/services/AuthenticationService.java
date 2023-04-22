package cz.vut.fit.pis.xmatej55.services;

import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Employee.EmployeeType;
import cz.vut.fit.pis.xmatej55.managers.EmployeeManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class AuthenticationService {

    @Inject
    private EmployeeManager employeeManager;

    public Optional<EmployeeType> isValidUser(String username, String password) {
        Optional<Employee> employee = employeeManager.findByUsername(username);

        if (employee.isPresent() && employee.get().getPassword().equals(password)) {
            return Optional.of(employee.get().getType());
        } else {
            return Optional.empty();
        }
    }
}