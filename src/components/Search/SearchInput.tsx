import React, {FC} from 'react';
import classes from './Search.module.css';

interface ISearchInputProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchInput: FC<ISearchInputProps> = ({query, setQuery}) => {

    return (
        <input className={classes.searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Please, enter the title of the animal...'
        />
    );
};

export default SearchInput;