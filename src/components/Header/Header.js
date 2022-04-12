import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineBars, AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { BiDrink } from "react-icons/bi";
import { FaBeer, FaWineBottle } from "react-icons/fa";
import { GiWineBottle } from "react-icons/gi";
import Cart from "../Cart/Cart";
import { Redirect, Link } from 'react-router-dom';
import logo from "../../assets/img/logo.png";
import { useJwt } from "react-jwt";
import { getTokenFromCookie, deleteTokenFromCookie } from '../../features/slices/token';
import { showMenu } from '../../features/slices/showUserOption';
import { useDispatch, useSelector } from 'react-redux';
import UserOption from "../UserOption/UserOption"
const Header = (params) => {
    const [barMenu, setBarMenu] = useState(false);
    const [cart, setCart] = useState(false);
    const [renderPage, setRenderPage] = useState(false);
    const searchRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTokenFromCookie());
    }, [])
    const token = useSelector(state => state.getToken);
    const userOption = useSelector(state => state.show_user_option);
    const { decodedToken } = useJwt(token);
    const sendSearch = (e) => {
        if (e.code === 'Enter' || e.code === "NumpadEnter") return setRenderPage(true)
    }

    setTimeout(() => {
        setRenderPage(false);
    }, 100)

    return (
        <>
            <header className='container--header'>
                <div className='header'>
                    <Link to="/"><img className='header--img' src={logo} alt="logo" /></Link>
                    <div className='header--container-search'>
                        <input className='search-input' ref={searchRef} type="text" onKeyPress={sendSearch} placeholder='Busca tu producto' />
                        <AiOutlineSearch className='search-icon' onClick={() => setRenderPage(true)} />
                    </div>
                    <div className='header--container-user'>
                        {decodedToken === null ?
                            <div className='header--container-buttons-user'>
                                <Link to="/login" className='header--button-link-user'>Iniciar sesion</Link>
                                <Link to="/register" className='header--button-link-user'>Registrarse</Link>
                            </div>
                            :
                            <div className={userOption ? 'container--user-profile container--user-profile-active'  : 'container--user-profile'} onMouseEnter={() => dispatch(showMenu(true))}>
                                <div className="user--profile-img">
                                    <img className='profile-img' src={`${decodedToken.image}`} alt={`${decodedToken.name}-img`} />
                                </div>
                                <p className='user--profile-text'>
                                    {decodedToken.email} <br />
                                    {decodedToken.name} <br />
                                </p>
                            </div>
                        }
                    </div>
                    <div className='container--icon-bars' onClick={() => barMenu ? setBarMenu(false) : setBarMenu(true)}>
                        <AiOutlineBars />
                    </div>
                </div>
                <nav className={barMenu ? 'container-menu show' : 'container-menu no-show'}>
                    <ul className='menu'>
                        {decodedToken === null ?
                            <div className='container--buttons-menu-login'>
                                <li className='menu--container-link'><Link to="/login" onClick={() => setBarMenu(false)} className="menu-links"><AiOutlineUser />Iniciar sesion</Link></li>
                                <li className='menu--container-link'><Link to="/register" onClick={() => setBarMenu(false)} className="menu-links"><AiOutlineUserAdd />Registrarse</Link></li>
                            </div>
                            :
                            <div className="menu--container-user">
                                <div className='menu--container-user-img'>
                                    <img className='menu--user-img' src={`${decodedToken.image}`} alt={`${decodedToken.name}-img`} />
                                </div>
                                <div>
                                    <p className='menu--user-text'>
                                        {decodedToken.email} <br />
                                        {decodedToken.name} <br />
                                    </p>
                                    <p onClick={() => (dispatch(deleteTokenFromCookie()), window.location.reload())} className='menu--user-text'>Cerrar sesion</p>
                                </div>
                            </div>
                        }
                        <li className='menu--container-link'><Link className='menu-links' to={`/category/vinos`} onClick={() => setBarMenu(false)}><GiWineBottle /> Vinos</Link></li>
                        <li className='menu--container-link'><Link className='menu-links' to={`/category/bebida blanca`} onClick={() => setBarMenu(false)}><FaWineBottle /> Bebida blanca</Link></li>
                        <li className='menu--container-link'><Link className='menu-links' to={`/category/aperitivos`} onClick={() => setBarMenu(false)}><BiDrink /> Aperitivos</Link></li>
                        <li className='menu--container-link'><Link className='menu-links' to={`/category/cervezas`} onClick={() => setBarMenu(false)}><FaBeer /> Cervezas</Link></li>
                        <li className='menu--container-link'>
                            {window.innerWidth > 768 ?
                                <p className='menu-links link-cart' style={{ cursor: "pointer" }} onClick={() => cart ? setCart(false) : setCart(true)}>
                                    <AiOutlineShoppingCart />
                                </p>
                                :
                                <Link className='menu-links' to="/payment" onClick={() => setBarMenu(false)}><AiOutlineShoppingCart /></Link>
                            }
                        </li>
                    </ul>
                </nav>
            </header>
            {cart ? <Cart /> : null}
            {userOption ? <UserOption /> : null}
            {renderPage ? <Redirect to={`/search/${searchRef.current.value}`} search={searchRef.current.value} /> : null}
        </>
    )
}

export default Header;
