import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function Information(props) {
  return (
    <div
      className={
        "flex gap-2 text-helha_blue border-2 rounded border-helha_blue p-4 " +
        props.className
      }
    >
      <Icon path={mdiInformationOutline} size={1} /> {props.text}
    </div>
  );
}
