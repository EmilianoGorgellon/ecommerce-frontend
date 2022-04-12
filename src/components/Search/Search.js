import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../../services/productServices';
import { Link } from 'react-router-dom';
import FilterProducts from '../Products/FilterProducts/FilterProducts';
import ListProducts from '../Products/ListProducts/ListProducts';
import { useDispatch } from 'react-redux';
import { setData } from '../../features/slices/filterProducts';
const Search = (params) => {
    const { searchProducts } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getAllProducts();
                const filterData = data.filter(dato => dato.name.toLowerCase().includes(searchProducts.toLowerCase()));
                dispatch(setData(filterData));
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [searchProducts])

   

    return (
        <main>
            <div className='container--link-history'>
                <Link className='link-history' to="/">HOME/</Link>
                <p className='link-history'>BUSQUEDAS</p>
            </div>
            <div className='container--products--filter-page'>
                <FilterProducts />
                <ListProducts /> 
            </div>
        </main>     
    )
}

export default Search;
