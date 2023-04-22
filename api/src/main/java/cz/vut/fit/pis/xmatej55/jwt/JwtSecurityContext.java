package cz.vut.fit.pis.xmatej55.jwt;

import jakarta.ws.rs.core.SecurityContext;

import java.security.Principal;

public class JwtSecurityContext implements SecurityContext {

    private final JwtUser user;
    private final SecurityContext originalSecurityContext;

    public JwtSecurityContext(JwtUser user, SecurityContext originalSecurityContext) {
        this.user = user;
        this.originalSecurityContext = originalSecurityContext;
    }

    @Override
    public Principal getUserPrincipal() {
        return user;
    }

    @Override
    public boolean isUserInRole(String role) {
        return user.getRoles().contains(role);
    }

    @Override
    public boolean isSecure() {
        return originalSecurityContext.isSecure();
    }

    @Override
    public String getAuthenticationScheme() {
        return "Bearer";
    }
}