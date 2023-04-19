package cz.vut.fit.pis.xmatej55.services.impl;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct.ProductState;
import cz.vut.fit.pis.xmatej55.managers.ClientProductManager;
import cz.vut.fit.pis.xmatej55.services.ClientProductService;
import java.util.List;
import java.util.Optional;
import jakarta.inject.Inject;

public class ClientProductServiceImpl implements ClientProductService {

    @Inject
    private ClientProductManager clientProductManager;

    @Override
    public ClientProduct create(ClientProduct clientProduct) {
        return clientProductManager.create(clientProduct);
    }

    @Override
    public ClientProduct update(ClientProduct clientProduct) {
        return clientProductManager.update(clientProduct);
    }

    @Override
    public void deleteById(Long id) {
        clientProductManager.deleteById(id);
    }

    @Override
    public Optional<ClientProduct> findById(Long id) {
        return clientProductManager.findById(id);
    }

    @Override
    public List<ClientProduct> findAll() {
        return clientProductManager.findAll();
    }

    @Override
    public List<ClientProduct> findAllByState(ProductState state) {
        return clientProductManager.findAllByState(state);
    }

    @Override
    public Optional<ClientProduct> findByClientAndProductId(Client client, Long productId) {
        return clientProductManager.findByClientAndProductId(client, productId);
    }

    @Override
    public List<ClientProduct> findAllProductsByClientId(Long clientId) {
        return clientProductManager.findAllProductsByClientId(clientId);
    }
}
