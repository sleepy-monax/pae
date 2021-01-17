package be.helha.groupeb3.services;

import be.helha.groupeb3.entities.User;
import be.helha.groupeb3.storage.GenericEJB;
import be.helha.groupeb3.util.AuthToken;
import be.helha.groupeb3.util.Cryptage;
import com.google.gson.Gson;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Date;

@Stateless
public class AuthService {

    @Inject
    private GenericEJB ejb;

    public User checkToken(String tokenString) {
        AuthToken token = new Gson().fromJson(Cryptage.decrypt(tokenString), AuthToken.class);
        if (token == null) {
            return null;
        }

        Date date = new Date();
        if (token.getExpiration().getTime() < date.getTime()) {
            return null;
        }

        User user = ejb.findFirstByField(User.class, "login", token.getUser().getLogin());
        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(token.getUser().getPassword())) {
            return null;
        }

        return user;
    }
}
