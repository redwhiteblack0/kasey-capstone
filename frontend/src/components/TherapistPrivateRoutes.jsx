import { Navigate, Outlet } from 'react-router-dom'

import useAuth from "../hooks/useAuth";

const TherapistPrivateRoutes = () => {
    const [user, setUser] = useAuth();
    return (
        user ? user.is_therapist ? <Outlet/> : <Navigate to='/'/> :<Navigate to='/login'/>
    )
}

export default TherapistPrivateRoutes;