package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.EmployeeDTO;
import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.services.ClientProductService;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import cz.vut.fit.pis.xmatej55.services.MeetingService;
import cz.vut.fit.pis.xmatej55.services.ProductService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.OPTIONS;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.core.Response.Status;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Path("/clients")
@ApplicationScoped
public class Clients {
    @Inject
    private ClientService clientService;

    @Inject
    private MeetingService meetingService;

    @Inject
    private ProductService productService;

    @Inject
    private EmployeeService employeeService;

    @Inject
    private ClientProductService clientProductService;

    @Context
    private UriInfo context;

    public Clients() {

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
    @Operation(summary = "Get all clients")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clients found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) })
    })
    public Response getClients() {
        return Response.ok(clientService.findAll()).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get a client by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "404", description = "Client not found", content = @Content)
    })
    public Response getClientById(@PathParam("id") Long id) {
        Optional<Client> c = clientService.findById(id);

        if (!c.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id)))
                    .build();
        }

        return Response.ok(c.get()).build();
    }

    @POST
    //@RolesAllowed({ "manager" })
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Create a new client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Client created", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
            @ApiResponse(responseCode = "409", description = "Client already exists", content = @Content) })
    public Response createClient(Client client) {
        Client savedClient = clientService.create(client);
        final URI uri = UriBuilder.fromPath("/clients/{resourceServerId}").build(savedClient.getId());

        return Response.created(uri).entity(savedClient).build();
    }

    @Path("/{id}")
    @DELETE
    //@RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Delete a client by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client deleted", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "404", description = "Client not found", content = @Content) })

    public Response removeClient(@PathParam("id") Long id) {
        Optional<Client> c = clientService.findById(id);

        if (!c.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id))).build();
        }

        clientService.deleteById(c.get().getId());
        return Response.ok().build();
    }

    @Path("/{id}")
    @PUT
    //@RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Update a client by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client updated", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "404", description = "Client not found", content = @Content) })
    public Response updateClient(@PathParam("id") Long id, Client newClient) {
        Optional<Client> old = clientService.findById(id);

        if (!old.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id))).build();
        }

        Client oldClient = old.get();

        oldClient.setNotes(newClient.getNotes());
        oldClient.setPhone(newClient.getPhone());
        oldClient.setAddress(newClient.getAddress());
        oldClient.setDob(newClient.getDob());
        oldClient.setName(newClient.getName());
        oldClient.setSurname(newClient.getSurname());
        oldClient.setEmail(newClient.getEmail());
        oldClient.setImage(newClient.getImage());

        return Response.ok(clientService.update(oldClient)).build();
    }

    @Path("/{id}/meetings")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all meetings for a client by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meetings found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "404", description = "Client not found", content = @Content)
    })
    public Response getMeetings(@PathParam("id") Long id) {
        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id))).build();
        }

        Client client = optClient.get();

        return Response.ok(meetingService.findAllByClient(client)).build();
    }

    @Path("/{id}/employees")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all employees associated with a client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of employees found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Client not found", content = @Content)
    })
    public Response getEmployees(@PathParam("id") Long id) {
        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id))).build();
        }

        Client client = optClient.get();

        return Response.ok(employeeService.findByClient(client)).build();
    }

    @Path("/{id}/add_employee")
    @POST
    //@RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Add an employee to a client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee added", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Client or employee not found", content = @Content)
    })
    public Response addEmployee(@PathParam("id") Long id, EmployeeDTO employeeDTO) {
        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id)))
                    .build();
        }

        Optional<Employee> optEmployee = employeeService.findById(employeeDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", employeeDTO.getEmployeeId())))
                    .build();
        }

        Client client = optClient.get();
        Employee employee = optEmployee.get();

        employee.addClient(client);
        employeeService.update(employee);

        return Response.ok(employeeService.findByClient(client)).build();
    }

    @Path("/{id}/remove_employee")
    @DELETE
    //@RolesAllowed({ "manager" })
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove an employee from a client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee removed", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class)) }),
            @ApiResponse(responseCode = "404", description = "Client or employee not found", content = @Content)
    })
    public Response removeEmployee(@PathParam("id") Long id, EmployeeDTO employeeDTO) {
        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id)))
                    .build();
        }

        Optional<Employee> optEmployee = employeeService.findById(employeeDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", employeeDTO.getEmployeeId())))
                    .build();
        }

        Client client = optClient.get();
        Employee employee = optEmployee.get();

        employee.removeClient(client);
        employeeService.update(employee);

        return Response.ok().build();
    }

    @Path("/{id}/client_products")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all client products for a client by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client products found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ClientProduct.class)) }),
            @ApiResponse(responseCode = "404", description = "Client not found", content = @Content)
    })
    public Response getClientProducts(@PathParam("id") Long id) {
        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id))).build();
        }

        Client client = optClient.get();

        return Response.ok(clientProductService.findByClient(client)).build();
    }
}
