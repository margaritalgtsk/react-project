import {combineReducers} from "redux";
import {configureStore} from '@reduxjs/toolkit'
import favoriteGifsReducer from "./favoriteGifsReducer";
import searchGifsReducer from "./searchGifsReducer";
import autocompleteReducer from "./autocompleteReducer";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";

const rootReducer = combineReducers({
    searchGifs: searchGifsReducer,
    favorites: favoriteGifsReducer,
    autocomplete: autocompleteReducer
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