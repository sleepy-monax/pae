import Icon from "@mdi/react";
import {mdiCheck, mdiClose} from "@mdi/js";
import React from "react";

export default function Check(props) {
    return <div className='flex-1 text-center'>
        <Icon path={props.checked ? mdiCheck : mdiClose} size={2} className={props.checked ? 'mx-auto text-helha_blue': 'mx-auto text-red-600'}/>
        {props.text}
    </div>;
}