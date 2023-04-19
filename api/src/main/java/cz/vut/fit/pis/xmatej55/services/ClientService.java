package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.ClientManager;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ClientService {

    @Inject
    private ClientManager clientManager;

    public Client update(Client client) {
        return clientManager.update(client);
    }

    public Client saveClient(Client client) {
        return clientManager.saveClient(client);
    }

    public void deleteClient(Client client) {
        clientManager.deleteClient(client);
    }

    public Optional<Client> findById(Long id) {
        return clientManager.findById(id);
    }

    public List<Client> findAll() {
        return clientManager.findAll();
    }

    public List<Meeting> findAllMeetingsByClient(Client client) {
        return clientManager.findAllMeetingsByClient(client);
    }
}
