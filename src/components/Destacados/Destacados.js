import { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/product_services';
import { Link } from 'react-router-dom';
import { MdOutlineAddShoppingCart, MdModeEdit } from "react-icons/md";
import { useDispatch } from 'react-redux';
import  { addProduct } from "../../features/slices/cart/index";
import { getTokenFromCookie } from '../../features/slices/token';
import { useSelector } from 'react-redux';
import { getRoleView } from '../../services/user_services';
// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
const Destacados = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [roleView, setRoleView] = useState(false);
    const token = useSelector(state => state.getToken);
    const dispatch = useDispatch();

    useEffect(() => {
        const getDataProducts = async () => {
            try {
                setDataProducts(await getAllProducts());
            } catch (error) {
                console.log(error);
            }
        }

        const getRole = async () => {
            dispatch(getTokenFromCookie());
            if (token !== undefined && token !== "") {
                setRoleView(await getRoleView(token));
            }
        }
        getDataProducts();
        getRole();
    }, []);

    const addProductToShoppingCart = (_id, imagesUrl, name, price, e) => {
        e.preventDefault();
        dispatch(addProduct({_id, imagesUrl, name, price}))
    }
    console.log("veo role")
    console.log(roleView);
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
                            {roleView && <Link to={`/backoffice/${dato._id}`}><MdModeEdit /></Link>}
                            <h3 className='item--name'>{`${dato.name}`}</h3>
                            <p className='item--price'>{`$ ${dato.price},00`}</p>
                            <button className='item--button' onClick={(e) => addProductToShoppingCart(dato._id, dato.imagesUrl, dato.name, dato.price, e)}>Agregar <MdOutlineAddShoppingCart className='item--icon-shop'/></button>
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
            {roleView && <MdModeEdit />}
        </div>
    )
}

export default Destacados;