import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-helha_dark_grey text-white  p-8 ">
      <div className="max-w-4xl flex mx-auto items-center">
        <img src="assets/logo.png" className="pr-8" alt="" />
        <div className="flex flex-col gap-4">
          <div>
            La <b>HELHa</b> (Haute École Louvain en Hainaut) propose des
            bacheliers, des masters et des spécialisations parmi 7 domaines sur
            15.
          </div>
          <Link to="/about" className="text-helha_blue underline font-bold">
            À propos de...
          </Link>
        </div>
      </div>
    </div>
  );
}
