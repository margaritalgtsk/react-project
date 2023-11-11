import React, {useEffect, useState} from 'react';
import {Tabs, Switch} from 'antd';
import {TabsProps} from 'antd';
import SearchInput from "./SearchInput";
import Autocomplete from "../Autocomplete/Autocomplete";
import {useKeyboardNav} from "../../hooks/useKeyboardNav";
import {ISearchAutocomplete} from "../../types/types";
import {useDebounce} from "../../hooks/useDebounce";
import GifsResult from "../Gifs/GifsResult";
import GifsFavorites from "../Gifs/GifsFavorites";
import {fetchGifs} from "../../asyncAction/fetchGifs"
import {fetchAutocomplete} from "../../asyncAction/fetchAutocomplete";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import GifsResultTable from '../Gifs/GifsResultTable';
import GifsFavoritesTable from "../Gifs/GifsFavoritesTable";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import classes from "./Search.module.css";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedValue = useDebounce<string>(searchQuery, 500);

    const [isShowAutocomplete, setIsShowAutocomplete] = useState<boolean>(false);
    const [isTableView, setIsTableView] = useLocalStorage("isTableView", false);

    const favorites = useAppSelector((state) => state.favorites.favorites);
    const searchGifs = useAppSelector((state) => state.searchGifs.value);
    const searchAutocomplete = useAppSelector((state) => state.autocomplete.value);
    const dispatch = useAppDispatch();

    const updateData = (value: ISearchAutocomplete) => {
        let searchQuery = value.name;
        dispatch(fetchGifs({searchQuery}));
        setSearchQuery(value.name);
        setIsShowAutocomplete(false);
    };

    const [handleKeyDown, selectedIndex] = useKeyboardNav<ISearchAutocomplete>(searchAutocomplete, updateData);

    useEffect(() => {
        dispatch(fetchAutocomplete({searchQuery}));
    }, [debouncedValue]);

    const handleChangeSwitch = (checked: boolean) => {
        setIsTableView(checked);
    };

    const GifsResultView = isTableView ? GifsResultTable : GifsResult;
    const GifsFavoritesView = isTableView ? GifsFavoritesTable : GifsFavorites;

    const items: TabsProps['items'] = [
        {
            key: 'searchResults',
            label: 'Search results',
            children: <GifsResultView results={searchGifs} searchQuery={searchQuery}/>,
        },
        {
            key: 'favorites',
            label: `Favorites (${favorites.length})`,
            children: <GifsFavoritesView favorites={favorites}/>,
        },
    ];

    return (
        <div className={classes.searchWrapper} onKeyDown={handleKeyDown}>
            <SearchInput query={searchQuery} setQuery={setSearchQuery} setIsShowAutocomplete={setIsShowAutocomplete} />
            {isShowAutocomplete &&
                <Autocomplete query={searchQuery}
                              results={searchAutocomplete}
                              updateData={updateData}
                              selectedIndex={selectedIndex}
                />}
            <br />
            <Switch className={classes.switchView} checkedChildren="Table View" unCheckedChildren="Card View" checked={isTableView} onChange={handleChangeSwitch} />
            <Tabs defaultActiveKey="1" items={items}/>
        </div>
    );
};

export default Search;