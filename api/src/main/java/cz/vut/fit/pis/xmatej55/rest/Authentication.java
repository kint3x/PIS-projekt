package cz.vut.fit.pis.xmatej55.rest;

import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Employee.EmployeeType;
import cz.vut.fit.pis.xmatej55.jwt.Credentials;
import cz.vut.fit.pis.xmatej55.jwt.JwtTokenGenerator;
import cz.vut.fit.pis.xmatej55.services.AuthenticationService;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.MediaType;

@Path("/auth")
public class Authentication {
    @Inject
    AuthenticationService authenticationService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticateUser(Credentials credentials) {
        Optional<EmployeeType> employeeType = authenticationService.isValidUser(credentials.getUsername(),
                credentials.getPassword());
        if (employeeType.isPresent()) {
            try {
                String token = JwtTokenGenerator.generateJWTString(credentials.getUsername(),
                        employeeType.get());
                return Response.ok(token).build();
            } catch (Exception e) {
                return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e).build();
            }
        } else {
            return Response.status(Status.FORBIDDEN).entity("invalid login").build();
        }
    }
}
