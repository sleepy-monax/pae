import { mdiLogout } from "@mdi/js";
import { Link } from "react-router-dom";
import { disconnect, isConnected } from "../services/AuthenticationService";
import { toggle } from "../services/DarkModeService";
import Button from "./Button";

const blurEffect = {
  backdropFilter: "blur(8px)",
};

export default function NavBar() {
  let disconnectButton;

  if (isConnected()) {
    disconnectButton = (
      <Button icon={mdiLogout} text="Se déconnecter" onClick={disconnect} />
    );
  }

  return (
    <div
      style={blurEffect}
      className="z-50 sticky top-0 shadow-md p-4 items-center dark:bg-helha_dark_grey bg-white bg-opacity-50 flex "
    >
      <div className="flex-grow text-lg">
        <Link to="/">PAE Étudiants</Link>
      </div>
      {disconnectButton}
      <Button icon={mdiLogout} text="Light/Dark Mode" onClick={toggle} />
    </div>
  );
}
