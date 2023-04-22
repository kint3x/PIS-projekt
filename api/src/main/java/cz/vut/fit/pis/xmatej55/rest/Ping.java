package cz.vut.fit.pis.xmatej55.rest;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/ping")
public class Ping {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getPing() {
        return "pong";
    }

    @GET
    @Path("protected")
    @RolesAllowed("worker")
    @Produces(MediaType.TEXT_PLAIN)
    public String getProtectedPing() {
        return "🛡 pong ⚔";
    }
}
