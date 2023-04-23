package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.AddClient;
import cz.vut.fit.pis.xmatej55.dto.AddProduct;
import cz.vut.fit.pis.xmatej55.dto.Error;
import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import cz.vut.fit.pis.xmatej55.services.MeetingService;
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

    @Context
    private UriInfo context;

    public Employees() {

    }

    // @OPTIONS
    // public Response options() {
    //     return Response.ok("").build();
    // }

    @OPTIONS
    @Path("{var:.+}")
    public Response options(@PathParam("id") Long id) {
        return Response.ok("").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEmployees() {
        return Response.ok(employeeService.findAll()).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEmployeeById(@PathParam("id") Long id) {
        Optional<Employee> e = employeeService.findById(id);

        if (!e.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }
        
        return Response.ok(e.get()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createEmployee(Employee employee) {
        Optional<Employee> existing = employeeService.findByUsername(employee.getUsername());

        if (existing.isPresent()) {
            return Response.status(Status.CONFLICT)
                    .entity(
                        new Error(
                            String.format("Employee with username '%s' already exists.", 
                            employee.getUsername())))
                    .build();
        }

        Employee savedEmployee = employeeService.create(employee);
        final URI uri = UriBuilder.fromPath("/employees/{resourceServerId}").build(savedEmployee.getId());

        return Response.created(uri).entity(savedEmployee).build();
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
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
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateMeeting(@PathParam("id") Long id, Employee newEmployee) {
        Optional<Employee> old = employeeService.findById(id);

        if (!old.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Optional<Employee> existing = employeeService.findByUsername(newEmployee.getUsername());

        Employee oldEmployee = old.get();

        if (existing.isPresent() && existing.get().getId() != oldEmployee.getId()) {
            return Response.status(Status.CONFLICT)
                    .entity(new Error(String.format("Employee with username '%s' already exists.", newEmployee.getUsername())))
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

        return Response.ok(employeeService.update(oldEmployee)).build();
    }

    @Path("/{id}/meetings")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response addClient(@PathParam("id") Long id, AddClient clientDTO) {
        Optional<Employee> optEmployee = employeeService.findById(id);

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Optional<Client> optClient = clientService.findById(clientDTO.getClientId());

        if(!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                .entity(new Error(String.format("Client with id '%d' not found.", clientDTO.getClientId()))).build();
        }
    
        Employee employee = optEmployee.get();
        Client client = optClient.get();

        employee.addClient(client);

        return Response.ok(employeeService.update(employee)).build();
    }

    @Path("/{id}/remove_client")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeClient(@PathParam("id") Long id, AddClient clientDTO) {
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

        employee.removeClient(client);

        return Response.ok(employeeService.update(employee)).build();
    }

    @Path("/{id}/add_product")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addProduct(@PathParam("id") Long id, AddProduct productDTO) {
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

        employee.addProduct(product);

        return Response.ok(employeeService.update(employee)).build();
    }

    @Path("/{id}/remove_product")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeClient(@PathParam("id") Long id, AddProduct productDTO) {
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

        employee.removeProduct(product);

        return Response.ok(employeeService.update(employee)).build();
    }
}
