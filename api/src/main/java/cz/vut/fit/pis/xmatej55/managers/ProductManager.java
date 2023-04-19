package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.ProductManager;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ProductManager {

    @PersistenceContext
    private EntityManager em;

    public ProductManager() {

    }

    @Transactional
    public Product create(Product product) {
        em.persist(product);
        return product;
    }

    @Transactional
    public Product update(Product product) {
        return em.merge(product);
    }

    @Transactional
    public void deleteById(Long id) {
        Product product = em.find(Product.class, id);
        if (product != null) {
            em.remove(product);
        }
    }

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(em.find(Product.class, id));
    }

    public List<Product> findAll() {
        return em.createQuery("SELECT p FROM Product p", Product.class).getResultList();
    }
}
