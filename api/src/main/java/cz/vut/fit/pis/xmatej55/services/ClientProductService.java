package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct.ProductState;
import java.util.List;
import java.util.Optional;

public interface ClientProductService {

    ClientProduct create(ClientProduct clientProduct);

    ClientProduct update(ClientProduct clientProduct);

    void deleteById(Long id);

    Optional<ClientProduct> findById(Long id);

    List<ClientProduct> findAll();

    List<ClientProduct> findAllByState(ProductState state);

    Optional<ClientProduct> findByClientAndProductId(Client client, Long productId);

    List<ClientProduct> findAllProductsByClientId(Long clientId);
}
