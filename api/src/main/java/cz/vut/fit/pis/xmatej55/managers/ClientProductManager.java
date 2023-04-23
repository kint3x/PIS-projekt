package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.ClientProductManager;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ClientProductManager {

    @PersistenceContext
    private EntityManager em;

    public ClientProductManager() {
        
    }

    @Transactional
    public ClientProduct create(ClientProduct clientProduct) {
        em.persist(clientProduct);
        return clientProduct;
    }

    @Transactional
    public ClientProduct update(ClientProduct clientProduct) {
        return em.merge(clientProduct);
    }

    @Transactional
    public void deleteById(Long id) {
        ClientProduct clientProduct = em.find(ClientProduct.class, id);
        if (clientProduct != null) {
            em.remove(clientProduct);
        }
    }

    public Optional<ClientProduct> findById(Long id) {
        return Optional.ofNullable(em.find(ClientProduct.class, id));
    }

    public List<ClientProduct> findAll() {
        return em.createQuery("SELECT cp FROM ClientProduct cp", ClientProduct.class).getResultList();
    }

    public List<ClientProduct> findByClient(Client client) {
        return em.createQuery("SELECT cp FROM ClientProduct cp WHERE cp.client = :client", ClientProduct.class)
                .setParameter("client", client)
                .getResultList();
    }

    public List<ClientProduct> findByProduct(Product product) {
        return em.createQuery("SELECT cp FROM ClientProduct cp WHERE cp.product = :product", ClientProduct.class)
                .setParameter("product", product)
                .getResultList();
    }

    public Optional<ClientProduct> findByClientAndProduct(Client client, Product product) {
        return em
                .createQuery("SELECT cp FROM ClientProduct cp WHERE cp.client = :client AND cp.product = :product",
                        ClientProduct.class)
                .setParameter("client", client)
                .setParameter("product", product)
                .getResultStream()
                .findFirst();
    }
}
