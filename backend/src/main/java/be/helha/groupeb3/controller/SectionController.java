package be.helha.groupeb3.controller;

import be.helha.groupeb3.entities.Section;
import be.helha.groupeb3.services.AuthService;
import be.helha.groupeb3.storage.GenericEJB;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Path("sections")
public class SectionController {

    @Inject
    private GenericEJB ejb;

    @Inject
    private AuthService authService;


    @POST
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    public String importSection(@QueryParam("token") String token, @FormParam("sections") String newSections) {
        if (authService.checkToken(token) == null) {
            return "null";
        }

        Type sectionsType= new TypeToken<ArrayList<Section>>(){}.getType();
        List<Section> sections = new Gson().fromJson(newSections, sectionsType);

        for (Section section: sections) {
            ejb.add(Section.class, section);
        }
        return new Gson().toJson(sections);
    }
}
