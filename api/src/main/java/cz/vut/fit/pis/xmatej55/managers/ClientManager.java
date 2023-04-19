package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.ClientManager;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ClientManager {
    @PersistenceContext
    private EntityManager em;

    public ClientManager() {

    }

    @Transactional
    public Client saveClient(Client client) {
        if (client.getId() == null) {
            em.persist(client);
        } else {
            client = em.merge(client);
        }
        return client;
    }

    @Transactional
    public Client update(Client client) {
        return em.merge(client);
    }

    @Transactional
    public void deleteClient(Client client) {
        em.remove(em.contains(client) ? client : em.merge(client));
    }

    @Transactional
    public Optional<Client> findById(Long id) {
        return Optional.ofNullable(em.find(Client.class, id));
    }

    public List<Client> findAll() {
        TypedQuery<Client> query = em.createQuery("SELECT c FROM Client c", Client.class);
        return query.getResultList();
    }

    public List<Meeting> findAllMeetingsByClient(Client client) {
        TypedQuery<Meeting> query = em.createQuery(
                "SELECT m FROM Meeting m WHERE m.client.id = :clientId",
                Meeting.class);
        query.setParameter("clientId", client.getId());
        return query.getResultList();
    }
}
