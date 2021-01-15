import Icon from "@mdi/react";

export default function Header(props) {
    return (
        <div className=" bg-helha_grey p-8 text-white w-full">
            <div className="flex items-center max-w-4xl mx-auto">
                <div className="rounded-full bg-helha_blue p-4 mr-4">
                    <Icon path={props.icon} size={2} />
                </div>
                <div className="flex flex-col flex-grow">
                    <div className="border-b-2 text-3xl pb-1 border-gray-400">
                        {props.title}
                    </div>
                    <div className="flex py-2">
                        <span>{props.description}</span>
                    </div>
                </div>
            </div>
            {props.children ? (
                <div className="flex flex-row-reverse max-w-4xl mx-auto gap-2 mt-8">
                    {props.children}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
