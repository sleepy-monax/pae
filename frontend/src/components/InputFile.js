import React from "react";

export default class InputFile extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const file = e.target.files[0];
    if (file !== undefined) {
      this.props.onFileChange(file);
      document.getElementById("fileName").innerText = file.name;
    }
  }

  render() {
    return (
      <div>
        <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
          <div className="absolute">
            <div className="flex flex-col items-center ">
              <i className="fa fa-cloud-upload fa-3x text-gray-200" />{" "}
              <span className="block text-gray-400 font-normal">
                Glissez votre fichiers ici
              </span>
              <span className="block text-gray-400 font-normal">ou</span>{" "}
              <span className="block text-blue-400 font-normal text-black">
                Parcourez les fichiers
              </span>
            </div>
          </div>
          <input
            type="file"
            className="h-full w-full opacity-0"
            id="file"
            onChange={this.handleChange}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
        <label id="fileName" className="flex flex-col items-center" />
      </div>
    );
  }
}
