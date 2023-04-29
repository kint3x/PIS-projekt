package cz.vut.fit.pis.xmatej55.init;

import java.util.Date;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Employee.EmployeeType;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class DataSeeder {

    @Inject
    private EmployeeService employeeService;

    public void seedData() {
        Optional<Employee> existingAdmin = employeeService.findByUsername("admin");
        if (!existingAdmin.isPresent()) {
            Employee admin = new Employee();
            admin.setUsername("admin");
            admin.setPassword("admin");
            admin.setEmail("admin@admin.com");
            admin.setAddress("adminAddress");
            admin.setDob(new Date());
            admin.setPhone("+421918420420");
            admin.setName("John");
            admin.setSurname("Doe");
            admin.setImage("image.png");
            admin.setType(EmployeeType.Owner);

            employeeService.create(admin);
        }
    }
}