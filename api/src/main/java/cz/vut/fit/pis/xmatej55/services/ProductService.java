package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Product;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product create(Product product);

    Product update(Product product);

    void deleteById(Long id);

    Optional<Product> findById(Long id);

    List<Product> findAll();

}
