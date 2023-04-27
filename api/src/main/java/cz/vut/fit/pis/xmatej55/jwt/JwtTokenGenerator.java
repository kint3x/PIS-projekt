package cz.vut.fit.pis.xmatej55.jwt;

import static com.nimbusds.jose.JOSEObjectType.JWT;
import static com.nimbusds.jose.JWSAlgorithm.RS256;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.eclipse.microprofile.jwt.Claims;

import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import cz.vut.fit.pis.xmatej55.entities.Employee;

public class JwtTokenGenerator {

    public static String generateJWTString(Employee employee)
            throws Exception {
        long currentTimeMillis = System.currentTimeMillis();
        long expirationTimeMillis = currentTimeMillis + (120 * 60 * 1000); // + 2 hours

        List<String> groups = new ArrayList<>();
        switch (employee.getType()) {
            case Owner:
                groups.add("owner");
            case Manager:
                groups.add("manager");
            case Worker:
                groups.add("worker");
                break;
        }

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .issuer("fit_pis_prj")
                .issueTime(new Date(currentTimeMillis))
                .expirationTime(new Date(expirationTimeMillis))
                .subject(employee.getUsername())
                .claim(Claims.upn.name(), employee.getUsername())
                .claim(Claims.groups.name(), groups)
                .claim("employee_id", employee.getId())
                .build();

        String privateKeyPath = "/privateKey.pem";
        SignedJWT signedJWT = new SignedJWT(new JWSHeader.Builder(RS256)
                .keyID(privateKeyPath)
                .type(JWT)
                .build(), claimsSet);

        signedJWT.sign(new RSASSASigner(readPrivateKey(privateKeyPath)));

        return signedJWT.serialize();
    }

    public static PrivateKey readPrivateKey(String resourceName) throws Exception {
        byte[] byteBuffer = new byte[16384];
        int length = Thread.currentThread().getContextClassLoader()
                .getResource(resourceName)
                .openStream()
                .read(byteBuffer);

        String key = new String(byteBuffer, 0, length).replaceAll("-----BEGIN (.*)-----", "")
                .replaceAll("-----END (.*)----", "")
                .replaceAll("\r\n", "")
                .replaceAll("\n", "")
                .trim();

        return KeyFactory.getInstance("RSA")
                .generatePrivate(new PKCS8EncodedKeySpec(Base64.getDecoder().decode(key)));
    }

}