import React, {useEffect, useState} from "react";
import "./cart.scss";
import {MdDataSaverOff, MdRemoveShoppingCart} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, addProduct } from "../../features/slices/cart";
import { Link } from "react-router-dom";
const Cart = () => {
    const [render, setRender] = useState(false);
    const get_shopping_cart = useSelector(state => state.shoppingCart);
    const dispatch = useDispatch();
    const deleteProductOfCart = (_id) => {
        dispatch(deleteProduct(_id));
        render ? setRender(false) : setRender(true)
    }

    const addProductOfCart = (_id) => {
        console.log(_id)
        dispatch(addProduct({_id}));
        render ? setRender(false) : setRender(true)
    }

    return (
        <div className="container--cart">
            <div className="cart">
                {get_shopping_cart.length === 0 ? <h1 className="cart-title">No hay productos en el carrito</h1> : 
                    <>
                        {get_shopping_cart.map((data ,i) => 
                        <section key={i} className="cart--container-product">
                            <img className="cart--product-image" src={data.imagesUrl[0]} alt={`${data.name}`} />
                            <div className="cart--container-text">
                                <p className="cart--product-name">{data.name}</p>
                                <p className="cart--product-price">${data.price * data.quantity}.00</p>
                                <div className="container--cart-product-quantity">
                                    <p className="cart--delete-product" onClick={() => deleteProductOfCart(data._id)} >-</p>
                                    <p>{data.quantity}</p>
                                    <p className="cart--add-product" onClick={() => addProductOfCart(data._id)}>+</p>
                                </div>
                            </div>
                        </section>)}
                        <Link className="cart--button-purchase" to="/payment">FINALIZAR COMPRA</Link>
                    </>
                }
            </div>
        </div>
    )
}

export default Cart;
