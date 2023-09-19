import React, {FC} from 'react';
import classes from './Search.module.css';

interface SearchInputProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({query, setQuery}) => {

    return (
        <input className={classes.searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Please, enter the title of the animal...'
        />
    );
};

export default SearchInput;