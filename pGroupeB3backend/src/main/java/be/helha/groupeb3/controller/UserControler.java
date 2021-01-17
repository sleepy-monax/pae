package be.helha.groupeb3.controller;

import be.helha.groupeb3.entities.Role;
import be.helha.groupeb3.entities.User;
import be.helha.groupeb3.services.AuthService;
import be.helha.groupeb3.storage.GenericEJB;

import com.google.gson.Gson;

import at.favre.lib.crypto.bcrypt.BCrypt;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

@Path("users")
public class UserControler {

    @Context
    private UriInfo context;

    @Inject
    private GenericEJB ejb;

    @Inject
    private AuthService authService;

    @GET
    @Produces("text/json")
    public String showAll(@QueryParam("token") String token) {
        User user = authService.checkToken(token);

        if (user == null) {
            return "null";
        }

        if (user.getRole() != Role.DIRECTEUR) {
            return "null";
        }

        return new Gson().toJson(ejb.findAll(User.class));
    }

    @POST
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    public String create(@QueryParam("token") String token, @FormParam("login") String login,
            @FormParam("password") String password) {

        User current = authService.checkToken(token);

        if (current == null) {
            return "null";
        }

        if (current.getRole() != Role.DIRECTEUR) {
            return "null";
        }

        if (ejb.findFirstByField(User.class, "login", login) != null) {
        	return "null";
        }
        
        String hash = BCrypt.withDefaults().hashToString(BCrypt.MIN_COST, password.toCharArray());
        User user = new User(login, hash);

        return new Gson().toJson(ejb.add(User.class, user));
    }

    @PUT
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    public String update(@QueryParam("token") String token, @FormParam("id") int id, @FormParam("login") String login,
            @FormParam("password") String password) {

        User current = authService.checkToken(token);

        if (current == null) {
            return "null";
        }

        if (current.getRole() != Role.DIRECTEUR) {
            return "null";
        }

        User oldU = ejb.findById(User.class, id);

        if (oldU == null) {
            return "null";
        }

        String hash = BCrypt.withDefaults().hashToString(BCrypt.MIN_COST, password.toCharArray());
        User newU = new User(oldU.getId(), login, hash);

        ejb.update(User.class, oldU, newU);

        return new Gson().toJson(newU);

    }

    @DELETE
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    @Path("/{id}")
    public String delete(@QueryParam("token") String token, @PathParam("id") int id) {

        User current = authService.checkToken(token);

        if (current == null) {
            return "null";
        }

        if (current.getRole() != Role.DIRECTEUR) {
            return "null";
        }

        User deleted = ejb.findById(User.class, id);

        if (deleted == null) {
            return "null";
        }

        if (current.equals(deleted)) {
            return "null";
        }

        ejb.remove(User.class, deleted);

        return new Gson().toJson(deleted);
    }

    @GET
    @Produces("text/json")
    @Path("/{id}")
    public String findById(@QueryParam("token") String token, @PathParam("id") int id) {

        User current = authService.checkToken(token);

        if (current == null) {
            return "null";
        }

        if (current.getRole() != Role.DIRECTEUR) {
            return "null";
        }

        User selected = ejb.findById(User.class, id);

        if (selected == null) {
            return "null";
        }

        return new Gson().toJson(selected);
    }

    @GET
    @Produces("text/json")
    @Path("/isadmin")
    public String isAdmin(@QueryParam("token") String token) {
        User current = authService.checkToken(token);
        if (current == null) {
            return "null";
        }
        if (current.getRole() == Role.DIRECTEUR) {
            return "true";
        }
        return "false";
    }

}
