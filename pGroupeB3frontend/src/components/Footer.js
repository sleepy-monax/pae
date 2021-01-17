import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="bg-helha_dark_grey text-white  p-8 border-t-2 border-helha_blue">
            <div className="max-w-xl flex flex-col sm:flex-row mx-auto items-center">
                <img
                    src={process.env.PUBLIC_URL + "/assets/logo.png"}
                    className="sm:pr-8 pb-8 sm:pb-0"
                    alt=""
                />
                <div className="flex flex-col gap-4">
                    <div>
                        La <b>HELHa</b> (Haute École Louvain en Hainaut) propose
                        des bacheliers, des masters et des spécialisations parmi
                        7 domaines sur 15 implantations.
                    </div>
                    <Link
                        to="/about"
                        className="text-helha_blue underline font-bold"
                    >
                        À propos de...
                    </Link>
                </div>
            </div>
        </div>
    );
}
