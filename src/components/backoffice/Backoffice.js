import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useJwt } from 'react-jwt';
import { Redirect } from 'react-router-dom';
import { getTokenFromCookie } from '../../features/slices/token';
const Backoffice = () => {
    const dispatch = useDispatch();
    dispatch(getTokenFromCookie());
    const [render, setRender] = useState(false)
    const token = useSelector(state => state.getToken);
    const { decodedToken } = useJwt(token);
    useEffect(() => {
        setTimeout(() => setRender(true), 300)
    }, [])

    return (
        // token !== "" ? 
        //     <>
        //         {console.log(decodedToken)}
        //         {console.log(render)}

        //         <h1>Estas en back office </h1>
        //     </>
        // : 
        //     // <h1>Hola</h1>
        //     <Redirect to="/" />
        render ?
            decodedToken.isAdmin?
                <h1>Hola {decodedToken.name}, que desea hacer?</h1>
                :
                <Redirect to="/" />
            :
            null
    )
}

export default Backoffice