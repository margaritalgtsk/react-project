import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {ISearchGif} from "../../types/types";

interface IFavoriteGifsState {
    favorites: ISearchGif[];
};

const initialState: IFavoriteGifsState = {
    favorites: [],
};

export const favoriteGifsSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavoriteGifs: (state, action: PayloadAction<ISearchGif>) => {
            state.favorites.push(action.payload);
        },
        removeFavoriteGifs: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload)
        },
    },
});

export const {addFavoriteGifs, removeFavoriteGifs} = favoriteGifsSlice.actions;
export const selectFavorites = (state: {favorites: IFavoriteGifsState}) => state.favorites.favorites;
export default favoriteGifsSlice.reducer;