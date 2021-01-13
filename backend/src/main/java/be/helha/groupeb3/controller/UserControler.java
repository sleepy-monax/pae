package be.helha.groupeb3.controller;

import be.helha.groupeb3.ejb.UserEJB;
import be.helha.groupeb3.entities.Role;
import be.helha.groupeb3.entities.User;
import be.helha.groupeb3.services.AuthService;
import com.google.gson.Gson;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

@Path("users")
public class UserControler {

    @Context
    private UriInfo context;

    @Inject
    private UserEJB ejb;

    @Inject
    private AuthService authService;

    @GET
    @Produces("text/json")
    public String showAll(@QueryParam("token") String token) {
        User user = authService.checkToken(token);
        if (user == null) { return "null"; }
        if (user.getRole() != Role.DIRECTEUR) { return "null"; }
        return new Gson().toJson(ejb.findAll());
    }

    @POST
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    public String create(@QueryParam("token") String token, @FormParam("login") String login, @FormParam("password") String password) {
        User current = authService.checkToken(token);
        if (current == null) { return "null"; }
        if (current.getRole() != Role.DIRECTEUR) { return "null"; }
        User user = new User(login, password);
        return new Gson().toJson(ejb.add(user));
    }

    @PUT
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    public String update(@QueryParam("token") String token, @FormParam("id") int id, @FormParam("login") String login,
                         @FormParam("password") String password) {
        User current = authService.checkToken(token);
        if (current == null) { return "null"; }
        if (current.getRole() != Role.DIRECTEUR) { return "null"; }
        User oldU = ejb.findById(id);
        if (oldU == null) { return "null"; }
        User newU = new User(oldU.getId(), login, password);
        ejb.update(oldU, newU);
        return new Gson().toJson(newU);

    }

    @DELETE
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    @Path("/{id}")
    public String delete(@QueryParam("token") String token, @PathParam("id") int id) {
        User current = authService.checkToken(token);
        if (current == null) { return "null"; }
        if (current.getRole() != Role.DIRECTEUR) { return "null"; }
        User deleted = ejb.findById(id);
        if (deleted == null) { return "null"; }
        if (current.equals(deleted)) { return "null"; }
        ejb.remove(deleted);
        return new Gson().toJson(deleted);
    }

}
