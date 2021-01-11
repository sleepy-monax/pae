const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundImage: "url(assets/background.jpg)"
}

const containerStyle = {
    backdropFilter: 'blur(16px)',
}

export default function Login() {
    return <div style={backgroundStyle} className="flex-grow flex flex-row justify-center">
        <div style={containerStyle} className="my-0 p-8 bg-helha_grey bg-opacity-75 flex flex-col gap-4 flex-grow max-w-2xl">


            <form className="flex flex-col gap-4">
                <img src="assets/logo.png" className="m-8" alt=""></img>

                <h1>Authentification</h1>

                <input type="text" placeholder="Nom d'utilisateur">
                </input>

                <input type="password" placeholder="Mot de passe">
                </input>

                <button>Connection</button>
            </form>
        </div>
    </div>;
}