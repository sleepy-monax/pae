import { Import } from "../services/ImportService";
import { mdiTableArrowUp } from "@mdi/js";
import React from "react";

import Button from "../components/Button";
import Header from "../components/Hearder";
import InputFile from "../components/InputFile";
import StateFile from "../components/StateFile";

export default class Importation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      status: {
        formatOk: undefined,
        structureOk: undefined,
        dataOk: undefined,
      },
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(file) {
    Import(
      file,
      (status) => this.setState({ status: status }),
      () => {
        alert("Importation reussie!");
      },
      () => {
        alert("Impossible d'importer le fichier!");
      }
    );
  }

  render() {
    let status = this.state.status;

    return (
      <div className="flex flex-col flex-1">
        <Header
          icon={mdiTableArrowUp}
          title="Importation"
          description="Veuillez choisir le fichier d’étudiants à importer"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg overflow-hidden max-w-lg shadow-md flex flex-col w-full p-3 gap-2">
            <InputFile
              file={this.state.file}
              onFileChange={this.onChangeInput}
            />

            <StateFile {...status} />

            <Button
              className="self-end mt-8"
              text="Importer le fichier excel"
              onClick={Import}
            />
          </div>
        </div>
      </div>
    );
  }
}
