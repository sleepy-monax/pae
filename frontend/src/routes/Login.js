import Button from "../components/Button";

const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundImage: "url(assets/background.jpg)"
}

const containerStyle = {
    backdropFilter: 'blur(4px)',
}

export default function Login() {
    function sayHello() {
        console.log("Hello!");
    }

    return <div style={backgroundStyle} className="flex-grow flex flex-row justify-center">
        <div style={containerStyle} className="my-0 p-8 bg-helha_grey bg-opacity-50 flex flex-col flex-grow items-center gap-4 max-w-2xl">
            <img src="assets/logo.png" className="m-8" alt=""></img>

            <h1>Authentification</h1>

            <input type="text" placeholder="Nom d'utilisateur">
            </input>

            <input type="password" placeholder="Mot de passe">
            </input>

            <Button text="Connection" onClick={sayHello} />
        </div>
    </div>;
}