import { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import PageNotFound from '../PageNotFound/PageNotFound';
import Cookies from 'universal-cookie';
const Backoffice = () => {
    const cookie = new Cookies();
    const [isAdmin, setIsAdmin] = useState(false);
    const get_token = cookie.get("token");
    const { decodedToken } = useJwt(get_token);
    useEffect(() => {
      if (decodedToken !== null) return setIsAdmin(decodedToken.name.isAdmin)
    }, [decodedToken])

    return (
        <>
           { isAdmin ? 
            <h1>Muestro algo, ca podes agregar producto y dar de alta a administrador</h1>
                : 
            <PageNotFound />}
        </>
    )
}

export default Backoffice