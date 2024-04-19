import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({...props}) => {
    return (
        <div className='searchbar'>
            <input className='searchbar__input' type="text" placeholder="Zoeken..." {...props}></input>
            <FontAwesomeIcon icon={faSearch} className='searchbar__icon'/>
        </div>  
    )
}

export default SearchBar