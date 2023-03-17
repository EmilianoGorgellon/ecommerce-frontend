import React from 'react'
import { Link } from 'react-router-dom';
import { deleteTokenFromCookie } from '../../features/slices/token';
import { useDispatch } from 'react-redux';
import {showMenu} from "../../features/slices/showUserOption"
const UserOption = (params) => {
  const dispatch = useDispatch();
  const {role} = params;

  return (
    <ul className='container--user-option' onMouseLeave={() => dispatch(showMenu(false))}>
        <li><Link to="/settings" className='user--option-link'>Ajustes</Link></li>
        <li className='user--option-link' onClick={() => (dispatch(deleteTokenFromCookie()), window.location.reload())}>Cerrar sesion</li>
        {role.map(data => 
          (data === "moderator" ? 
            <>
              <li><Link to="/backoffice/product" className='user--option-link'>Agregar productos</Link></li>
              <li><Link to="/backoffice/moderator" className='user--option-link'>Agregar moderador</Link></li>
            </>
          : 
          (data === "admin" ?
          <>
            <li><Link to="/backoffice/admin" className='user--option-link'>Agregar admin</Link></li>
        </>
        : null)))}
    </ul>
  )
}

export default UserOption;