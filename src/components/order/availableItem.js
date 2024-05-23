import React, { useContext } from 'react';
import CartContext from '../../store/cartContext';

const FilteredBlogs = ({plant}) => {
    const cartCtx = useContext(CartContext);

    function handleAddPlantToCart() {
        cartCtx.addItem(plant);
    }

    return (
        <div className="post-item post-item--static">
            <div className="post-item__img">
                <img src={plant.availableimage.url} alt={plant.alt}/>
            </div>
            <div className="post-item__content">
                <span>{plant.amount}</span>
                <h2>{plant.title}</h2>
                <p>{plant.date}</p>
                <button className="button button--cta" onClick={handleAddPlantToCart}>Toevoegen aan winkelwagen</button>
            </div>                      
        </div>   
    )
}

export default FilteredBlogs