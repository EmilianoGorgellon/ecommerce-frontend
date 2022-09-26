import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, addProduct } from '../../features/slices/cart';
import { Link } from 'react-router-dom';
import { generate_payment_mercadopago } from '../../services/payment_services';
const Payment = () => {
    const token = useSelector(state => state.getToken);
    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    const get_shopping_cart = useSelector(state => state.shoppingCart);

    const deleteProductOfCart = (_id) => {
        dispatch(deleteProduct(_id));
        render ? setRender(false) : setRender(true);
    }

    const addProductOfCart = (_id) => {
        dispatch(addProduct({_id}));
        render ? setRender(false) : setRender(true)
    }

    const send_product_payment = async (products, token) => {
        const {response} = await generate_payment_mercadopago(products, token);
        window.open(response)
    }
    
    return (
        <main className='container--payment'>
            <div className='container--link-history'>
                <Link className='link-history' to="/">HOME/</Link>
                <p className='link-history'>PAYMENT</p>
            </div>
            {get_shopping_cart.length === 0 ? <h2>No hay productos para comprar </h2> : 
                <div className='container--items-payment'>
                    {get_shopping_cart.map((data, i) => 
                        <section key={i} className='container--items'>
                            <img className='payment--items-img' src={`${data.imagesUrl[0]}`} alt={`${data.name}`}/>
                            <h3 className='payment--items-name'>{data.name}</h3>
                            <p className='payment--items-price'>${data.price * data.quantity},00</p>
                            <div className="container--payment-items-quantity">
                                <p className="payment--delete-product" onClick={() => deleteProductOfCart(data._id)} >-</p>
                                <p>{data.quantity}</p>
                                <p className="payment--add-product" onClick={() => addProductOfCart(data._id)}>+</p>
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
                        <button className='payment-button'>PAGAR CON PAYPAL</button>
                        <button className='payment-button' onClick={() => send_product_payment(get_shopping_cart, token)}>PAGAR CON MERCADO PAGO</button>
                    </div>
                </div>
            }
        </main>
    )
}

export default Payment;
