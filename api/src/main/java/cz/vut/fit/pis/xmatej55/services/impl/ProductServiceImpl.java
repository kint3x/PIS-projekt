package cz.vut.fit.pis.xmatej55.services.impl;

import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.ProductManager;
import cz.vut.fit.pis.xmatej55.services.ProductService;
import java.util.List;
import java.util.Optional;
import jakarta.inject.Inject;

public class ProductServiceImpl implements ProductService {

    @Inject
    private ProductManager productManager;

    @Override
    public Product create(Product product) {
        return productManager.create(product);
    }

    @Override
    public Product update(Product product) {
        return productManager.update(product);
    }

    @Override
    public void deleteById(Long id) {
        productManager.deleteById(id);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productManager.findById(id);
    }

    @Override
    public List<Product> findAll() {
        return productManager.findAll();
    }
}
