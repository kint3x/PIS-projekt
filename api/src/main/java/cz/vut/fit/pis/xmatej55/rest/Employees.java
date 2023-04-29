package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.ClientDTO;
import cz.vut.fit.pis.xmatej55.dto.Error;
import cz.vut.fit.pis.xmatej55.dto.ProductDTO;
import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.services.ClientProductService;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import cz.vut.fit.pis.xmatej55.services.MeetingService;
import cz.vut.fit.pis.xmatej55.services.ProductService;
import jakarta.annotation.security.RolesAllowed;
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
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Path("/employees")
@ApplicationScoped
public class Employees {
    @Inject
    private EmployeeService employeeService;

    @Inject
    private MeetingService meetingService;

    @Inject
    private ClientService clientService;

    @Inject
    private ProductService productService;

    @Inject
    private ClientProductService clientProductService;

    @Context
    private UriInfo context;

    public Employees() {

    }

    @OPTIONS
    public Response options() {
        return Response.ok("").build();
    }

    @OPTIONS
    @Path("{var:.+}")
    public Response options(@PathParam("id") Long id) {
        return Response.ok("").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all employees")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of employees", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) })
    })
    public Response getEmployees() {
        return Response.ok(employeeService.findAll()).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content)
    })
    public Response getEmployeeById(@PathParam("id") Long id) {
        Optional<Employee> e = employeeService.findById(id);

        if (!e.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        return Response.ok(e.get()).build();
    }

    @POST
    @RolesAllowed("owner")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Create a new employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Employee created", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "409", description = "Employee with the provided username already exists", content = @Content)
    })
    public Response createEmployee(Employee employee) {
        Optional<Employee> existing;
        try {
            existing = employeeService.findByUsername(employee.getUsername());
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }

        if (existing.isPresent()) {
            return Response.status(Status.CONFLICT)
                    .entity(
                            new Error(
                                    String.format("Employee with username '%s' already exists.",
                                            employee.getUsername())))
                    .build();
        }
        try {
            Employee savedEmployee = employeeService.create(employee);
            final URI uri = UriBuilder.fromPath("/employees/{resourceServerId}").build(savedEmployee.getId());

            return Response.created(uri).entity(savedEmployee).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }
    }

    @Path("/{id}")
    @DELETE
    @RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee removed", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content)
    })
    public Response removeEmployee(@PathParam("id") Long id) {
        Optional<Employee> e = employeeService.findById(id);

        if (!e.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        employeeService.deleteById(e.get().getId());

        return Response.ok().build();
    }

    @Path("/{id}")
    @PUT
    @RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Update an employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee updated", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content),
            @ApiResponse(responseCode = "409", description = "Employee with the provided username already exists", content = @Content)
    })
    public Response updateEmployee(@PathParam("id") Long id, Employee newEmployee) {
        Optional<Employee> old = employeeService.findById(id);

        if (!old.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Optional<Employee> existing;
        try {
            existing = employeeService.findByUsername(newEmployee.getUsername());
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }

        Employee oldEmployee = old.get();

        if (existing.isPresent() && existing.get().getId() != oldEmployee.getId()) {
            return Response.status(Status.CONFLICT)
                    .entity(new Error(
                            String.format("Employee with username '%s' already exists.", newEmployee.getUsername())))
                    .build();
        }

        oldEmployee.setUsername(newEmployee.getUsername());
        oldEmployee.setPassword(newEmployee.getPassword());
        oldEmployee.setType(newEmployee.getType());
        oldEmployee.setPhone(newEmployee.getPhone());
        oldEmployee.setAddress(newEmployee.getAddress());
        oldEmployee.setDob(newEmployee.getDob());
        oldEmployee.setName(newEmployee.getName());
        oldEmployee.setSurname(newEmployee.getSurname());
        oldEmployee.setEmail(newEmployee.getEmail());
        oldEmployee.setImage(newEmployee.getImage());

        try {
            Employee updatedEmployee = employeeService.update(oldEmployee);
            return Response.ok(updatedEmployee).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }
    }

    @Path("/{id}/meetings")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get meetings for an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of meetings", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content)
    })
    public Response getMeetings(@PathParam("id") Long id) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Employee employee = optEmployee.get();

        return Response.ok(meetingService.findAllByEmployee(employee)).build();
    }

    @Path("/{id}/products")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get products for an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of products", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content)
    })
    public Response getProducts(@PathParam("id") Long id) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Employee employee = optEmployee.get();

        return Response.ok(productService.findByEmployee(employee)).build();
    }

    @Path("/{id}/clients")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get clients for an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of clients", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content)
    })
    public Response getClients(@PathParam("id") Long id) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Employee employee = optEmployee.get();

        return Response.ok(clientService.findByEmployee(employee)).build();
    }

    @Path("/{id}/add_client")
    @POST
    @RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Add a client to an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client added", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee or client not found", content = @Content)
    })
    public Response addClient(@PathParam("id") Long id, ClientDTO clientDTO) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Optional<Client> optClient = clientService.findById(clientDTO.getClientId());

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", clientDTO.getClientId())))
                    .build();
        }

        Employee employee = optEmployee.get();
        Client client = optClient.get();
        try {
            employee.addClient(client);
            employeeService.update(employee);

            return Response.ok(clientService.findByEmployee(employee)).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }
    }

    @Path("/{id}/remove_client")
    @DELETE
    @RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove a client from an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client removed", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee or client not found", content = @Content)
    })
    public Response removeClient(@PathParam("id") Long id, ClientDTO clientDTO) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Optional<Client> optClient = clientService.findById(clientDTO.getClientId());

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", clientDTO.getClientId())))
                    .build();
        }

        Employee employee = optEmployee.get();
        Client client = optClient.get();
        try {
            employee.removeClient(client);
            employeeService.update(employee);

            return Response.ok().build();
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }
    }

    @Path("/{id}/add_product")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Add a product to an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product added", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee or product not found", content = @Content)
    })
    public Response addProduct(@PathParam("id") Long id, ProductDTO productDTO) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Optional<Product> optProduct = productService.findById(productDTO.getProductId());

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.",
                            productDTO.getProductId())))
                    .build();
        }

        Employee employee = optEmployee.get();
        Product product = optProduct.get();
        try {
            employee.addProduct(product);
            employeeService.update(employee);

            return Response.ok(productService.findByEmployee(employee)).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }
    }

    @Path("/{id}/remove_product")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove a product from an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product removed", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "404", description = "Employee or product not found", content = @Content)
    })
    public Response removeProduct(@PathParam("id") Long id, ProductDTO productDTO) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Optional<Product> optProduct = productService.findById(productDTO.getProductId());

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", productDTO.getProductId())))
                    .build();
        }

        Employee employee = optEmployee.get();
        Product product = optProduct.get();
        try {
            employee.removeProduct(product);
            employeeService.update(employee);

            return Response.ok().build();
        } catch (IllegalArgumentException e) {
            return Response.status(Status.BAD_REQUEST).entity(new Error(e.getMessage())).build();
        }
    }

    @Path("/{id}/client_products")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all client products for an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client products found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ClientProduct.class)) }),
            @ApiResponse(responseCode = "404", description = "Client not found", content = @Content)
    })
    public Response getClientProducts(@PathParam("id") Long id) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id))).build();
        }

        Employee employee = optEmployee.get();

        return Response.ok(clientProductService.findByEmployee(employee)).build();
    }
}
