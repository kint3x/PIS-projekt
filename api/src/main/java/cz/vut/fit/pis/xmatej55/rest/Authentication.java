package cz.vut.fit.pis.xmatej55.rest;

import java.util.Optional;

import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.jwt.Credentials;
import cz.vut.fit.pis.xmatej55.jwt.JwtTokenGenerator;
import cz.vut.fit.pis.xmatej55.services.AuthenticationService;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.OPTIONS;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.MediaType;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@Path("/auth")
public class Authentication {
    @Inject
    AuthenticationService authenticationService;

    @OPTIONS
    public Response options() {
        return Response.ok("").build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Authenticate a user and return a JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authenticated and token returned", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)) }),
            @ApiResponse(responseCode = "403", description = "Invalid login", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    public Response authenticateUser(Credentials credentials) {
        Optional<Employee> employee = authenticationService.isValidUser(credentials.getUsername(),
                credentials.getPassword());
        if (employee.isPresent()) {
            try {
                String token = JwtTokenGenerator.generateJWTString(employee.get());
                return Response.ok(token).build();
            } catch (Exception e) {
                return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e).build();
            }
        } else {
            return Response.status(Status.FORBIDDEN)
                    .entity(new Error(String.format("Invalid login.")))
                    .build();
        }
    }
}
