import jsPDF from 'jspdf';
import { renderToString } from "react-dom/server";

/**
 * Generate PDF pae document
 */
export function GeneratePAE(student, section) {
    let filename = student.lastname + "_" + student.firstname + ".pdf";

    // Apply and save to pdf format
    let pdf = new jsPDF("p", "px", "a4");
    let yPos = 50;
    let xPos = 10;
    let text = student.id +" "+ student.lastname +" "+ student.firstname;
    let xOffset = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / 2);


    pdf.text("PAE de l'étudiant", xOffset, 20);
    pdf.text(text, xOffset, 30);

    section.blocs.forEach(bloc => {
        bloc.ues.forEach(ueSection => {
            student.ues.forEach(ueStudent => {
                if (ueStudent.inPAE) {
                    if (ueStudent.ref === ueSection.id) {
                        pdf.text("UE - "+ ueSection.id+" : " + ueSection.name + " credits: "+ ueSection.credits, xOffset, yPos);
                        yPos += 10;
                        ueSection.aas.forEach(aa => {
                            pdf.text(aa.id + " - " + aa.name + " " + "[" + aa.credits + "]", xOffset + xPos, yPos);
                            yPos += 10;
                        });
                        yPos += 10;
                    }
                }
            });
        });
    });

    pdf.save(filename);
}

/**
 * Display the student pae
 */
export function PAEDisplay(props) {
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
                                <div className="flex-1 m-3.5" key={aa.id}>
                                    {aa.id} - {aa.name} [{aa.credits}]
                                </div>
                            );
                        });

                        // Display all ues and aas that the student has
                        ueHtml.push(
                            <div className="flex-1 max-w-sm gap-2 items-center" key={ueSection.id}>
                                UE - {ueSection.id} :  {ueSection.name} credits: {ueSection.credits} {aaHtml}
                            </div>
                        );
                    }
                }
                aaHtml = [];
            });
        });
    });

    paeStudent.push(
        <div className="relative max-w-2xl mx-auto flex flex-col  gap-2">
            <b>{student.id} {student.lastname} {student.firstname}</b> {ueHtml}
        </div>
    );  
    
    return paeStudent;
}