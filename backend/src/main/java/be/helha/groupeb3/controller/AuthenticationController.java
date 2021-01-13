package be.helha.groupeb3.controller;

import at.favre.lib.crypto.bcrypt.BCrypt;
import be.helha.groupeb3.ejb.UserEJB;
import be.helha.groupeb3.entities.User;
import be.helha.groupeb3.util.AuthToken;
import be.helha.groupeb3.util.Cryptage;
import com.google.gson.Gson;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import java.util.Calendar;
import java.util.Date;

@Path("authentication")
public class AuthenticationController {

    @Context
    private UriInfo context;

    @Inject
    private UserEJB ejb;

    public AuthenticationController() {
    }

    @POST
    @Produces("text/json")
    public String authentication(@FormParam("login") String login, @FormParam("password") String password) {
        User user = ejb.findByName(login);
        if (user == null) return "null";
        if (!BCrypt.verifyer().verify(password.toCharArray(), user.getPassword().toCharArray()).verified) { return "null"; }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MONTH, 1);
        AuthToken token = new AuthToken(user, calendar.getTime());

        String json = new Gson().toJson(token);
        return Cryptage.encrypt(json);
    }
}
