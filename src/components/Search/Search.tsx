import React, {useEffect, useState} from 'react';
import SearchInput from "./SearchInput";
import Autocomplete from "../Autocomplete/Autocomplete";
import {useKeyboardNav} from "../../hooks/useKeyboardNav";
import {IGetAutocompleteResponse, ISearchAutocomplete} from "../../types/types";
import axios from "axios";
import {useDebounce} from "../../hooks/useDebounce";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedValue = useDebounce<string>(searchQuery, 500);

    const [searchAutocomplete, setSearchAutocomplete] = useState<ISearchAutocomplete[]>([]);

    const updateData = (value: ISearchAutocomplete) => {
        setSearchQuery(value.name);
    }

    const [handleKeyDown, selectedIndex] = useKeyboardNav<ISearchAutocomplete>(searchAutocomplete, updateData);

    useEffect(() => {
        fetchGifs();
    }, [debouncedValue])

    async function fetchGifs() {
        try {
            const response = await axios.get<IGetAutocompleteResponse>(`https://api.giphy.com/v1/gifs/search/tags?api_key=yeHqYTRQ2ty3VRbvFi0sJBAVC1Eah5kc&q=${searchQuery}&limit=15&offset=0`)
            setSearchAutocomplete(response.data.data);
        } catch (e) {
            alert(e)
        }
    }


    return (
        <div onKeyDown={handleKeyDown}>
            <SearchInput query={searchQuery} setQuery={setSearchQuery} />
            {searchQuery &&
            <Autocomplete query={searchQuery}
                          results={searchAutocomplete}
                          updateData={updateData}
                          selectedIndex={selectedIndex}
            />
            }
        </div>
    );
};

export default Search;