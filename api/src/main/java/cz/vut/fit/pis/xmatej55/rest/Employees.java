package cz.vut.fit.pis.xmatej55.rest;

import java.util.List;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.ErrorDTO;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.core.Response;
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
            return Response.status(Status.NOT_FOUND).entity(new ErrorDTO(String.format("Person with id '%d' not found.", id))).build();
        }
        
        return Response.ok(e.get()).build();
    }
}
