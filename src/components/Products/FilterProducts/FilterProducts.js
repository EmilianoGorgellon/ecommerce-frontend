import React, { useRef } from 'react';
import { filterByOrder, filterByPrice } from '../../../features/slices/filterProducts';
import { useDispatch, useSelector } from 'react-redux';
const FilterProducts = () => {
    const dispatch = useDispatch();
    let data = useSelector(state => state.filterProducts);
    const priceMinInput = useRef();
    const priceMaxInput = useRef();

    const handleChanged = (e) => {
        let valueSelect = Number(e.target.value);
        dispatch(filterByOrder({data, valueSelect}));
    }

    const filterPriceByButton = (priceMin, priceMax) => {
        dispatch(filterByPrice({priceMin, priceMax}));
    }

    const filterPriceByInput = (e) => {
        let priceMin = priceMinInput.current.value;
        let priceMax = priceMaxInput.current.value;
        if (e.code === 'Enter' || e.code === "NumpadEnter") return dispatch(filterByPrice({priceMin, priceMax}))
    }

    return (
        <aside className='container--filter-page'>
            <h2 className='title-filter'>Filtros</h2>
            <select className='filter--select' onChange={handleChanged}>
                <option value="">Filtar productos por ...</option>
                <option value="1">Mayor a menor precio</option>
                <option value="2">Menor a mayor precio</option>
                <option value="3">Ordenar alfabeticamente A-Z</option>
                <option value="4">Ordenar alfabeticamente Z-A</option>
            </select>
            <h3 className='title-filter'>Precios</h3>
            <ul className='container--filter-prices'>
                <li className='filter--prices-text' onClick={() => filterPriceByButton(1000, 4500)}>$1.000 a $4.500</li>
                <li className='filter--prices-text' onClick={() => filterPriceByButton(1000, null)}>Hasta $1.000</li>
                <li className='filter--prices-text' onClick={() => filterPriceByButton(4500, null)}>Mas de $4.500</li>
                <li className='container--prices-min-max'>
                    <input className='input--min-max' type="number" placeholder='Minimo' ref={priceMinInput} onKeyPress={(e) => filterPriceByInput(e)} />
                    <input className='input--min-max' type="number" placeholder='Maximo' ref={priceMaxInput} onKeyPress={(e) => filterPriceByInput(e)} />
                </li>
            </ul>
        </aside>
    )
};

export default FilterProducts;
