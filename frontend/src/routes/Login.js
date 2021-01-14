import React from "react";
import { Redirect } from "react-router-dom";

import Button from "../components/Button";
import { connect } from "../services/AuthenticationService";

import { Link } from "react-router-dom";

const backgroundStyle = {
  backgroundSize: "cover",
  backgroundImage: "url(assets/background.jpg)",
};

const containerStyle = {
  backdropFilter: "blur(4px)",
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "", redirectToReferrer: false };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    connect(
      this.state.username,
      this.state.password,
      function (result) {
        if (result.success) {
          this.setState({ redirectToReferrer: true });
        } else {
          //A FAIRE
        }
      }.bind(this)
    );
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to="/" />;
    }

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
          <img src="assets/logo.png" className="m-8" alt=""></img>

          <span className="text-white text-xl">Authentification</span>

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={this.handleUsernameChange}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            onChange={this.handlePasswordChange}
          />

          <Button text="Connexion" />
          <Link to="/register" className="text-helha_blue underline font-bold">
            Créer un compte
          </Link>
        </form>
       
      </div>
    );
  }
}
