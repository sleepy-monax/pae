import { Import } from "../services/ImportService";
import { mdiHome, mdiTableArrowUp } from "@mdi/js";
import React from "react";

import Header from "../components/Hearder";
import InputFile from "../components/InputFile";
import StateFile from "../components/StateFile";
import LinkButton from "../components/LinkButton";
import Warning from "../components/Warning";
import Information from "../components/Information";

export default class Importation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      status: {
        formatOk: undefined,
        importOk: undefined,
        uploadOk: undefined,
      },
      result: { success: undefined, message: "" },
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(file) {
    this.setState({ file });

    Import(
      file,
      (status) => this.setState({ status: status }),
      () => {
        this.setState({
          result: { success: true, message: "Importation reussie!" },
        });
      },
      () => {
        this.setState({
          result: {
            success: false,
            message: "Impossible d'importer le fichier!",
          },
        });
      }
    );
  }

  render() {
    let status = this.state.status;

    let message;

    if (this.state.result.success === true) {
      message = <Information text={this.state.result.message} />;
    } else if (this.state.result.success === false) {
      message = <Warning text={this.state.result.message} />;
    }

    return (
      <div className="flex flex-col flex-1">
        <Header
          icon={mdiTableArrowUp}
          title="Importation"
          description="Veuillez choisir le fichier d’étudiants à importer"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg overflow-hidden max-w-lg shadow-md flex flex-col w-full p-3 gap-2">
            {!this.state.status.formatOk ? (
              <InputFile
                file={this.state.file}
                onFileChange={this.onChangeInput}
              />
            ) : (
              ""
            )}

            {this.state.file !== null ? <StateFile {...status} /> : ""}

            {message}

            {this.state.result.success ? (
              <LinkButton to="/" text="Revenir à l'acceil" icon={mdiHome} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
