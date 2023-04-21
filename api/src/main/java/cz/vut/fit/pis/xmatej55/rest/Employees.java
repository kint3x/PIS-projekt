package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Error;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
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

    @Context
    private UriInfo context;

    public Employees() {

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
                    .entity(new Error(String.format("Person with id '%d' not found.", id))).build();
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
                            String.format("Person with username '%s' already exists.", 
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
    public Response removePerson(@PathParam("id") Long id) {
        Optional<Employee> e = employeeService.findById(id);

        if (!e.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                .entity(new Error(String.format("Person with id '%d' not found.", id))).build();
        }

        employeeService.deleteById(e.get().getId());
        return Response.ok().build();
    }

    @Path("/{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateEmployee(@PathParam("id") Long id, Employee newEmployee) {
        Optional<Employee> old = employeeService.findById(id);

        if (!old.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Person with id '%d' not found.", id))).build();
        }

        Optional<Employee> existing = employeeService.findByUsername(newEmployee.getUsername());

        Employee oldEmployee = old.get();

        if (existing.isPresent() && existing.get().getId() != oldEmployee.getId()) {
            return Response.status(Status.CONFLICT)
                    .entity(new Error(String.format("Person with username '%s' already exists.", newEmployee.getUsername())))
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
}
