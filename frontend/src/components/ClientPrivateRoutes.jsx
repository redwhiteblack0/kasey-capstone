import { Navigate, Outlet } from 'react-router-dom'

import useAuth from "../hooks/useAuth";

const ClientPrivateRoutes = () => {
    const [user, setUser] = useAuth();
    return (
        user ? user.is_client ? <Outlet/> : <Navigate to='/'/> :<Navigate to='/login'/>
    )
}

export default ClientPrivateRoutes;