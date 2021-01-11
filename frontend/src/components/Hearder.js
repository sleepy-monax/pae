import Icon from '@mdi/react'


export default function Header(props) {
    return <div className=" bg-helha_grey p-8 text-white">
        <div className="flex items-center max-w-2xl mx-auto">
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
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    </div>;
}
