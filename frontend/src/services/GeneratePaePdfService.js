import jsPDF from 'jspdf';
import html2PDF from 'jspdf-html2canvas';
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
        />
    );

   // document.getElementById('id').onclick 

    // Apply and save to pdf format
    // let pdf = new jsPDF("p", "px", "a4");
    // pdf.html(
    //     string, {
    //     callback: function (pdf) {
    //               pdf.save(filename);
    //             }
    //     }
    // );
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
                            <div classname="flex flex-1 max-w-sm gap-2 items-center" key={ueSection.id}>
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

//Test
// function PaeHtml(props) {
//     let student = props.student;
//     let section = props.section;

//     let paeStudent = [];
//     let ueHtml = [];
//     let aaHtml = [];

//     // Search for all blocs in section
//     section.blocs.forEach(bloc => {

//         // Search all ues in blocs
//         bloc.ues.forEach(ueSection => {

//             // Search all ues from the student ues
//             student.ues.forEach(ueStudent => {

//                 // Validate if the student has this ue in his PAE
//                 if (ueStudent.inPAE) {

//                     // Compare the current student's ue with the ue in the section
//                     if (ueStudent.ref === ueSection.id) {

//                         // Loop for all aas
//                         ueSection.aas.forEach(aa => {

//                             // Display aas in html
//                             aaHtml.push(
//                                 <h3 key={aa.id}>
//                                     {aa.id} - {aa.name} [{aa.credits}]
//                                 </h3>
//                             );
//                         });

//                         // Display all ues and aas that the student has
//                         ueHtml.push(
//                             <h2 key={ueSection.id}>
//                                 UE - {ueSection.id} :  {ueSection.name} credits: {ueSection.credits} {aaHtml}
//                             </h2>
//                         );
//                     }
//                 }
//                 aaHtml = [];
//             });
//         });
//     });

//     paeStudent.push(
//         <html><body id="id">
//             <h1>
//                 <center><b>{student.id} {student.lastname} {student.firstname}</b></center>
//             </h1>
//                 {ueHtml}
//         </body></html>
//     );
    
//     return paeStudent;
// }
