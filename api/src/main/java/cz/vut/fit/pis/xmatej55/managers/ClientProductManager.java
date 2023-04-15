package cz.vut.fit.pis.xmatej55.managers;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import java.util.List;
import java.util.Optional;

public interface ClientProductManager {
    ClientProduct create(ClientProduct clientProduct);

    ClientProduct update(ClientProduct clientProduct);

    void deleteById(Long id);

    Optional<ClientProduct> findById(Long id);

    List<ClientProduct> findAll();

    List<ClientProduct> findAllByState(ClientProduct.ProductState state);

    Optional<ClientProduct> findByClientAndProductId(Client client, Long productId);

    List<ClientProduct> findAllProductsByClientId(Long clientId);
}
