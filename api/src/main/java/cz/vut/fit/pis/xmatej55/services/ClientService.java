package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import java.util.List;
import java.util.Optional;

public interface ClientService {

    Client update(Client client);

    Client saveClient(Client client);

    void deleteClient(Client client);

    Optional<Client> findById(Long id);

    List<Client> findAll();

    List<Meeting> findAllMeetingsByClient(Client client);

}
