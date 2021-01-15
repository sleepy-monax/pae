export default function Loading() {
    return (
        <div className="flex items-center flex-1 justify-center">
            <div className="flex items-center">
                <img
                    src={process.env.PUBLIC_URL + "/assets/loading.svg"}
                    className="pr-1"
                    alt=""
                />
                Chargement...
            </div>
        </div>
    );
}
