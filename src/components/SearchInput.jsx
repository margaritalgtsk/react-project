import React from 'react';

const SearchInput = ({query, setQuery}) => {

    return (
        <input className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Please, enter the title of the animal...'
        />
    );
};

export default SearchInput;