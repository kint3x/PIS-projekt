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
            admin.setSurname("Adminovitch");
            admin.setImage("https://bootdey.com/img/Content/avatar/avatar6.png");
            admin.setType(EmployeeType.Owner);

            employeeService.create(admin);
        }

        Optional<Employee> existingWorker = employeeService.findByUsername("worker");
        if (!existingWorker.isPresent()) {
            Employee worker = new Employee();
            worker.setUsername("worker");
            worker.setPassword("worker");
            worker.setEmail("worker@worker.com");
            worker.setAddress("workerAddress");
            worker.setDob(new Date());
            worker.setPhone("+421918420421");
            worker.setName("John");
            worker.setSurname("Workerino");
            worker.setImage("https://bootdey.com/img/Content/avatar/avatar1.png");
            worker.setType(EmployeeType.Owner);

            employeeService.create(worker);
        }

        Optional<Employee> existingManager = employeeService.findByUsername("manager");
        if (!existingManager.isPresent()) {
            Employee manager = new Employee();
            manager.setUsername("manager");
            manager.setPassword("manager");
            manager.setEmail("manager@manager.com");
            manager.setAddress("managerAddress");
            manager.setDob(new Date());
            manager.setPhone("+421918420422");
            manager.setName("John");
            manager.setSurname("Managerski");
            manager.setImage("https://bootdey.com/img/Content/avatar/avatar4.png");
            manager.setType(EmployeeType.Owner);

            employeeService.create(manager);
        }
    }
}