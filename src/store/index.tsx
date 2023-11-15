import {combineReducers} from "redux";
import {configureStore} from '@reduxjs/toolkit'
import favoriteSlice from "./slices/favoriteSlice";
import searchGifsSlice from "./slices/searchGifsSlice";
import autocompleteSlice from "./slices/autocompleteSlice";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";

const rootReducer = combineReducers({
    searchGifs: searchGifsSlice,
    favorites: favoriteSlice,
    autocomplete: autocompleteSlice
});

const preloadedState = loadFromLocalStorage();

const store = configureStore({
    reducer: rootReducer,
    preloadedState
});

store.subscribe(() => {
    saveToLocalStorage({
        favorites: store.getState().favorites
    })
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;