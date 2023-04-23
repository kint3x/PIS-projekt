package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.AddEmployee;
import cz.vut.fit.pis.xmatej55.dto.AddProduct;
import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.entities.ClientProduct;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Product;
import cz.vut.fit.pis.xmatej55.services.ClientProductService;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import cz.vut.fit.pis.xmatej55.services.MeetingService;
import cz.vut.fit.pis.xmatej55.services.ProductService;
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

    // @OPTIONS
    // public Response options() {
    //     return Response.ok("").build();
    // }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClients() {
        return Response.ok(clientService.findAll()).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEmployeeById(@PathParam("id") Long id) {
        Optional<Client> c = clientService.findById(id);

        if (!c.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id)))
                    .build();
        }

        return Response.ok(c.get()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createEmployee(Client client) {
        Client savedClient = clientService.create(client);
        final URI uri = UriBuilder.fromPath("/clients/{resourceServerId}").build(savedClient.getId());

        return Response.created(uri).entity(savedClient).build();
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeEmployee(@PathParam("id") Long id) {
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
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateEmployee(@PathParam("id") Long id, Client newClient) {
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEmployee(@PathParam("id") Long id, AddEmployee employeeDTO) {
        Optional<Client> optClient = clientService.findById(id);
        
        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id)))
                    .build();
        }
        
        Optional<Employee> optEmployee = employeeService.findById(employeeDTO.getEmployeeId());
        
        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
            .entity(new Error(String.format("Employee with id '%d' not found.", employeeDTO.getEmployeeId()))).build();
        }

        Client client = optClient.get();
        Employee employee = optEmployee.get();

        employee.addClient(client);
        employeeService.update(employee);
        
        return Response.ok(client).build();
    }

    @Path("/{id}/remove_employee")
    @DELETE 
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeEmployee(@PathParam("id") Long id, AddEmployee employeeDTO) {
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

        return Response.ok(client).build();
    }

    @Path("/{id}/client_products")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClients(@PathParam("id") Long id) {
        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id))).build();
        }

        Client client = optClient.get();

        return Response.ok(clientProductService.findByClient(client)).build();
    }

    @Path("/{id}/add_product")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addProduct(@PathParam("id") Long id, AddProduct productDTO) {
        Optional<Product> optProduct = productService.findById(productDTO.getProductId());

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", productDTO.getProductId()))).build();
        }

        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id)))
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

    @Path("/{id}/remove_product")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeProduct(@PathParam("id") Long id, AddProduct productDTO) {
        Optional<Product> optProduct = productService.findById(productDTO.getProductId());

        if (!optProduct.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Product with id '%d' not found.", productDTO.getProductId()))).build();
        }

        Optional<Client> optClient = clientService.findById(id);

        if (!optClient.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Client with id '%d' not found.", id)))
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
