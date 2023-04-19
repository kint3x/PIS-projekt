package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Error;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
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
@RequestScoped
public class Employees {
    @Inject
    private EmployeeService employeeService;

    @Context
    private UriInfo context;

    public Employees() {

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Employee> getEmployees() {
        return employeeService.findAll();
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
                    .entity(new Error(String.format("Person with username '%s' already exists.", employee.getUsername()))).build();
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
    @PATCH
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateEmployee(@PathParam("id") Long id, Employee newEmployee) {
        Optional<Employee> e = employeeService.findById(id);

        if (!e.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Person with id '%d' not found.", id))).build();
        }

        return Response.ok(employeeService.update(newEmployee)).build();
    }
}
