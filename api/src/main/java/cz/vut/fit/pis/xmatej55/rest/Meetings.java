package cz.vut.fit.pis.xmatej55.rest;

import java.net.URI;
import java.util.Optional;

import cz.vut.fit.pis.xmatej55.dto.EmployeeDTO;
import cz.vut.fit.pis.xmatej55.dto.Error;
import cz.vut.fit.pis.xmatej55.entities.Employee;
import cz.vut.fit.pis.xmatej55.entities.Meeting;
import cz.vut.fit.pis.xmatej55.services.ClientService;
import cz.vut.fit.pis.xmatej55.services.EmployeeService;
import cz.vut.fit.pis.xmatej55.services.MeetingService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.OPTIONS;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.core.Response.Status;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Path("/meetings")
@ApplicationScoped
public class Meetings {
    @Inject
    private MeetingService meetingService;

    @Inject
    private EmployeeService employeeService;

    @Inject
    private ClientService clientService;

    @Context
    private UriInfo context;

    public Meetings() {

    }

    @OPTIONS
    public Response options() {
        return Response.ok("").build();
    }

    @OPTIONS
    @Path("{var:.+}")
    public Response options(@PathParam("id") Long id) {
        return Response.ok("").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all meetings")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of all meetings", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) })
    })
    public Response getMeetings() {
        return Response.ok(meetingService.findAll()).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get a meeting by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meeting found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "404", description = "Meeting not found", content = @Content)
    })
    public Response getMeetingById(@PathParam("id") Long id) {
        Optional<Meeting> m = meetingService.findById(id);

        if (!m.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Meeting with id '%d' not found.", id))).build();
        }

        return Response.ok(m.get()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Create a new meeting")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Meeting created", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    public Response createMeeting(cz.vut.fit.pis.xmatej55.dto.MeetingDTO meetingDTO) {
        Meeting m = new Meeting();

        m.setAuthor(employeeService.findById(meetingDTO.getAuthorId()).get());
        m.setClient(clientService.findById(meetingDTO.getClientId()).get());

        for (long id : meetingDTO.getEmployeeIds()) {
            m.addEmployee(employeeService.findById(id).get());
        }

        m.setEnd(meetingDTO.getEnd());
        m.setNotes(meetingDTO.getNotes());
        m.setStart(meetingDTO.getStart());
        m.setSubject(meetingDTO.getSubject());

        Meeting savedMeeting = meetingService.create(m);
        final URI uri = UriBuilder.fromPath("/meetings/{resourceServerId}").build(savedMeeting.getId());

        return Response.created(uri).entity(savedMeeting).build();
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove a meeting by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meeting removed", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "404", description = "Meeting not found", content = @Content)
    })
    public Response removeMeeting(@PathParam("id") Long id) {
        Optional<Meeting> m = meetingService.findById(id);

        if (!m.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Meeting with id '%d' not found.", id))).build();
        }

        meetingService.deleteById(m.get().getId());
        return Response.ok().build();
    }

    @Path("/{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Update a meeting by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meeting updated", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "404", description = "Meeting not found", content = @Content)
    })
    public Response updateEmployee(@PathParam("id") Long id, cz.vut.fit.pis.xmatej55.dto.MeetingDTO meetingDTO) {
        Optional<Meeting> old = meetingService.findById(id);

        if (!old.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Meeting with id '%d' not found.", id))).build();
        }

        Meeting oldMeeting = old.get();

        oldMeeting.setEnd(meetingDTO.getEnd());
        oldMeeting.setStart(meetingDTO.getStart());
        oldMeeting.setNotes(meetingDTO.getNotes());
        oldMeeting.setSubject(meetingDTO.getSubject());

        return Response.ok(meetingService.update(oldMeeting)).build();
    }

    @Path("/{id}/add_employee")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Add an employee to a meeting by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee added", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "404", description = "Meeting or employee not found", content = @Content)
    })
    public Response addEmployee(@PathParam("id") Long id, EmployeeDTO employeeDTO) {
        Optional<Meeting> optMeeting = meetingService.findById(id);

        if (!optMeeting.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Meeting with id '%d' not found.", id))).build();
        }

        Optional<Employee> optEmployee = employeeService.findById(employeeDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", id))).build();
        }

        Employee employee = optEmployee.get();
        Meeting meeting = optMeeting.get();

        meeting.addEmployee(employee);

        return Response.ok(meetingService.update(meeting)).build();
    }

    @Path("/{id}/remove_employee")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Remove an employee from a meeting by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee removed", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Meeting.class)) }),
            @ApiResponse(responseCode = "404", description = "Meeting or employee not found", content = @Content)
    })
    public Response removeEmployee(@PathParam("id") Long id, EmployeeDTO employeeDTO) {
        Optional<Meeting> optMeeting = meetingService.findById(id);

        if (!optMeeting.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Meeting with id '%d' not found.", id))).build();
        }

        Optional<Employee> optEmployee = employeeService.findById(employeeDTO.getEmployeeId());

        if (!optEmployee.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity(new Error(String.format("Employee with id '%d' not found.", employeeDTO.getEmployeeId())))
                    .build();
        }

        Employee employee = optEmployee.get();
        Meeting meeting = optMeeting.get();

        meeting.removeEmployee(employee);

        return Response.ok(meetingService.update(meeting)).build();
    }
}
