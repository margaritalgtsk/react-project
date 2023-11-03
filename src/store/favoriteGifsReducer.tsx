import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {IFavoriteGif} from "../types/types";

interface IFavoriteGifsState {
    favorites: IFavoriteGif[];
};

const initialState: IFavoriteGifsState = {
    favorites: [],
};

export const favoriteGifsSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavoriteGifs: (state, action: PayloadAction<IFavoriteGif>) => {
            state.favorites.push(action.payload);
        },
        removeFavoriteGifs: (state, action: PayloadAction<{id: string}>) => {
            const {id} = action.payload;
            state.favorites = state.favorites.filter(item => item.id !== id)
        },
    },
});

export const {addFavoriteGifs, removeFavoriteGifs} = favoriteGifsSlice.actions;
export default favoriteGifsSlice.reducer;