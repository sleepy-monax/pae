import {
    StudentHasValidatedBloc,
    StudentValidatedCreditsBloc,
} from "../model/Student";
import {
    ApiDownloadStudents,
    ApiUpdateStudent,
    ApiUploadStudents,
} from "./ApiService";

let students = undefined;

export function FindAllStudent() {
    return new Promise((resolve, reject) => {
        if (students) {
            resolve(students);
        }

        ApiDownloadStudents()
            .then((remote_students) => {
                students = remote_students;
                resolve(remote_students);
            })
            .catch(reject);
    });
}

export function FindStudentById(id) {
    return new Promise((resolve, reject) => {
        FindAllStudent()
            .then((students) => {
                resolve(students.filter((student) => student.id === id)[0]);
            })
            .catch(reject);
    });
}

function ExtractSection(bloc) {
    return bloc[0] + bloc[1];
}

function ExtractBlockNumber(bloc) {
    return parseInt(bloc[2]);
}

export function FindStudentsByBloc(bloc) {
    return new Promise((resolve, reject) => {
        FindAllStudent()
            .then((students) =>
                resolve(
                    students.filter((student) => {
                        return GetBlocForStudent(student) === bloc;
                    })
                )
            )
            .catch(reject);
    });
}

export function GetBlocForStudent(student) {
    let blocNumber = ExtractBlockNumber(student.bloc);
    let sectionId = ExtractSection(student.bloc);

    if (StudentHasValidatedBloc(student, student.bloc)) {
        if (blocNumber + 1 > 3) {
            console.log("wat");
            return sectionId + "-fini";
        } else {
            return sectionId + (blocNumber + 1);
        }
    } else {
        return student.bloc;
    }
}

export function SendAllStudents(s) {
    students = s;
    return ApiUploadStudents(s);
}

export function UpdateStudent(s) {
    let index = students.findIndex((student) => student.id === s.id);
    students[index] = s;
    ApiUpdateStudent(s);
}
