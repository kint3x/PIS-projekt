package cz.vut.fit.pis.xmatej55.services;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct.ProductState;
import cz.vut.fit.pis.xmatej55.managers.ClientProductManager;
import cz.vut.fit.pis.xmatej55.services.ClientProductService;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ClientProductService {

    @Inject
    private ClientProductManager clientProductManager;

    public ClientProduct create(ClientProduct clientProduct) {
        return clientProductManager.create(clientProduct);
    }

    public ClientProduct update(ClientProduct clientProduct) {
        return clientProductManager.update(clientProduct);
    }

    public void deleteById(Long id) {
        clientProductManager.deleteById(id);
    }

    public Optional<ClientProduct> findById(Long id) {
        return clientProductManager.findById(id);
    }

    public List<ClientProduct> findAll() {
        return clientProductManager.findAll();
    }

    public List<ClientProduct> findAllByState(ProductState state) {
        return clientProductManager.findAllByState(state);
    }

    public Optional<ClientProduct> findByClientAndProductId(Client client, Long productId) {
        return clientProductManager.findByClientAndProductId(client, productId);
    }

    public List<ClientProduct> findAllProductsByClientId(Long clientId) {
        return clientProductManager.findAllProductsByClientId(clientId);
    }
}
