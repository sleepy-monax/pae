import React from "react";

import { Link } from "react-router-dom";

import Button from "../components/Button";
import { register } from "../services/UserService";

const backgroundStyle = {
  backgroundSize: "cover",
  backgroundImage: "url(/assets/background.jpg)",
};

const containerStyle = {
  backdropFilter: "blur(4px)",
};
export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hiddenPassword: true,
      showDiv: false,
    };

    this.verifInfos = this.verifInfos.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  verifInfos() {
    this.setState({ showDiv: true });
  }

  togglePassword() {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      register(
        this.state.username,
        this.state.password,
        function (result) {
          if (result.success) {
            //FEEDBACK UTILISATEUR AJOUTÉ
            console.log(result.message);
          } else {
            //FEEDBACK UTILISATEUR NON AJOUTÉ
            console.log(result.message);
          }
          console.log(result);
          this.setState({ redirectToReferrer: true });
        }.bind(this)
      );
    } else {
      this.verifInfos();
    }
  }

  render() {
    return (
      <div
        style={backgroundStyle}
        className="flex-grow flex flex-row justify-center"
      >
        <form
          onSubmit={this.handleSubmit}
          style={containerStyle}
          className="my-0 p-8 bg-helha_grey bg-opacity-50 flex flex-col flex-grow items-center gap-4 max-w-2xl"
        >
          <img src="/assets/logo.png" className="m-8" alt="" />

          <span className="text-white text-xl">
            Enregistrement d'un/e secrétaire
          </span>

          <div
            id="errorDiv"
            className="bg-red-500 rounded text-white text-l px-3 text-base"
          >
            {this.state.showDiv ? (
              <div>
                <h1>Veuillez remplir tout les champs !</h1>
              </div>
            ) : null}
          </div>

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />

          <input
            type={this.state.hiddenPassword ? "password" : "text"}
            placeholder="Mot de passe"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <div>
            <input
              type="checkbox"
              id="showPassword"
              onClick={this.togglePassword}
            />
            <label className="text-white"> Afficher le mot de passe</label>
          </div>

          <Button text="Créer un compte" onClick={this.handleSubmit} />

          <Link to="/admin" className="text-helha_blue underline font-bold">
            Revenir à la page de gestion d'utilisateurs
          </Link>
        </form>
      </div>
    );
  }
}
