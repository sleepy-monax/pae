import { mdiLogout } from '@mdi/js'
import { Link } from 'react-router-dom';
import { disconnect } from '../services/AuthenticationService';
import Button from './Button'

export default function NavBar() {
    return <div className="z-50 sticky top-0 shadow-md p-4 items-center bg-white flex">
        <div className="flex-grow text-lg">
            <Link to="/">
                PAE Étudiants
            </Link>
        </div>

        <Button icon={mdiLogout} text="Se déconnecter" onClick={disconnect} />
    </div>;
}
