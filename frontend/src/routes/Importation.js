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
        importOk: undefined,
        uploadOk: undefined,
      },
      result: { success: undefined, message: "" },
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(file) {
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

    if (this.state.result.success !== undefined) {
      message = (
        <div
          className={
            (this.state.result.success
              ? "bg-helha_blue text-white"
              : "bg-yellow-500 text-black") +
            " " +
            "p-4 rounded"
          }
        >
          {this.state.result.message}
        </div>
      );
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
            <InputFile
              file={this.state.file}
              onFileChange={this.onChangeInput}
            />

            <StateFile {...status} />

            {message}
          </div>
        </div>
      </div>
    );
  }
}
