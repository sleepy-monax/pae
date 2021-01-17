import jsPDF from "jspdf";
import { BlocFindAA, BlocFindUE } from "../model/Bloc";
import { StudentHasValidatedAA, StudentPAECredits } from "../model/Student";

/**
 * Generate all PAE of all students
 */
export function GenerateAllPAE(students, section, bloc) {
    students.forEach((student) => {
        if (student.paeDone) {
            GeneratePAE(student, section);
        }
    });
}

let IMAGE =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAABFCAYAAAAYVDlRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAVaUlEQVR42u2da3QcxZWASzZ+YowxYIgxtgATjDDB3iHYo8eo6vbMSN11uzUaqerWSJgIyCokh5CslyyHhCUiYN6xscaOLAkIMSEsJgeWDYQDJDi8lg0kvBdsYOMQSEKAxAlgXgHP/ugZa6znyHp4TPqec3/MnOmumq77dd1768UYY4xt2jSZdbcvZ13pdtaV/hXrSr+wm3a2b2SjJRdccDxbv+axPmX00fbvDniPztZJbMO6COtMX8+6008Mfa9R15/2qdP69YezrvanWVf6ZdaV3sa61r3GutO/Z53p/2Yb1q1k3dccxvaSlJWpyQLpJAvpu0LS44D0Qi8dtfYNcTyE2+qxfsrYTYXUN7Cik872M1h3+g3Wlc4MoJtHray2by5h61ZvH6SsnN48IARd6y5i3em3C7jHWOkLferV3T6PdaXfH/CaDe1Ps870iXujeQHpdHD1nwAp059aSKPWvp/nzuHcadw+UFm71NU/Ly4IuteGWFf63SEavnhA6F7fyLrSO/ciBHsGgq8/ZZ2XHziezSukCoHU7w5mlAEIjDHWme4soOGLA4RNbZNZV/rBvQzBnoPQve4j1rU6Op7Na0naMJRRBiAwxtj3rnl+nwHh2mtns8721/ZZEHwYrhzP5uWOfj4AoRBZc8W2fQaEjo45rKv9zX0ahM70jePZvFXx+m0BCAEIRQjC2psCEAIQAhA60zcEIAQgjA8IV69Ks+vby8ZM169euMcgdK37fgBCAML4gLDqorbxT0MHIIwnCEqpiZaVONiSTUdHJB0fl7TYqmsu4zWnLgQ47QjO1YwAhACETyUI5U5ygZDUCkibBNKLgOZ1QNoOkt61UO8ASe8K1G8D0puA9BpI/ZSF5jpwTUtFVM0PQAhA2GdBWLjQnhLzzMkW0g8F0idD3ndg/Vggba6WpMJhNS0AIQBhnwFBKTVRIH0DUL8xAgB66ycC6T5uN88LQAhAKHoQQqHWSSDNjSPsBQZUIen5apc+H4AQgFDUIAikK4XUO8cCgl0q6ZkqWx0agBCAUJQggKNTgPT+mELQA0OaZTIlAQgBCEUFQo1Ss0HSw+MCAVLGkvrPUVwxv1AQXmdd6fWjoh1rby7MYEYAwuWXXMza2iaPWDepif8IIADS60LS+lFRR/0AZAFv8wFAEKgdgfTh0D6+3gmS7rccfSkgnS4kJUGSAqSzBep1gPRUwfGF16gKBWFv6J6D0Jl+i3WlXxm5rrtw1EHobL+uCEEYfx0IBFevKsCdeV9I+qrneQf0d49MJlMSVepACw0B0rtD14Uu+3SCMFra2b5h1EHoTncEIPQPgm3bU4Q0N4CkbYOqq7/OWKakkP8Prjl3qLpUxRL3BCAEIBRVjzDaYkkthqrLsurazQEIg2t7AMK+DELbBEBzcQDCSLV7bWsAwr4JAud8KrjmXHD1WwEII9M/sY6O0gCEogehJBxW08I1ajZPNs+znFStQLMWUL9aaF0CEAbWd1lX2h6TcYQAhBGBwHnLLIF0kkDVJFy60EL9H4D0dNbwP9iTugwHhB2sq/2V0dH06wVuxzL+IHSm/8q60vewjrX1/mjjPwoIegcgvTJK+nsoZGrEMEAIh9U04SkJktJC0pOAtGM0oRwOCJtZR8ecUdHLLo6z7615e0xBuHLVOtbRUTpsvX79kWzjxv3HdGS5CEGwkDaX19fPGQ1dVut9jjuNb48GCKHW1kkC9TmA9HQhg2zjA0IwxeJTDUKRTborsVCFhb895Ji7aQEIAQhFCYLwKAn+SrMRGrn+ANA8MtQEvgCEAISiA8FKqLBw6XcjmE36rkD9kIX0NbDpGPBSnwOkdwIQig6EdWsDEPoHIRRqnQRINw1rgQ3Se4D6FwL1dwQaq/cyTI6pRQEIxQhCV/qaAIT+QRC16jiroIyQfk9I9RNwU4CI0wdNtwYgBCDscyBIfUYBEGwXnpKMsYLS21FHnQguvReAEICwz4AA0lxVgDt02XDqY0lTNdS6hACEAITiAgHNbUNlgaJew9JhgYC0cqi6lEfdnwUgBCAUDQjllvvzIa77S6TOHFloXZRSE4WrC1n2eXsAQgBC0YBQXdtw3xA9wtu8Ri0stC7cJSxwRPpTCsJVqy5nq1fPHjPt7DxwBCB0jFm9Nm2auC+DwKW6dYjrdgpJyULqIdzUCf62kAUs4Ef6YbAt/HhvCz+mumbJvh0j0GVDjhu4eovdZ5e6HqnwvAOsOh0FNH8YxiDc9wMQAhCKBoTsYvtCDPd/Qaovxx2zLCLpeKtOlQlbVwDqswD1bcOeoOfojgCEAITi6RFsOgaQhjPH6B1Aeh2Q3hzR7FSX1gQgBCAUT4zA+X6AdPN4LxKy0FwagBCAUFST7vzVZ7R9fGHQ3w5ACEAotmnYJYDqbJD6r+MIwgUBCAEIRbcegXO+n5CqVSD9ZZxco/MDEAIQivWgkBIuaXH2mKg9CYR3CqRnLY9Wghx820eB6huMtV+9inW2bxhUu9u/OWogXHXVHLZ+9dVDltm59ot9rl2zZhbrSl8x9LVjrWv7jlx3dh7CutLte7VeHWtK+4BgN64SDm0YVKUZtfatrJQHcdl49VBlgtTnFnrP2lpTyl31LX+3CtoOaN7PHgX1iZD0kYV6h0DaLqT5g4X0IKD5dsRuWMpYpgQgdRhI8yMh6T8HUgt1ggUSyL4ioVBoUhjVEVHPLAVpyoWnKwCbTuGSFvNaUzrU2oRAAgkkkEACCSSQQAIJJJBAAgnk0yac8/3CNWo2K3DBdiCBfCpFSEoKl65ta2ubEDyNQP4hJRTC6SDpLktqMdJ7hcNqGud8v+CpBtJHKqJqflmZmpz/nWUlDq6pOXP23gUgNInXqIUgTblw6SsRbDi255T0PXOvONL1FqbCw73WttWhFd4ZB+zttqp0Ep+FuobyYrAbpdTkiLviKHCaFuRc1ra2tgk8mZzHa9TC+IoVBe0qXhV1GwDp9sp43Tl71/92Gl8oPbZsSf53gPoCgfo7o3D7Etu2p+xRvbBhESB9DJKeyGlYyH8fCQiA+lbwUrFhG2AsscFy6Ut72/jC4J4L0txYDCAAqlMA6W+A5lXOW6YyxhhXaoZA8xAgZUSdrinohVce/apA+rAi5l07rnafbJ5XbSfsEMdDxhwESDYtAGlu3BN3hGPDInBp22gG3Ps6CKckTjvYTibnfZpA4AlTKqTx/LlB41h/l7ZUO43bP89jSwoGIRRqncQTagnYFAdUR/Q22LwgtsSSyaPDYTVtmd08M7u99zNCqlD+dZUOfdaSTdHe9xouCBWo5gNSPGY3V+S5dxOsOlUGnopxu8do+gMhhDido6qMoqrs7R4WCkKotXUSR1UJtoJltj0z/3vLSXw2/yUgak89buGyZTPL4yvmAKQO2+3/2sl5NX5mjAGkDgNXQcxurgirnk1tK2XTQblnFo2qAyut5NFhpaaBq4A7aslQL5wQ4vSoS3VRN6Uj2HBszqVZZjfPBEdHANUpZZzPiHpGCielq5LJz4wGCLzWlIKtXXDMCoHGCuXNCYqimh+3FYhadRxjjEXi6qi4rSAMeAT31EJuU7MldTQcDk/Lc8smRm2zVKBpsiSZqG2W9rRzy1Th6QoLVTj3PLijDo/bCiJxdVRNjZodRcNB0p+5VDuqa5NfidsKhgQBEacD6juEpPssNDcA0gvgKtgVT0h6olI2HbTL2FzaKNxUNXeTywXSfYD0V4HmDkvqLzDGSjjqswDpMX9JnnmuWpqqPQEBkE4HpJeF1HeBpIf/6RSrKlv+GsulJwDpB4D0tOWaMxljJb1B4ImWWRbS7RaaO/3G07cO5MYNBIJlJQ4W0twNSPeApFtA0lNCqhBjjMXj9XMq43X3l5YumZX3XO84sRwiwjMeIHXnQ2qhvi5mq2qBxhJITwqkmwTSfZY0d+cg5TL1BcszlzLGGEhTLiT9RCBtBknfB6SnQNIlAz2vSJ05EqR5WCB9KKTeCa75E0h9KmO5tcL6JUB61kJ9p+UfJfV3QHqBY+qQkYAAno4A6ldA0t+z27F8BC49XB6vn8MYY1HPnOHPHjVrs/bUaqHeAY7uAtS/BaSPwaX3QJrVeW1/pUD9tj/7VO8EV79loT4/Z/SA+hVA/VJlpTzIzzr6ZSwH+3KB2gGk7SJ7vJVA+tBCvYMJqbdWcGyOunp5ToWkDTkQypSaDNKUZ7JnigmpPEB9f64XAKT/yz2snLFxJ1XrNxwtFqgfypFpyeTRgPRUzGk4mTHGwFEtgOY21s/4gB8jmFfz65V7G1p1zWXg6pe4o5b0BLT2FOE0LAOkZzj6fp9wzDIL6TeA6ojeIFiovgZoNi207SnZ7cgfBFT1wwFBSLoIpL6xp7s1LeDSAzkQIvHE47uB4Oh7l1aJ6oirjgI0v8wF/+ClDgNX/xyc5IKIpOPB83sLf4GK+ZklddR/1uYsf6F51hBdeqcaVdgvzxwJLm3rL8WMiNOzYH3IUTUK2RQCpK2AentNjZpdumhRaaQmsQ2QdlpS35mdw781O1//9MFBoL+BpEsAdZuF+lLfCHtAEG7DCcKlay1pqqBGnSJceji7Lcu/ZO3ni345piP/s0D6ECRdApLWCGk+AqSPo1F1IGOMCaSVwqGVVl1zmYVNzdkz4D7iPDHLB4HeBKTfh3M9LJqzACmzLGJfA6iOEI7WgLSdS7WD243nWZIMA6Q/crvhcZD63pwKpOf7ixE45/tZMnm0QP1oKOR3b8MCAalZSH1LzvDBaVoAUv+ySvXNBmWD5Z359YqgdrL+3bdAUp/DwAXSFYDm4l1ftLVNANR3gKNTfUGgzdxRtbve7qjPiQ7wRu0PBB8e/UuR8HsA//8nZgHSa8uW2TMHAyEeX7E/uHR7LiXMpY4C6tvZ7kZcstC2pwipV0eRTusNAvfMyZZLj+f/HlD/NqpUn83HorZZmjWOx3b9X1ev9Q3ONOWBkIl5Zi5jjAm78TuAlLFcvWoIEDKA9D5IX3Mb7vaKEUriK1bsH0U1v9rR52evuX4wECxX373LbUP9FCBlIrL++J5btk0oj9fPqUwmj+ZSPw9ImVDEOXEoEPJ6lT8OK0ZQSk0EVPWAtBGQ7gKknwmpn8z5ecMBQaD+N5D0K+Goa4SjrgHU3YB6S03NqQuH4xqB1D8Cqb7cK503kUvaxJGad3NfkK7gTuO3e4MgkH4HSBt76mLusSRdWygIPJGYVV2bfLaqZjc/usSS9CKXtHgwEHY9Y5cu9HsE0wau/jpjjNXUqNkCzfmA+jZAcweg2QquaukPhN6rvEDSNp5IzOrbcynpuyXqD+DQPeDQPdn/n7FcujAfhJwbVhmrOy+71cllQ4CwHTwd4a5eDl5TREj6Ve8eAVy9BiQ9KZB+A0hvZAG8adAeQdKGrE1NFUiPAlKmylZljLEJFuqEQH0HuLTFv6f5CJAypceWLRkzEEStrrGQHo27KeB2cl55LLGE2w2P7gkIIM15IPUt3NaJnArUTq7LKxwEulk4Def0B0KkRjUVAgJI2iYcfU5+XQDVKcMBQSA9F4t5c3crT5oXo446cUgQPB2xUP/Ytu0pFtJ9Ik4nZeu1CSRdIrxTj4vFvLkCzdqRgsBdqgOkDHcaX7Sk+Wa+RtHwkYEwcIzAlZoBSD+1kD4UqM/nmFpUHkusLASE3OfeIICjI34Mo7dYnhY8YUojdvLhQUGQ9OWRgyBpA0j9r/nZDYGUD8LLORBs254Crr534B7BNPnb640sfQrSnGehvrV3bAHSXJ4fMPrui7mtP9eIS30/uM0FHSreLwi8ZSq49AR3zMm7yvdShwHSK5yrGfF4/ZxIbf2vcyAopaaBpAdyIHClZoBLD0TRcIH0KGOsJOaZuYD0x4V5QbtAs26kIEQcdSIg7bCQtuZnlpRSExljbKxAiKKaL6T5SKDekhtgyxnlnoKwnMtvAVJGOH6MwTmfCqi35ECwEomDAekNIfUbPN6wiDFWIpCu6Q8E7qi/DQeECwFpI+ctU5lSE8GlywD1M4it07Pd7uPc1sv9VJjhgPod7hL6xpxaZCE9xpWa4TfeqQtB0pOW1yQymUwJU2pifoqzPxA45/vlNNdwwlPHAdLWqKt17nvO1QwLVRiQngWbjmGMsZjXXAFIWzmmDunTIyCdDa65ifOWWbkMULzez2T0B4KQ9JX8umQzHBdyh64PhUKT/DqbswTqh3IuDiA9HXOalmQN2hJIf6nkMppnuGnhmrvB8Y0tGlUHgqSXQfqjxxUxMxdQbwHXjAgEpdRkkPpGQNppobnOclSthaYRUN08liBwOzkPJG0DqXcIVE1RNBa45oUR9QiuafHjEPNINhmyEiR9DEiZk04OL81uEvY0IP1duPQTkOZyQH/xfi8QnhNIn4Ckq8Ez/zwkCFnCnhFSPQ5IvxZo1gLSg3Y2Z54l/C1A/Qsu9b0C9V3gkfIDHXumQP0kuOYJC9XKrH9/qoX0G3DpAYH0FEh9+SAjy5n8U90tqe/c5YI4qVrLT8ttBaSXALXLGCsBx7RZSM9bSJuzadTT+xtH8DzvAIH0Y5C0DVD/Qkh6Lhzvf/pCZSyxIesP76pLLObNDSs1zffl6TlAekSgfohjalFeLPN1QHpZIG0GV99S7TQ+Uu3X03/bu1oDmvd5rarsCWLNmYD0um9Q5n8AqRuQzh4JCIz5m+Nmd5H7OG8Hh5daW1snjRUI/ouWvpTN6nwsXPqd5dIGQNoJqG/bExA4b5lqobkz+z8+ANT/JfzPmSj6zzHq6Iaes9j0q9W2uhCQMlyqdM+MCvqSfz1lLKQPmKhVx33mM6HdFj1XyqaD4vEVc/JSkzMBVb3wdAXnLVN5wpTm3JJMJlNioQpbaBqrbHVolW0fmn9txFVHVTupFPd6AmJINi2olqTAToFlnXZw//N77ClxSYvzVXj+oEtOYp6ZKxytuWyK5g3SlERts1S4WvN4w6Lc2zr3+9yg1a75TLWq0pJNRtQ0nDDQoBoAHtG7Lrnf2nbzTHBSMQt1op9DLEqirl7OXarjjjqcO+rwXE+aM05R03BCKNQ6qSfR1TYh5pmThaRkRczMrZRNB+XSqfH6+jk12eBcKTUxqlbM3y0+sVXZYDN04ytW7C8cs4xLdSa4CrIubQljbEI52MfEJS1m2TS5rdShcUmLBxr0jMdX7C9qGk6w6nYrs8RxmhbEJS3OO92yJC5pMTimhWNqUSgUmiTc1AmRuP+suFIz4pIWxzw/1ur9OTcdIi5pMW/JApdIzIpKI7lDdfH6+jlRVPPjkhbbdvPM3LMRUoW4Y1ri8dSiCs87IC5pcW2tKc1/zsLWFULqM8BLfe7/AaVxE3aTHCGHAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAxLTEyVDEzOjQ5OjA3KzAwOjAwZf6HNAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMS0xMlQxMzo0OTowNyswMDowMBSjP4gAAAAASUVORK5CYII=";

