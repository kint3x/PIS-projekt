package cz.vut.fit.pis.xmatej55.init;

import jakarta.annotation.PostConstruct;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.inject.Inject;

@Startup
@Singleton
public class AppInitializer {

    @Inject
    private DataSeeder dataSeeder;

    @PostConstruct
    public void init() {
        dataSeeder.seedData();
    }
}