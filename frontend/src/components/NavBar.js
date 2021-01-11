import Icon from '@mdi/react'
import { mdiLogout } from '@mdi/js'

export default function NavBar() {
    return <div className="z-50 sticky top-0 shadow-md p-4 items-center bg-white flex">
        <div className="flex-grow text-lg">
            PAE Étudiants
        </div>
        <button className="flex">
            <Icon path={mdiLogout} size={1} />Se déconnecter
        </button>
    </div>;
}
