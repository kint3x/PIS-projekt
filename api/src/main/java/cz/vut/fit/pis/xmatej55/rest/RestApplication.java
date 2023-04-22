package cz.vut.fit.pis.xmatej55.rest;

import jakarta.annotation.security.DeclareRoles;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
@DeclareRoles({ "owner", "manager", "worker" })
public class RestApplication extends Application {

}