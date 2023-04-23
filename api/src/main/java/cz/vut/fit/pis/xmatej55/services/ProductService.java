package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.ProductManager;
import cz.vut.fit.pis.xmatej55.services.ProductService;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ProductService {

    @Inject
    private ProductManager productManager;

    public Product create(Product product) {
        return productManager.create(product);
    }

    public Product update(Product product) {
        return productManager.update(product);
    }

    public void deleteById(Long id) {
        productManager.deleteById(id);
    }

    public Optional<Product> findById(Long id) {
        return productManager.findById(id);
    }

    public List<Product> findAll() {
        return productManager.findAll();
    }

    public List<Product> findByEmployee(Employee employee) {
        return productManager.findByEmployee(employee);
    }
}
