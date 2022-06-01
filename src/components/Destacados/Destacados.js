import { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/productServices';
import { Link } from 'react-router-dom';
import {MdOutlineAddShoppingCart} from "react-icons/md";
import { useDispatch } from 'react-redux';
import  { addProduct } from "../../features/slices/cart/index";
// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
const Destacados = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [moveElements, setMoveElements] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            try {
                setDataProducts(await getAllProducts());
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [])

    // const moveToLeft = () => {
    //     if ((moveElements / 100) - 4 === 0 || moveElements / 100 === 0){
    //         setTimeout(() => setMoveElements(0), 400)
    //         return setMoveElements(moveElements + 25);
    //     }
    //     setMoveElements(moveElements + 100)
    // }

    // const moveToRight = () => {
    //     if (Math.abs((moveElements / 100)) + 4 === (window.innerWidth > 768 ? dataProducts.length + 1 : dataProducts.length + 2)){
    //         setTimeout(() => setMoveElements(-(dataProducts.length * 100 - 400)), 400)
    //         return setMoveElements(moveElements - 25);
    //     } 
    //     setMoveElements(moveElements - 100)
    // }
    console.log(window.innerWidth)
    const addProductToShoppingCart = (_id, imagesUrl, name, price) => {
        dispatch(addProduct({_id, imagesUrl, name, price}))
    }   
    return (
        <div className='container--destacados'> 
            <h1 className='title--destacados'> Productos destacados</h1> 
                    <Swiper
                        slidesPerView={window.innerWidth > 768 ? 4 : 1}
                        spaceBetween={30}
                        slidesPerGroup={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                    >
                        {dataProducts.map((dato,i) => 
                            <SwiperSlide className='container--item'  key={`${i}`} >
                                <Link to={`/product/${dato.name}`} className="item--link">
                                    <img className='item--image' src={`${dato.imagesUrl[0]}`} alt={`${dato.name}-`} />
                                    <h3 className='item--name'>{`${dato.name}`}</h3>
                                    <p className='item--price'>{`$ ${dato.price},00`}</p>
                                    <button className='item--button' onClick={() => addProductToShoppingCart(dato._id, dato.imagesUrl, dato.name, dato.price)}>Agregar <MdOutlineAddShoppingCart className='item--icon-shop'/></button>
                                </Link>
                            </SwiperSlide>
                        )}
                    </Swiper>
        </div>
    )
}

export default Destacados;