let SIZE = 64;

/**
 * Generate PDF pae document
 */
export function GeneratePAE(student, section) {
    let filename = student.lastname + "_" + student.firstname + ".pdf";

    // Apply and save to pdf format
    let pdf = new jsPDF("p", "px", "a4");
    let yPos = 24;
    let text = student.id + " " + student.lastname + " " + student.firstname;
    let xPos = 48;

    function goDown(howMany) {
        yPos += howMany;

        if (pdf.internal.pageSize.height < yPos + 58) {
            yPos = 24;
            pdf.addPage("a4", "p");
        }
    }

    pdf.addImage(IMAGE, "PNG", xPos, yPos, SIZE, SIZE * 0.42073170731);
    goDown(SIZE * 0.42073170731);

    goDown(12);
    goDown(12);
    pdf.setFontSize(12);
    pdf.text("PAE de l'étudiant", xPos, yPos);
    pdf.setFontSize(18);
    goDown(12);
    pdf.text(text, xPos, yPos);
    pdf.setFontSize(10);

    goDown(12);

    pdf.text("Crédits", pdf.internal.pageSize.width - 56, yPos);
    goDown(12);

    //Print in PDF student's PAE
    section.blocs.forEach((bloc) => {
        student.ues.forEach((ueStudent) => {
            let ue = BlocFindUE(bloc, ueStudent.ref);

            if (ue === undefined) {
                return;
            }

            if (ueStudent.inPAE && !ueStudent.validated) {
                pdf.setFontSize(12);

                pdf.text("UE" + ue.id, xPos, yPos);

                pdf.text(ue.name, xPos + 48, yPos);

                pdf.text(
                    "" + ue.credits,
                    pdf.internal.pageSize.width - 48,
                    yPos
                );

                pdf.setFontSize(10);

                goDown(12);

                ueStudent.aas.forEach((aaStudent) => {
                    if (aaStudent.validated || !aaStudent.inPAE) {
                        return;
                    }

                    let aa = BlocFindAA(bloc, aaStudent.ref);

                    pdf.text("AA" + aa.id, xPos, yPos);

                    pdf.text(aa.name, xPos + 64, yPos);

                    pdf.text(
                        "" + aa.credits,
                        pdf.internal.pageSize.width - 48,
                        yPos
                    );

                    goDown(12);
                });

                goDown(8);
            }
        });
    });

    pdf.text("Signature de l'étudiant:", xPos + 8, yPos + 16);
    pdf.rect(xPos, yPos, 192, 48, "S");

    pdf.setFontSize(18);
    pdf.text(
        "TOTAL: " + StudentPAECredits(student, section),
        pdf.internal.pageSize.width - 110,
        yPos + 16
    );
    pdf.setFontSize(10);

    pdf.save(filename);
}

