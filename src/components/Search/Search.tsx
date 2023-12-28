import React, {useEffect, useState} from 'react';
import {Tabs, Switch} from 'antd';
import {TabsProps} from 'antd';
import SearchInput from "./SearchInput";
import Autocomplete from "../Autocomplete/Autocomplete";
import {useKeyboardNav} from "../../hooks/useKeyboardNav";
import {IPageCurrent, ISearchAutocomplete} from "../../types/types";
import {useDebounce} from "../../hooks/useDebounce";
import GifsCardView from "../Gifs/GifsCardView";
import {fetchGifs} from "../../asyncAction/fetchGifs"
import {fetchAutocomplete} from "../../asyncAction/fetchAutocomplete";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import GifsTableView from '../Gifs/GifsTableView';
import useLocalStorage from "../../hooks/useLocalStorage";
import classes from "./Search.module.css";
import {selectFavorites} from "../../store/slices/favoriteSlice";
import {selectErrorGifs, selectSearchGifs, selectStatusGifs} from "../../store/slices/searchGifsSlice";
import {selectAutocomplete} from "../../store/slices/autocompleteSlice";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedValue = useDebounce<string>(searchQuery, 500);

    const [isShowAutocomplete, setIsShowAutocomplete] = useState<boolean>(false);
    const [isTableView, setIsTableView] = useLocalStorage<boolean>("isTableView", false);
    const [pageCurrent, setPageCurrent] = useState<IPageCurrent>({pageSearch: 1, pageFavorite: 1});

    const favorites = useAppSelector(selectFavorites);
    const searchGifs = useAppSelector(selectSearchGifs);
    const statusGifs = useAppSelector(selectStatusGifs);
    const errorGifs = useAppSelector(selectErrorGifs);
    const searchAutocomplete = useAppSelector(selectAutocomplete);
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

    const GifsView = isTableView ? GifsTableView : GifsCardView;

    const items: TabsProps['items'] = [
        {
            key: 'searchResults',
            label: 'Search results',
            children: <GifsView results={searchGifs} searchQuery={searchQuery} isSearchResult={true} pageCurrent={pageCurrent} setPageCurrent={setPageCurrent} />,
        },
        {
            key: 'favorites',
            label: `Favorites (${favorites.length})`,
            children: <GifsView results={favorites} searchQuery={searchQuery} isSearchResult={false} pageCurrent={pageCurrent} setPageCurrent={setPageCurrent} />,
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
            {statusGifs === 'loading' && <h2>Loading...</h2>}
            {errorGifs && <h2 className={classes.errorMessage}>An error occurred: {errorGifs}</h2>}
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

export default Search;