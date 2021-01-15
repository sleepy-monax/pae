import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";

export default function Warning(props) {
  return (
    <div
      className={
        "flex gap-2 border-2 rounded p-4 bg-yellow-500 border-yellow-500 text-black shadow " +
        props.className
      }
    >
      <Icon path={mdiAlert} size={1} /> {props.text}
    </div>
  );
}
