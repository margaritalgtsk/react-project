import {createSlice} from "@reduxjs/toolkit";
import {fetchGifs} from "../../asyncAction/fetchGifs";
import {ISearchGif} from "../../types/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

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
        .addCase(fetchGifs.fulfilled, (state, action: PayloadAction<{ data: ISearchGif[], pagination: { total_count: number } }>) => {
            state.value = action.payload.data;
            state.total = action.payload.pagination.total_count;
        });
    },
});

export const selectSearchGifs = (state: {searchGifs: {value: ISearchGif[]}}) => state.searchGifs.value;
export const selectTotalGifs = (state: {searchGifs: {total: number}}) => state.searchGifs.total;
export default searchGifSlice.reducer;