/**
 * Display the student pae
 */
export function PAEDisplay(props) {
    let student = props.student;
    let section = props.section;

    let ueHtml = [];
    let aaHtml = [];

    // Search for all blocs in section
    section.blocs.forEach((bloc) => {
        // Search all ues in blocs
        bloc.ues.forEach((ueSection) => {
            // Search all ues from the student ues
            student.ues.forEach((ueStudent) => {
                // Validate if the student has this ue in his PAE
                if (ueStudent.inPAE) {
                    // Compare the current student's ue with the ue in the section
                    if (ueStudent.ref === ueSection.id) {
                        // Loop for all aas
                        ueSection.aas.forEach((aa) => {
                            if (StudentHasValidatedAA(student, aa.id)) {
                                return;
                            }

                            // Display aas in html
                            aaHtml.push(
                                <div className="flex" key={aa.id}>
                                    <div className="flex-1">
                                        {aa.id} - {aa.name}
                                    </div>
                                    <div>{aa.credits}</div>
                                </div>
                            );
                        });

                        // Display all ues and aas that the student has
                        ueHtml.push(
                            <div
                                className="gap-2 items-center pb-4"
                                key={ueSection.id}
                            >
                                <div className="flex text-lg">
                                    <div className="flex-1">
                                        UE - {ueSection.id} : {ueSection.name}
                                    </div>
                                    <div className="">{ueSection.credits}</div>
                                </div>

                                {aaHtml}
                            </div>
                        );
                    }
                }
                aaHtml = [];
            });
        });
    });

    return <div className="py-4">{ueHtml}</div>;
}
