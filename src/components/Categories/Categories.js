import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../services/productServices';
import FilterProducts from '../Products/FilterProducts/FilterProducts';
import ListProducts from '../Products/ListProducts/ListProducts';
import { setData } from '../../features/slices/filterProducts';
const Categories = (params) => {
    let categoryName = params.location.pathname.split("/");
    const dispatch = useDispatch();
    useEffect(() => {
        const getData = async () => {
            try {
                let getProducts = await getAllProducts();
                dispatch(setData(getProducts.filter(data => data.category.toLowerCase() === categoryName[categoryName.length - 1])));
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [categoryName])

    return (
        <main>
            <div className='container--link-history'>
                <Link className='link-history' to="/">HOME/</Link>
                <p className='link-history'>CATEGORIAS</p>
            </div>
            <div className='container--products--filter-page'>
                <FilterProducts />
                <ListProducts /> 
            </div>
        </main>     
    )
};

export default Categories;
