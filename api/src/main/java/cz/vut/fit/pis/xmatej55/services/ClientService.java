package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.managers.ClientManager;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ClientService {

    @Inject
    private ClientManager clientManager;

    public Client update(Client client) {
        return clientManager.update(client);
    }

    public Client create(Client client) {
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
}
