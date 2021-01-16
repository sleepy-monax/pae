import jsPDF from 'jspdf';
import { renderToString } from "react-dom/server";

/**
 * Generate PDF pae document
 */
export function GeneratePAE(student, section) {
    let filename = student.lastname + "_" + student.firstname + ".pdf";

    // Convert html into string
    let string = renderToString(
        <PAEDisplay
            student={student}
            section={section}
            paeStudent={""}
            ueHtml={""}
            ueSection={""}
        />
    );

    // Apply and save to pdf format
    let pdf = new jsPDF();
    pdf.html(string, {
        callback: function (pdf) {
                  pdf.save(filename);
                }
        }
    );
}

/**
 * Display the student pae
 */
function PAEDisplay(props) {
    let student = props.student;
    let section = props.section;

    let paeStudent = [];
    let ueHtml = [];
    let aaHtml = [];

    // Search for all blocs in section
    section.blocs.forEach(bloc => {

        // Search all ues in blocs
        bloc.ues.forEach(ueSection => {

            // Search all ues from the student ues
            student.ues.forEach(ueStudent => {

                // Validate if the student has this ue in his PAE
                if (ueStudent.inPAE) {

                    // Compare the current student's ue with the ue in the section
                    if (ueStudent.ref === ueSection.id) {

                        // Loop for all aas
                        ueSection.aas.forEach(aa => {

                            // Display aas in html
                            aaHtml.push(
                                <div key={aa.id}>
                                    {aa.name}
                                </div>
                            );
                        });

                        // Display all ues and aas that the student has
                        ueHtml.push(
                            <div className="flex-1" key={ueSection.id}>
                                {ueSection.name} {aaHtml}
                            </div>
                        );
                    }
                } 
            });
        });
    });

    paeStudent.push(
        <div className="flex items-center gap-4">
            {student.id} {student.lastname} {student.firstname} {ueHtml}
        </div>
    );
    
    return paeStudent;
}