package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.EmployeeManager;
import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class EmployeeManager {

    @PersistenceContext
    private EntityManager em;

    public EmployeeManager() {

    }

    @Transactional
    public Employee create(Employee employee) {
        String plainTextPassword = employee.getPassword();
        String hashedPassword = BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
        employee.setPassword(hashedPassword);

        em.persist(employee);
        return employee;
    }

    @Transactional
    public Employee update(Employee employee) {
        String plainTextPassword = employee.getPassword();
        String hashedPassword = BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
        employee.setPassword(hashedPassword);

        return em.merge(employee);
    }

    @Transactional
    public void deleteById(Long id) {
        Employee employee = em.find(Employee.class, id);
        if (employee != null) {
            em.remove(employee);
        }
    }

    public Optional<Employee> findById(Long id) {
        return Optional.ofNullable(em.find(Employee.class, id));
    }

    public Optional<Employee> findByUsername(String username) {
        TypedQuery<Employee> query = em.createQuery(
                "SELECT e FROM Employee e WHERE e.username = :username",
                Employee.class);
        query.setParameter("username", username);

        try {
            Employee e = query.getSingleResult();
            return Optional.ofNullable(e);
        } catch (NoResultException exception) {
            return Optional.ofNullable(null);
        }
    }

    public List<Employee> findAll() {
        return em.createQuery("SELECT e FROM Employee e", Employee.class).getResultList();
    }

    public List<Employee> findByProduct(Product product) {
        TypedQuery<Employee> query = em
                .createQuery("SELECT e FROM Employee e JOIN e.products p WHERE p = :product", Employee.class);
        query.setParameter("product", product);
        return query.getResultList();
    }

    public List<Employee> findByClient(Client client) {
        TypedQuery<Employee> query = em
                .createQuery("SELECT e FROM Employee e JOIN e.clients c WHERE c = :client", Employee.class);
        query.setParameter("client", client);
        return query.getResultList();
    }
}