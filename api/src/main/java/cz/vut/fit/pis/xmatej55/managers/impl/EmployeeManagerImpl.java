package cz.vut.fit.pis.xmatej55.managers.impl;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.managers.EmployeeManager;
import java.util.List;
import java.util.Optional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

public class EmployeeManagerImpl implements EmployeeManager {

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public Employee create(Employee employee) {
        em.persist(employee);
        return employee;
    }

    @Override
    @Transactional
    public Employee update(Employee employee) {
        return em.merge(employee);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Employee employee = em.find(Employee.class, id);
        if (employee != null) {
            em.remove(employee);
        }
    }

    @Override
    @Transactional
    public Optional<Employee> findById(Long id) {
        return Optional.ofNullable(em.find(Employee.class, id));
    }

    @Override
    @Transactional
    public List<Employee> findAll() {
        return em.createQuery("SELECT e FROM Employee e", Employee.class).getResultList();
    }

    @Override
    public List<Meeting> findAllMeetingsByEmployee(Employee client) {
        TypedQuery<Meeting> query = em.createQuery(
                "SELECT m FROM Meeting m WHERE m.employee.id = :employeeId",
                Meeting.class);
        query.setParameter("employeeId", client.getId());
        return query.getResultList();
    }
}