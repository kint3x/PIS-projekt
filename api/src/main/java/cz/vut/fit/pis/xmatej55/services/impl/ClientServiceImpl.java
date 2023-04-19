package cz.vut.fit.pis.xmatej55.services.impl;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.ClientManager;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import java.util.List;
import java.util.Optional;
import jakarta.inject.Inject;

public class ClientServiceImpl implements ClientService {

    @Inject
    private ClientManager clientManager;

    @Override
    public Client update(Client client) {
        return clientManager.update(client);
    }

    @Override
    public Client saveClient(Client client) {
        return clientManager.saveClient(client);
    }

    @Override
    public void deleteClient(Client client) {
        clientManager.deleteClient(client);
    }

    @Override
    public Optional<Client> findById(Long id) {
        return clientManager.findById(id);
    }

    @Override
    public List<Client> findAll() {
        return clientManager.findAll();
    }

    @Override
    public List<Meeting> findAllMeetingsByClient(Client client) {
        return clientManager.findAllMeetingsByClient(client);
    }
}
