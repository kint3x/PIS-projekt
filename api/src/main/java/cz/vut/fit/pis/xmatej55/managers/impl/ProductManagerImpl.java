package cz.vut.fit.pis.xmatej55.managers.impl;

import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.ProductManager;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ProductManagerImpl implements ProductManager {

    @PersistenceContext
    private EntityManager em;

    public ProductManagerImpl() {

    }

    @Override
    @Transactional
    public Product create(Product product) {
        em.persist(product);
        return product;
    }

    @Override
    @Transactional
    public Product update(Product product) {
        return em.merge(product);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Product product = em.find(Product.class, id);
        if (product != null) {
            em.remove(product);
        }
    }

    @Override
    @Transactional
    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(em.find(Product.class, id));
    }

    @Override
    @Transactional
    public List<Product> findAll() {
        return em.createQuery("SELECT p FROM Product p", Product.class).getResultList();
    }

}
