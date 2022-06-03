import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, addProduct } from '../../features/slices/cart';
import { Link } from 'react-router-dom';
const Payment = () => {
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

    return (
        // <main>
        //     <table>
        //         <caption>Productos del carrito de compras</caption>
        //         <thead>
        //             <tr>
        //                 <th>Producto</th>
        //                 <th>Precio</th>
        //                 <th>Cantidad</th>
        //                 <th>Subtotal</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {get_shopping_cart.map((data, i) => 
        //                 <tr>
        //                     <td>
        //                         <img src={`${data.imagesUrl[0]}`} alt={`${data.name} - img`} />

        //                     </td>

        //                 </tr>
       
        //             )}
        //         </tbody>
        //     </table>
        // </main>
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
                        <button className='payment-button'>PAGAR CON MERCADO PAGO</button>
                        <button className='payment-button'>PAGAR CON PAYPAL</button>
                    </div>
                </div>
            }
        </main>
    )
}

export default Payment;
