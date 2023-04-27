package cz.vut.fit.pis.xmatej55.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.managers.EmployeeManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class AuthenticationService {

    @Inject
    private EmployeeManager employeeManager;

    public Optional<Employee> isValidUser(String username, String password) {
        Optional<Employee> employee = employeeManager.findByUsername(username);

        if (employee.isPresent()) {
            String hashedPassword = employee.get().getPassword();

            if (BCrypt.checkpw(password, hashedPassword)) {
                return Optional.of(employee.get());
            }
        }

        return Optional.empty();
    }
}