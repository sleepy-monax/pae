import { mdiBrightness4, mdiClose, mdiLogout, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { disconnect, isConnected } from "../services/AuthenticationService";
import { toggle } from "../services/DarkModeService";
import Button from "./Button";

const blurEffect = {
  backdropFilter: "blur(16px)",
};

export default function NavBar() {
  let disconnectButton;
  const [menuVisible, setMenuVisible] = useState(false);

  if (isConnected()) {
    disconnectButton = (
      <Button icon={mdiLogout} text="Se déconnecter" onClick={disconnect} />
    );
  }

  let darkmodeButton = (
    <Button icon={mdiBrightness4} text="Light/Dark Mode" onClick={toggle} />
  );

  let popoverMenu = (
    <div className="relative ">
      <div className="absolute w-60 right-0  bg-white text-black shadow-lg p-4 flex flex-col gap-1 rounded">
        <button className="flex mb-2" onClick={() => setMenuVisible(false)}>
          <Icon className="mr-1" path={mdiClose} size={1} /> Fermer
        </button>
        {darkmodeButton}
        {disconnectButton}
      </div>
    </div>
  );

  return (
    <div
      style={blurEffect}
      className="z-50 sticky top-0 p-4 items-center dark:bg-helha_dark_grey bg-white bg-opacity-70 flex border-b-2 border-helha_blue"
    >
      <div className="flex-grow text-lg">
        <Link to="/">PAE Étudiants</Link>
      </div>

      <Button icon={mdiMenu} onClick={() => setMenuVisible(true)} />
      {menuVisible ? popoverMenu : ""}
    </div>
  );
}
