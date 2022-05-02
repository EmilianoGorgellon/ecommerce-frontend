import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductByName } from "../../services/productServices";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/slices/cart';
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
const Product = (props) => {
    const dispatch = useDispatch();
    const name = props.location.pathname.split("/");
    const [data, setData] = useState([])
    const [selectImage, setSelectImage] = useState(0);
    useEffect(async () => {
        setData(await getProductByName(name[name.length - 1]));
    }, [])
    let window_width = window.innerWidth;
    
    const addProductToCart = (id, image, name, price) => {
        dispatch(addProduct({id, image, name, price}))
    }

    return (
        <main>
            <div className='container--link-history'>
                <Link className='link-history' to="/">HOME/</Link>
                <p className='link-history'>PRODUCTO</p>
            </div>
            {data.map(dato =>
                <section key={dato.id} className='container--product'>
                    {window_width > 768 ?
                        <div className='product--images-desktop'>
                            <div className='container--images-side'>
                                {dato.image.map((image, i) => <img onMouseEnter={() => setSelectImage(i)} className={i === selectImage ? 'images-side images-side-active' : 'images-side'} key={i} src={`${image}`} alt={`${dato.name[i]}`} />)}
                            </div>
                            <div className='container--product-image'>
                                <img className='product-image' src={`${dato.image[selectImage]}`} alt={`${dato.name}`} />
                            </div>
                        </div>
                        :
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                        >
                            {dato.image.map((image, i) =>
                                <SwiperSlide key={i} className="container--image">
                                    <img className="image" src={`${image}`} alt={`${i}`} />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    }
                    <div className='container--product-information'>
                        <h2 className='product--informacion-name'>{dato.name}</h2>
                        <p className='product--informacion-price'>$ {dato.price},00</p>
                        <div className='product-container--buttons'>
                            <button className='link-payment' onClick={() => addProductToCart(dato.id, dato.image, dato.name, dato.price)}><Link to="/payment" className='link-payment'>Comprar</Link></button>
                            <button className='product-button' onClick={() => addProductToCart(dato.id, dato.image, dato.name, dato.price)}>Agregar <AiOutlineShoppingCart /></button>
                        </div>
                        <p className={dato.stock > 0 ? "product--informacion-stock stock" : "product--informacion-stock no-stock"}>{dato.stock > 0 ? `Stock: ${dato.stock} unidades` : 'No hay stock de este producto'} </p>
                        <p className='product--informacion-description'>{dato.description}</p>
                    </div>
                </section>
            )}
        </main>
    );
};

export default Product;
