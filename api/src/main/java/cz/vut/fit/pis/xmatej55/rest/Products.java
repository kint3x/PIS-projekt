package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.AddClient;
import cz.vut.fit.pis.xmatej55.dto.AddEmployee;
import cz.vut.fit.pis.xmatej55.dto.Error;
import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.services.ClientProductService;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
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

    @Inject
    private EmployeeService employeeService;

    @Inject
    private ClientService clientService;

    @Inject
    private ClientProductService clientProductService;

    @Context
    private UriInfo context;

    public Products() {

    }

    @OPTIONS
    @Path("{var:.*}")
    public Response options(@PathParam("id") Long id) {
        return Response.ok("").build();
    }

    // @OPTIONS
    // public Response options() {
    //     return Response.ok("").build();
    // }

    // @OPTIONS
    // @Path("/{id}")
    // public Response options(@PathParam("id") Long id) {
    //     return Response.ok("").build();
    // }

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

    @Path("/{id}/employees")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEmployees(@PathParam("id") Long id) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        Product product = optProduct.get();

        return Response.ok(employeeService.findByProduct(product)).build();
    }

    @Path("/{id}/add_employee")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEmployee(@PathParam("id") Long id, AddEmployee employeeDTO) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id)))
                    .build();
        }

        Optional<Employee> optEmployee = employeeService.findById(employeeDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", employeeDTO.getEmployeeId())))
                    .build();
        }

        Product product = optProduct.get();
        Employee employee = optEmployee.get();

        employee.addProduct(product);
        employeeService.update(employee);

        return Response.ok(product).build();
    }

    @Path("/{id}/remove_employee")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeEmployee(@PathParam("id") Long id, AddEmployee employeeDTO) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id)))
                    .build();
        }

        Optional<Employee> optEmployee = employeeService.findById(employeeDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", employeeDTO.getEmployeeId())))
                    .build();
        }

        Product product = optProduct.get();
        Employee employee = optEmployee.get();

        employee.removeProduct(product);
        employeeService.update(employee);

        return Response.ok(product).build();
    }

    @Path("/{id}/client_products")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClients(@PathParam("id") Long id) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        Product product = optProduct.get();

        return Response.ok(clientProductService.findByProduct(product)).build();
    }

    @Path("/{id}/add_client")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addClient(@PathParam("id") Long id, AddClient clientDTO) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        Optional<Client> optClient = clientService.findById(clientDTO.getClientId());

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", clientDTO.getClientId())))
                    .build();
        }


        Client client = optClient.get();
        Product product = optProduct.get();

        Optional<ClientProduct> optClientProduct = clientProductService.findByClientAndProduct(client, product);

        if (optClientProduct.isPresent()) {
            ClientProduct clientProduct = optClientProduct.get();
            clientProduct.setActivateWithDate(true);

            return Response.ok(clientProductService.update(clientProduct)).build();
        }

        ClientProduct clientProduct = new ClientProduct();
        clientProduct.setActivateWithDate(true);
        clientProduct.setClient(client);
        clientProduct.setProduct(product);

        ClientProduct savedClientProduct = clientProductService.create(clientProduct);

        return Response.ok(savedClientProduct).build();
    }

    @Path("/{id}/remove_client")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeClient(@PathParam("id") Long id, AddClient clientDTO) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        Optional<Client> optClient = clientService.findById(clientDTO.getClientId());

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", clientDTO.getClientId())))
                    .build();
        }

        Client client = optClient.get();
        Product product = optProduct.get();

        Optional<ClientProduct> optClientProduct = clientProductService.findByClientAndProduct(client, product);

        if (!optClientProduct.isPresent()) {
            return Response.ok().build();
        }

        ClientProduct clientProduct = optClientProduct.get();

        clientProduct.setActivateWithDate(false);

        return Response.ok(clientProductService.update(clientProduct)).build();
    }
}
