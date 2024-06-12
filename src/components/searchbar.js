import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FadeIn from './animation/fadeIn';

const SearchBar = ({...props}) => {
    return (
        <FadeIn className='searchbar'>
            <input className='searchbar__input' type="text" placeholder="Zoeken..." {...props}></input>
            <FontAwesomeIcon icon={faSearch} className='searchbar__icon'/>
        </FadeIn>  
    )
}

export default SearchBar