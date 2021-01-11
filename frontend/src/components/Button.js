import Icon from "@mdi/react";

export default function Button(props) {
    let icon;

    if (props.icon) {
        icon = <Icon className="mr-1" path={props.icon} size={1} />;
    }

    function handleClick(e) {
        if (props.onClick) {
            e.preventDefault();
            props.onClick(e);
        }
    }

    return (
        <button className="bg-helha_blue rounded px-3 py-2 text-white shadow text-base flex items-center" onClick={handleClick}>
            {icon}
            {props.text}
        </button>
    );
}
