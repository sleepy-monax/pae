import { mdiLinkedin } from "@mdi/js";
import Icon from "@mdi/react";

export default function Hero(props) {
  return (
    <div className="flex flex-row items-center gap-2 rounded">
      <img className="rounded-full max-w-xxxs" src={props.pic} />
      <div className="flex flex-col">
        <div className="text-helha_dark_grey dark:text-white text-xl">
          {props.name}
        </div>
        {props.linkedin ? (
          <a
            className="flex gap-1 text-helha_grey dark:text-helha_blue "
            href={"https://www.linkedin.com/in/" + props.linkedin}
          >
            <Icon path={mdiLinkedin} size={1} /> {props.linkedin}
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
