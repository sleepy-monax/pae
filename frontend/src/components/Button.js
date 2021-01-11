import Icon from "@mdi/react";

export const Filled = "bg-helha_blue text-white shadow";
export const OutlineBlue = "border-2 border-helha_blue text-helha_blue";
export const OutlineWhite = "border-2 border-white text-white";

export default function Button(props) {
    let icon;

    if (props.icon) {
        icon = <Icon className="mr-1" path={props.icon} size={1} />;
    }

    let variante = Filled;

    console.log(props);

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
