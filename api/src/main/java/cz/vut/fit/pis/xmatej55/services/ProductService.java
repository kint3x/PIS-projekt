package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.managers.ProductManager;
import cz.vut.fit.pis.xmatej55.services.ProductService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ProductService {

    @Inject
    private ProductManager productManager;

    public Product create(Product product) {
        List<String> errors = validateProduct(product);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
        return productManager.create(product);
    }

    public Product update(Product product) {
        List<String> errors = validateProduct(product);
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join(", ", errors));
        }
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

    public Boolean isProductManagedByEmployee(Product product, Employee employee) {
        Set<Product> managedProducts = employee.getProducts();

        for (Product managedProduct : managedProducts) {
            if (managedProduct.getId() == product.getId()) {
                return true;
            }
        }

        return false;
    }

    private List<String> validateProduct(Product product) {
        List<String> errors = new ArrayList<>();

        if (product.getName() == null || product.getName().trim().isEmpty()) {
            errors.add("Product name is empty");
        }

        return errors;
    }
}
