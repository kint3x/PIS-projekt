package cz.vut.fit.pis.xmatej55.rest;

import jakarta.enterprise.context.RequestScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@RequestScoped
@Path("/ping")
public class Ping {
  
  @GET
  @Produces(MediaType.TEXT_PLAIN)
  public String getPing() {
    return "pong";
  }
}
