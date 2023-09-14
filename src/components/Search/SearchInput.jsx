import React from 'react';
import classes from './Search.module.css';

const SearchInput = ({query, setQuery}) => {

    return (
        <input className={classes.searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Please, enter the title of the animal...'
        />
    );
};

export default SearchInput;