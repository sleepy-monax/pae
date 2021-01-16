import {mdiAccount, mdiBrightness4, mdiClose, mdiLogout, mdiMenu} from "@mdi/js";
import Icon from "@mdi/react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {disconnect, isAdmin, isConnected} from "../services/AuthenticationService";
import {toggle} from "../services/DarkModeService";
import Button from "./Button";
import LinkButton from "./LinkButton";
import React from "react";

const blurEffect = {
    backdropFilter: "blur(16px)",
};

export default function NavBar() {
    let disconnectButton;
    let adminSettingsButton;
    let node = React.createRef();

    const [menuVisible, setMenuVisible] = useState(false);
    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        isAdmin(function (result) {
            setAdmin(result.success);
        })
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    });

    if (isConnected()) {
        disconnectButton = (
            <Button icon={mdiLogout} text="Se déconnecter"
                    onClick={() => {
                        disconnect();
                        setMenuVisible(false);
                    }}/>
        );
    }

    let darkmodeButton = (
        <Button icon={mdiBrightness4} text="Light/Dark Mode"
                onClick={() => {
                    toggle();
                    setMenuVisible(false);
                }}/>
    );

    function handleClick() {
        setMenuVisible(false)
    };

    function handleOutsideClick(e) {
        if (node && !node.current.contains(e.target)) handleClick();
    };

    if (admin) {
        adminSettingsButton = (
            <LinkButton to="/admin" icon={mdiAccount} text="Options d'admin"/>
        )
    }

    let popOverMenu = (
        <div className="relative ">
            <div className="absolute w-60 right-0  bg-white text-black shadow-lg p-4 flex flex-col gap-1 rounded">
                <button className="flex mb-2" onClick={() => handleClick()}>
                    <Icon className="mr-1" path={mdiClose} size={1}/> Fermer
                </button>
                {darkmodeButton}
                {adminSettingsButton}
                {disconnectButton}
            </div>
        </div>
    );

    return (
        <div
            style={blurEffect}
            className="z-50 sticky top-0 p-4 items-center dark:bg-helha_dark_grey bg-white bg-opacity-70 flex border-b-2 border-helha_blue"
            ref={node}
        >
            <div className="flex-grow text-lg">
                <Link to="/">PAE Étudiants</Link>
            </div>

            <Button icon={mdiMenu} onClick={() => setMenuVisible(true)}/>
            {menuVisible &&  (popOverMenu) }
        </div>
    );
}
