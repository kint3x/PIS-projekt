package cz.vut.fit.pis.xmatej55.jwt;

import com.nimbusds.jwt.JWTClaimsSet;

import java.security.Principal;
import java.text.ParseException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class JwtUser implements Principal {
    private final String username;
    private final Set<String> roles;

    public JwtUser(JWTClaimsSet claimsSet) {
        this.username = claimsSet.getSubject();
        Set<String> roles = new HashSet<>();
        try {
            roles.addAll(claimsSet.getStringListClaim("groups"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        this.roles = Collections.unmodifiableSet(roles);
    }

    @Override
    public String getName() {
        return username;
    }

    public Set<String> getRoles() {
        return Collections.unmodifiableSet(roles);
    }
}
