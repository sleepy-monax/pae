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

export function FindStudentsByBloc(bloc) {
    return new Promise((resolve, reject) => {
        FindAllStudent()
            .then((students) =>
                resolve(students.filter((student) => student.bloc === bloc))
            )
            .catch(reject);
    });
}

export function SendAllStudents(s) {
    students = s;
    return ApiUploadStudents(s);
}

export function UpdateStudent(s) {
    let index = students.findIndex((student) => student.id == s.id);
    console.log(index);
    students[index] = s;
    ApiUpdateStudent(s);
}
