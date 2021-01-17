import { mdiEmail, mdiFormatListChecks, mdiPrinter } from '@mdi/js';
import React from 'react';
import Header from '../components/Hearder';
import Button from "../components/Button";
import Loading from '../components/Loading';
import { OutlineWhite } from "../components/Styles";
import { FindSectionById } from '../services/SectionService';
import { FindStudentById } from '../services/StudentsService';
import { GeneratePAE } from '../services/GeneratePaePdfService';


export default class FeedBackPae extends React.Component{

    constructor(props) {
        super(props);   
        this.state = {
            student: undefined,
            section: undefined
        }
    }

    componentDidMount() {
        const id = this.props.match.params.studentId;
        FindStudentById(id)
            .then(student => {
                this.setState({
                    student: student
                });
                FindSectionById(student.bloc.substr(0, 2))
                    .then(section => {
                        this.setState({
                            section: section
                        })
                    });
            });
    }

    /**
     * Display all ues that the student has in his pae
     */
    displayUEInPae() {
        let ueHtml = [];
        let aaHtml = [];

        // Search for all blocs in section
        this.state.section.blocs.forEach(bloc => {

            // Search all ues in blocs
            bloc.ues.forEach(ueSection => {

                // Search all ues from the student ues
                this.state.student.ues.forEach(ueStudent => {

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
                    aaHtml = [];
                });
            });
        });
        return ueHtml;
    }
    
    render() {
        if (this.state.student === undefined || this.state.section===undefined) {
            return <Loading/>
        }
        return (
            <div>
                <Header
                    icon={mdiFormatListChecks}
                    title={this.state.student.firstname + " " + this.state.student.lastname}
                    description={
                        "Bachelier en " +
                        this.state.section.name.toLowerCase() +
                        " · " +
                        this.state.student.bloc.toUpperCase()
                    }
                >
                    <Button
                        variante={OutlineWhite}
                        text="Imprimer"
                        icon={mdiPrinter}
                        onClick={() => GeneratePAE(this.state.student, this.state.section)}
                    />
                    <Button
                        variante={OutlineWhite}
                        text="Envoyer"
                        icon={mdiEmail}
                    />
                </Header>

                {/* Display all ues et aas */}
                <div className="pl-10 flex gap-2 flex-col">{this.displayUEInPae()}</div>
            </div>
        );
    }
}