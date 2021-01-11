import Icon from "@mdi/react";
import { Filled } from "./Styles";


export default function Button(props) {
    let icon;

    if (props.icon) {
        icon = <Icon className="mr-1" path={props.icon} size={1} />;
    }

    let variante = Filled;

    if (props.variante) {
        variante = props.variante;
    }

    function handleClick(e) {
        if (props.onClick) {
            e.preventDefault();
            props.onClick(e);
        }
    }

    let basestyle = "rounded px-3 py-2 text-base flex items-center";

    return (
        <button className={basestyle + " " + variante} onClick={handleClick}>
            {icon}
            {props.text}
        </button>
    );
}
