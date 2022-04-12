import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../features/slices/cart';
import {MdRemoveShoppingCart} from "react-icons/md";
import { Link } from 'react-router-dom';
const Payment = () => {
    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    let data = localStorage.getItem("cart-products") ? localStorage.getItem("cart-products") : [];
    if (data.length !== 0) {
        let parseData = JSON.parse(data);
        data = JSON.parse(parseData);
    }
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
            {data.length === 0 ? <h2>No hay productos para comprar </h2> : 
                <div className='container--items-payment'>
                    {data.map((dato, i) => 
                        <section key={i} className='container--items'>
                            <img className='payment--items-img' src={`${dato.image}`} alt={`${dato.name}`}/>
                            <h3 className='payment--items-name'>{dato.name}</h3>
                            <div>
                                <p className='payment--items-price'>${dato.price},00</p>
                                <MdRemoveShoppingCart onClick={() => deleteProductOfCart(dato.id)} className="payment--delete-icon" />   
                            </div>
                        </section>
                    )}
                    <div className='container--payment-total'>   
                        <p className='payment--text'>
                            PRODUCTOS:  <br />
                            TOTAL: <br />
                        </p>
                        <p className='payment--number'>
                            {data.length} <br />
                            ${data.reduce((sum, value) => sum + value.price , 0)}, 00
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
