package be.helha.groupeb3.controller;

import be.helha.groupeb3.entities.Student;
import be.helha.groupeb3.entities.User;
import be.helha.groupeb3.services.AuthService;
import be.helha.groupeb3.storage.GenericEJB;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Path("students")
public class StudentController {

    @Inject
    private GenericEJB ejb;

    @Inject
    private AuthService authService;

    @POST
    @Produces("text/json")
    @Consumes("application/x-www-form-urlencoded")
    public String importStudents(@QueryParam("token") String token, @FormParam("students") String newStudents) {

        if (authService.checkToken(token) == null) {
            return "null";
        }

        Type studentsType = new TypeToken<ArrayList<Student>>() {
        }.getType();
        List<Student> students = new Gson().fromJson(newStudents, studentsType);

        for (Student student : students) {
            ejb.addFastAndUnsafe(Student.class, student);
        }

        return new Gson().toJson(students);
    }

    @GET
    @Produces("text/json")
    public String sendStudents(@QueryParam("token") String token) {
        if (authService.checkToken(token) == null) {
            return "null";
        }

        List<Student> students = ejb.findAll(Student.class);

        if (students.isEmpty()) {
            return "null";
        }

        return new Gson().toJson(students);
    }
}
