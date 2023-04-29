package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.ClientDTO;
import cz.vut.fit.pis.xmatej55.dto.ClientProductDTO;
import cz.vut.fit.pis.xmatej55.dto.EmployeeDTO;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

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
    @Path("{var:.+}")
    public Response options(@PathParam("id") Long id) {
        return Response.ok("").build();
    }

    @OPTIONS
    public Response options() {
        return Response.ok("").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of products", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) })
    })
    public Response getProducts() {
        return Response.ok(productService.findAll()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get a product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
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
    @Operation(summary = "Create a new product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) })
    })
    public Response createProduct(Product product) {
        Product savedProduct = productService.create(product);
        final URI uri = UriBuilder.fromPath("/products/{resourceServerId}").build(savedProduct.getId());

        return Response.created(uri).entity(savedProduct).build();
    }

    @Path("/{id}")
    @DELETE
    @Operation(summary = "Remove a product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product removed", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    public Response removeProduct(@PathParam("id") Long id) {
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
    @Operation(summary = "Update a product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
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
    @Operation(summary = "Get employees associated with a product by product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employees found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
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
    @Operation(summary = "Add an employee to a product by product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee added", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Product or employee not found", content = @Content)
    })
    public Response addEmployee(@PathParam("id") Long id, EmployeeDTO employeeDTO) {
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

        return Response.ok(employeeService.findByProduct(product)).build();
    }

    @Path("/{id}/remove_employee")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove an employee from a product by product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee removed", content = {
                    @Content(mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Product or employee not found", content = @Content)
    })
    public Response removeEmployee(@PathParam("id") Long id, EmployeeDTO employeeDTO) {
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

        return Response.ok().build();
    }

    @Path("/{id}/client_products")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get clients associated with a product by product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clients found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ClientProduct.class)) }),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
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
    @Operation(summary = "Add a client and an employee to a product by product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client added", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ClientProduct.class)) }),
            @ApiResponse(responseCode = "404", description = "Product, client or employee not found", content = @Content)
    })
    public Response addClient(@PathParam("id") Long id, ClientProductDTO clientProductDTO) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        Optional<Client> optClient = clientService.findById(clientProductDTO.getClientId());

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", clientProductDTO.getClientId())))
                    .build();
        }

        Optional<Employee> optEmployee = employeeService.findById(clientProductDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
                return Response.status(Status.NOT_FOUND)
                                .entity(new Error(String.format("Employee with id '%d' not found.",
                                                clientProductDTO.getEmployeeId())))
                                .build();
        }

        Employee employee = optEmployee.get();
        Client client = optClient.get();
        Product product = optProduct.get();

        if (!productService.isProductManagedByEmployee(product, employee)) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' isn't managed by an employee with id '%d'.", 
                        id, employee.getId())))
                    .build();
        }

        if (!clientService.isClientManagedByEmployee(client, employee)) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' isn't managed by an employee with id '%d'.",
                            client.getId(), employee.getId())))
                    .build();
        }

        Optional<ClientProduct> optClientProduct = clientProductService.findByClientAndProduct(client, product);

        if (optClientProduct.isPresent()) {
            ClientProduct clientProduct = optClientProduct.get();
            clientProduct.setActivateWithDate(true);

            return Response.ok(clientProductService.update(clientProduct)).build();
        }

        ClientProduct clientProduct = new ClientProduct();
        clientProduct.setActive(true);
        clientProduct.setClient(client);
        clientProduct.setProduct(product);
        clientProduct.setEmployee(employee);

        ClientProduct savedClientProduct = clientProductService.create(clientProduct);

        return Response.ok(savedClientProduct).build();
    }

    @Path("/{id}/change_client_employee")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Assign the product with a given ID to a new employee")
    @ApiResponses(value = {
                    @ApiResponse(responseCode = "200", description = "Employee changed", content = {
                                    @Content(mediaType = "application/json", schema = @Schema(implementation = ClientProduct.class)) }),
                    @ApiResponse(responseCode = "404", description = "Product, client or employee not found", content = @Content)
    })
    public Response changeEmployee(@PathParam("id") Long id, ClientProductDTO clientProductDTO) {
        Optional<Product> optProduct = productService.findById(id);

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                .entity(new Error(String.format("Product with id '%d' not found.", id))).build();
        }

        Optional<Client> optClient = clientService.findById(clientProductDTO.getClientId());

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                .entity(new Error(String.format("Client with id '%d' not found.",
                                                clientProductDTO.getClientId())))
                .build();
        }

        Optional<Employee> optEmployee = employeeService.findById(clientProductDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                .entity(new Error(String.format("Employee with id '%d' not found.",
                                                clientProductDTO.getEmployeeId())))
                .build();
        }
        
        Client client = optClient.get();
        Product product = optProduct.get();
        Employee employee = optEmployee.get();

        if (!productService.isProductManagedByEmployee(product, employee)) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' isn't managed by an employee with id '%d'.",
                            id, employee.getId())))
                    .build();
        }

        if (!clientService.isClientManagedByEmployee(client, employee)) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' isn't managed by an employee with id '%d'.",
                            client.getId(), employee.getId())))
                    .build();
        }

        Optional<ClientProduct> optClientProduct = clientProductService.findByClientAndProduct(client, product);
        
        if (!optClientProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                .entity(new Error(String.format("Client with id '%d' doesn't have a product with id '%d'.",
                    clientProductDTO.getClientId(), id)))
                .build();
        }
        
        ClientProduct clientProduct = optClientProduct.get();
        
        clientProduct.setEmployee(employee);
        
        return Response.ok(clientProductService.update(clientProduct)).build();
    }

    @Path("/{id}/remove_client")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove a client from a product by product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client removed from the product", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ClientProduct.class)) }),
            @ApiResponse(responseCode = "404", description = "Product or client not found", content = @Content)
    })
    public Response removeClient(@PathParam("id") Long id, ClientDTO clientDTO) {
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
