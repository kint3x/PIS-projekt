package cz.vut.fit.pis.xmatej55.rest;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;

@Path("/ping")
public class Ping {

    @Context
    private SecurityContext securityContext;

    @GET
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public String getPing() {
        if (securityContext.isUserInRole("owner")) {
            return "owner";
        } else if (securityContext.isUserInRole("manager")) {
            return "manager";
        } else if (securityContext.isUserInRole("worker")) {
            return "worker";
        }
        return "pong";
    }

    @GET
    @Path("protected")
    @RolesAllowed({ "manager" })
    @Produces(MediaType.TEXT_PLAIN)
    public String getProtectedPing() {
        return "🛡 pong ⚔";
    }
}
