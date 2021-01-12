import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { Filled } from "./Styles";

export default function LinkButton(props) {
  let variante = Filled;

  if (props.variante) {
    variante = props.variante;
  }

  return (
    <Link
      to={props.to}
      className={"select-none flex items-center py-2 px-4 rounded " + variante}
    >
      <span className="flex-1">{props.text}</span>
      <Icon path={mdiChevronRight} size={1} />
    </Link>
  );
}
