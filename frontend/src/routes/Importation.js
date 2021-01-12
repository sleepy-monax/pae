import Header from "../components/Hearder";

import React from "react";

import { mdiTableArrowUp } from "@mdi/js";
import { check, Import } from "../services/ImportService";
import InputFile from "../components/InputFile";
import StateFile from "../components/StateFile";
import Button from "../components/Button";

export default class Importation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      checks: { formatOk: false, structureOk: false, dataOk: false },
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(file) {
    check(file, (result) => {
      this.setState({ checks: result.checks });
    });
  }

  render() {
    return (
      <div className="flex-1">
        <Header
          icon={mdiTableArrowUp}
          title="Importation"
          description="Veuillez choisir le fichier d’étudiants à importer"
        ></Header>
        <div className="py-20 px-2 ">
          <div className="max-w-md mx-auto bg-white text-black rounded-lg overflow-hidden md:max-w-lg shadow-md">
            <div className="flex flex-col w-full p-3 gap-2">
              <InputFile
                file={this.state.file}
                onFileChange={this.onChangeInput}
              />
              <StateFile checks={this.state.checks} />
              <Button text="Import" onClick={Import} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
