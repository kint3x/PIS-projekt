# CRM System
Project for the [PIS](https://www.fit.vut.cz/study/course/PIS/.cs) course at BUT FIT.

# Developing the application

First make sure `docker` service is running. Then enter the following command to create and start the containers in development mode.

```
docker compose up
```

Check if everything works properly by going to http://localhost:3000 (UI) and http://localhost:9080/crm/api/ping (API).

# Building the application
**TODO:** Create a docker-compose file for building the application (both api and app).