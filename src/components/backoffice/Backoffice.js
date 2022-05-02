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
        <h1>Esto es back office</h1>
    )
}

export default Backoffice