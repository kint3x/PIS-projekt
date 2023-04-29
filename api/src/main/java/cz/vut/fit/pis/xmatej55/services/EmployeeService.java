package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.EmployeeManager;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import cz.vut.fit.pis.xmatej55.utils.DOBValidator;
import cz.vut.fit.pis.xmatej55.utils.PhoneNumberValidator;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.validator.routines.EmailValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class EmployeeService {

    @Inject
    private EmployeeManager employeeManager;

    public Employee create(Employee employee) {
        List<String> errors = validateEmployee(employee);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
        return employeeManager.create(employee);
    }

    public Employee update(Employee employee) {
        List<String> errors = validateEmployee(employee);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
        return employeeManager.update(employee);
    }

    public void deleteById(Long id) {
        employeeManager.deleteById(id);
    }

    public Optional<Employee> findById(Long id) {
        return employeeManager.findById(id);
    }

    public Optional<Employee> findByUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("username is empty");
        }
        return employeeManager.findByUsername(username);
    }

    public List<Employee> findAll() {
        return employeeManager.findAll();
    }

    public List<Employee> findByProduct(Product product) {
        return employeeManager.findByProduct(product);
    }

    public List<Employee> findByClient(Client client) {
        return employeeManager.findByClient(client);
    }

    private List<String> validateEmployee(Employee employee) {
        List<String> errors = new ArrayList<>();

        if (employee.getName() == null || employee.getName().trim().isEmpty()) {
            errors.add("Client name is empty");
        }

        if (employee.getSurname() == null || employee.getSurname().trim().isEmpty()) {
            errors.add("Client surename is empty");
        }

        if (employee.getEmail() == null || !EmailValidator.getInstance().isValid(employee.getEmail())) {
            errors.add("Invalid email");
        }

        if (employee.getPhone() == null || !PhoneNumberValidator.isValidPhoneNumber(employee.getPhone())) {
            errors.add("Invalid phone number");
        }
        if (!DOBValidator.isValidDateOfBirth(employee.getDob())) {
            errors.add("Invalid date of birth");
        }

        return errors;
    }
}
