import React, {useState} from "react";
import "./cart.scss";
import {MdRemoveShoppingCart} from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/slices/cart";
import { Link } from "react-router-dom";
const Cart = () => {
    const [render, setRender] = useState(false);
    let storeCart = localStorage.getItem("cart-products") ? localStorage.getItem("cart-products") : [];
    const dispatch = useDispatch();
    if (localStorage.getItem("cart-products")) {
        let parseStoreCart = JSON.parse(storeCart);
        storeCart = JSON.parse(parseStoreCart);
    }

    const deleteProductOfCart = (id) => {
        dispatch(deleteProduct(id));
        render ? setRender(false) : setRender(true)
    }

    if (storeCart.length === 0) {
        localStorage.removeItem("cart-products")
    }
    // console.log(store
    return (
        <div className="container--cart">
            <div className="cart">
                {storeCart.length === 0 ? <h1 className="cart-title">No hay productos en el carrito</h1> : 
                    <>
                        {storeCart.map((data ,i) => 
                        <section key={i} className="cart--container-product">
                            <img className="cart--product-image" src={data.image} alt={`${data.name}`} />
                            <div className="cart--container-text">
                                <p className="cart--product-name">{data.name}</p>
                                <p className="cart--product-price">${data.price}.00</p>
                                <MdRemoveShoppingCart onClick={() => deleteProductOfCart(data.id)} className="product--delete-icon" />
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
