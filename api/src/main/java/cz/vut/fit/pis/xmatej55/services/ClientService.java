package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.managers.ClientManager;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import cz.vut.fit.pis.xmatej55.utils.DOBValidator;
import cz.vut.fit.pis.xmatej55.utils.PhoneNumberValidator;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.validator.routines.EmailValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ClientService {

    @Inject
    private ClientManager clientManager;

    public Client update(Client client) {
        List<String> errors = validateClient(client);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
        return clientManager.update(client);
    }

    public Client create(Client client) {
        List<String> errors = validateClient(client);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
        return clientManager.create(client);
    }

    public void deleteById(Long id) {
        clientManager.deleteById(id);
    }

    public Optional<Client> findById(Long id) {
        return clientManager.findById(id);
    }

    public List<Client> findAll() {
        return clientManager.findAll();
    }

    public List<Client> findByEmployee(Employee employee) {
        return clientManager.findByEmployee(employee);
    }

    public Boolean isClientManagedByEmployee(Client client, Employee employee) {
        Set<Client> managedClients = employee.getClients();

        for (Client managedClient : managedClients) {
            if (managedClient.getId() == client.getId()) {
                return true;
            }
        }

        return false;
    }

    private List<String> validateClient(Client client) {
        List<String> errors = new ArrayList<>();

        if (client.getName() == null || client.getName().trim().isEmpty()) {
            errors.add("Client name is empty");
        }

        if (client.getSurname() == null || client.getSurname().trim().isEmpty()) {
            errors.add("Client surename is empty");
        }

        if (client.getEmail() == null || !EmailValidator.getInstance().isValid(client.getEmail())) {
            errors.add("Invalid email");
        }

        if (client.getPhone() == null || !PhoneNumberValidator.isValidPhoneNumber(client.getPhone())) {
            errors.add("Invalid phone number");
        }

        if (client.getDob() != null && !DOBValidator.isValidDateOfBirth(client.getDob())) {
            errors.add("Invalid date of birth");
        }

        return errors;
    }
}
