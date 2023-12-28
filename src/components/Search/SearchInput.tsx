import React, {ChangeEvent, FC} from 'react';
import classes from './SearchInput.module.css';
import {fetchGifs} from "../../asyncAction/fetchGifs";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectErrorAutocomplete} from "../../store/slices/autocompleteSlice";

interface ISearchInputProps {
    query: string;
    setQuery: (query: string) => void;
    setIsShowAutocomplete: (isShowAutocomplete: boolean) => void;
}

const SearchInput: FC<ISearchInputProps> = ({query, setQuery, setIsShowAutocomplete}) => {

    const errorAutocomplete = useAppSelector(selectErrorAutocomplete);
    const dispatch = useAppDispatch();

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setIsShowAutocomplete(true);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            let searchQuery = (event.target as HTMLInputElement).value;
            dispatch(fetchGifs({searchQuery}));
            setIsShowAutocomplete(false);
        }
    };

    return (
        <>
            <input className={classes.searchInput}
                   value={query}
                   onChange={inputChange}
                   placeholder='Please, enter the title of the animal...'
                   onKeyPress={handleKeyPress}
            />
            {errorAutocomplete && <h2 className={classes.errorMessage}>Autocomplete error occurred: {errorAutocomplete}</h2>}
        </>
    );
};

export default SearchInput;