import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addProduct } from '../../../features/slices/cart';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const ListProducts = (params) => {
    const dispatch = useDispatch();
    const addProductToCart = (_id, imagesUrl, name, price, e) => {
        e.preventDefault();
        dispatch(addProduct({_id, imagesUrl, name, price}));
    }
    const data = useSelector(state => state.filterProducts);
    
    return (
        <div className='container--products-page'>
            {data.map(dato =>
                <Link key={dato._id} to={`/product/${dato.name}`} className='link-to-page'>
                    <section className='container--product-page' >
                        <div className='container--product--image-page'>
                            <img className='product--image' src={dato.imagesUrl[0]} alt={`${dato.name}`} />
                        </div>
                        <div className='container--product-text'>
                            <h3 className='product-text-name'>{dato.name}</h3>
                            <p className='product-text-price'>${dato.price}, 00</p>
                            <p className={dato.stock > 0 ? "stock" : "no-stock"}>{dato.stock !== 0 ? `En stock` : `Sin stock`}</p>
                            <div className='container--buttons-product'>
                                <button className='link-payment' onClick={(e) => addProductToCart(dato._id, dato.imagesUrl, dato.name, dato.price, e)}><Link to="/payment" className='link-payment'>Comprar</Link></button>
                                {/* <Link to="/payment" className='link-payment' onClick={(e) => send_product(dato.id, dato.image, dato.name, dato.price, e)}>Comprar</Link> */}
                                <button className='button-cart' onClick={(e) => addProductToCart(dato._id, dato.imagesUrl, dato.name, dato.price, e)}>Agregar <AiOutlineShoppingCart /></button>
                            </div>
                        </div>
                    </section>
                </Link>
            )}
        </div>
    )
};

export default ListProducts;
