package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.MeetingManager;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class MeetingManager {

    @PersistenceContext
    private EntityManager em;

    public MeetingManager() {

    }

    @Transactional
    public Meeting create(Meeting meeting) {
        em.persist(meeting);
        return meeting;
    }

    @Transactional
    public Meeting update(Meeting meeting) {
        return em.merge(meeting);
    }

    @Transactional
    public void deleteById(Long id) {
        Meeting meeting = em.find(Meeting.class, id);
        if (meeting != null) {
            em.remove(meeting);
        }
    }

    public Optional<Meeting> findById(Long id) {
        return Optional.ofNullable(em.find(Meeting.class, id));
    }

    public List<Meeting> findAll() {
        return em.createQuery("SELECT m FROM Meeting m", Meeting.class).getResultList();
    }

    public List<Meeting> findAllByClient(Client client) {
        TypedQuery<Meeting> query = em.createQuery("SELECT m FROM Meeting m WHERE m.client = :client",
                Meeting.class);
        query.setParameter("client", client);
        return query.getResultList();
    }

    public List<Meeting> findAllByEmployee(Employee employee) {
        TypedQuery<Meeting> query = em
                .createQuery("SELECT m FROM Meeting m JOIN m.employees e WHERE e = :employee", Meeting.class);
        query.setParameter("employee", employee);
        return query.getResultList();
    }
}
