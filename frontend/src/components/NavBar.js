import Icon from '@mdi/react'
import { mdiLogout } from '@mdi/js'
import Button from './Button'

export default function NavBar() {
    return <div className="z-50 sticky top-0 shadow-md p-4 items-center bg-white flex">
        <div className="flex-grow text-lg">
            PAE Étudiants
        </div>

        <Button icon={mdiLogout} text="Se déconnecter" />
    </div>;
}
