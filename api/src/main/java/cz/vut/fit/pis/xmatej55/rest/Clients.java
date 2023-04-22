package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Client;
import cz.vut.fit.pis.xmatej55.services.ClientService;
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

    @Context
    private UriInfo context;

    public Clients() {

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
}
