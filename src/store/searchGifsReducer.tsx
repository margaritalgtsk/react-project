import {createSlice} from "@reduxjs/toolkit";
import {fetchGifs} from "../asyncAction/fetchGifs";
import {ISearchGif} from "../types/types";

interface ISearchGifsState {
    value: ISearchGif[];
    total: number;
};

const initialState: ISearchGifsState = {
    value: [],
    total: 0
};

export const searchGifSlice = createSlice({
    name: 'searchGifs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchGifs.fulfilled, (state, action) => {
            state.value = action.payload.data;
            state.total = action.payload.pagination.total_count;
        });
    },
});

export default searchGifSlice.reducer;