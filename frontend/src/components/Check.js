import { mdiCheck, mdiClose, mdiDotsHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

export default function Check(props) {
  let icon = mdiDotsHorizontal;
  let color = "text-gray-400";

  if (props.checked === true) {
    icon = mdiCheck;
    color = "text-helha_blue";
  } else if (props.checked === false) {
    color = "text-red-600";
    icon = mdiClose;
  }

  return (
    <div className="flex-1  text-center">
      <Icon path={icon} size={2} className={"mx-auto " + color} />
      {props.text}
    </div>
  );
}
