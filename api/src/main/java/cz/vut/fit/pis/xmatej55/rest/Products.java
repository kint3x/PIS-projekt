package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.Error;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.services.ProductService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.OPTIONS;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.core.Response.Status;

@Path("/products")
@ApplicationScoped
public class Products {
    @Inject
    private ProductService productService;

    @Context
    private UriInfo context;

    public Products() {

    }

    @OPTIONS
    public Response options() {
        return Response.ok("").build();
    }

    @OPTIONS
    @Path("/{id}")
    public Response options(@PathParam("id") Long id) {
        return Response.ok("").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProducts() {
        return Response.ok(productService.findAll()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProductById(@PathParam("id") Long id) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        return Response.ok(optProduct.get()).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProduct(Product product) {
        Product savedProduct = productService.create(product);
        final URI uri = UriBuilder.fromPath("/products/{resourceServerId}").build(savedProduct.getId());

        return Response.created(uri).entity(savedProduct).build();
    }

    @Path("/{id}")
    @DELETE
    public Response removeProduct(@PathParam ("id") Long id) {
        Optional<Product> p = productService.findById(id);

        if (!p.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        productService.deleteById(p.get().getId());

        return Response.ok().build();
    }

    @Path("/{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateProduct(@PathParam("id") Long id, Product newProduct) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        Product oldProduct = optProduct.get();

        oldProduct.setName(newProduct.getName());

        return Response.ok(productService.update(oldProduct)).build();
    }

    // TODO: addClient
    // TODO: removeClient (change state)
    // TODO: addEmployee
    // TODO: removeEmployee
    // TODO: getClients, getEmployees
}
