import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../features/slices/cart';
import {MdRemoveShoppingCart} from "react-icons/md";
import { Link } from 'react-router-dom';
const Payment = () => {
    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    const get_shopping_cart = useSelector(state => state.shoppingCart);

    const deleteProductOfCart = (id) => {
        dispatch(deleteProduct(id));
        render ? setRender(false) : setRender(true);
    }

    return (
        <main className='container--payment'>
            <div className='container--link-history'>
                <Link className='link-history' to="/">HOME/</Link>
                <p className='link-history'>PAYMENT</p>
            </div>
            {get_shopping_cart.length === 0 ? <h2>No hay productos para comprar </h2> : 
                <div className='container--items-payment'>
                    {get_shopping_cart.map((dato, i) => 
                        <section key={i} className='container--items'>
                            <img className='payment--items-img' src={`${dato.image}`} alt={`${dato.name}`}/>
                            <h3 className='payment--items-name'>{dato.name}</h3>
                            <div>
                                <p className='payment--items-price'>${dato.price * dato.quantity},00</p>
                                <p>Cantidad: {dato.quantity} <MdRemoveShoppingCart onClick={() => deleteProductOfCart(dato.id)} className="payment--delete-icon" />   </p>
                            </div>
                        </section>
                    )}
                    <div className='container--payment-total'>   
                        <p className='payment--text'>
                            PRODUCTOS:  <br />
                            TOTAL: <br />
                        </p>
                        <p className='payment--number'>
                            {get_shopping_cart.reduce((prev, current) => prev + current.quantity, 0)} <br />
                            ${get_shopping_cart.reduce((sum, value) => sum + value.price * value.quantity , 0)}, 00
                        </p>
                    </div>
                    <div className='container--payments-buttons'>
                        <button className='payment-button'>PAGAR CON MERCADO PAGO</button>
                        <button className='payment-button'>PAGAR CON PAYPAL</button>
                    </div>
                </div>
            }
        </main>
    )
}

export default Payment;
