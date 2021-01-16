import { Filled } from "./Styles";

export default function DetailButton(props) {
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

    let basestyle = "px-3 py-2 text-base";

    return (
        <div className="rounded overflow-hidden flex shadow-lg">
            <button
                className={basestyle + " " + variante}
                onClick={handleClick}
            >
                {props.text}
            </button>
            <div className="px-3 py-2 bg-white text-black flex-1 flex items-center">
                {props.detail}
            </div>
        </div>
    );
}
