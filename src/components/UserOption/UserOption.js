import React from 'react'
import { Link } from 'react-router-dom';
import { deleteTokenFromCookie } from '../../features/slices/token';
import { useDispatch } from 'react-redux';
import {showMenu} from "../../features/slices/showUserOption"
const UserOption = () => {
  const dispatch = useDispatch();
  return (
    <ul className='container--user-option' onMouseLeave={() => dispatch(showMenu(false))}>
        <li><Link to="/settings" className='user--option-link'>Ajustes</Link></li>
        <li className='user--option-link' onClick={() => (dispatch(deleteTokenFromCookie()), window.location.reload())}>Cerrar sesion</li>
    </ul>
  )
}

export default UserOption;