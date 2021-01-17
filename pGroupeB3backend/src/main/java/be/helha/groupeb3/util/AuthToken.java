package be.helha.groupeb3.util;

import be.helha.groupeb3.entities.User;

import java.io.Serializable;
import java.util.Date;

public class AuthToken implements Serializable {

    private User user;
    private Date expiration;

    public AuthToken() {
    }

    public AuthToken(User user, Date expiration) {
        this.user = user;
        this.expiration = expiration;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    @Override
    public String toString() {
        return "AuthToken{" +
                "user=" + user +
                ", expiration=" + expiration +
                '}';
    }
}
