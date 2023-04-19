package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
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

    public List<ClientProduct> findAllByState(ClientProduct.ProductState state) {
        return em.createQuery("SELECT cp FROM ClientProduct cp WHERE cp.state = :state", ClientProduct.class)
                .setParameter("state", state)
                .getResultList();
    }

    public Optional<ClientProduct> findByClientAndProductId(Client client, Long productId) {
        return em
                .createQuery("SELECT cp FROM ClientProduct cp WHERE cp.client = :client AND cp.product.id = :productId",
                        ClientProduct.class)
                .setParameter("client", client)
                .setParameter("productId", productId)
                .getResultStream()
                .findFirst();
    }

    public List<ClientProduct> findAllProductsByClientId(Long clientId) {
        return em.createQuery("SELECT cp FROM ClientProduct cp WHERE cp.client.id = :clientId", ClientProduct.class)
                .setParameter("clientId", clientId)
                .getResultList();
    }
}
