import {createSlice} from "@reduxjs/toolkit";
import {fetchGifs} from "../../asyncAction/fetchGifs";
import {ISearchGif} from "../../types/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

interface ISearchGifsState {
    value: ISearchGif[];
    total: number;
    status: string;
    error: string | undefined;
}

const initialState: ISearchGifsState = {
    value: [],
    total: 0,
    status: '',
    error: ''
};

export const searchGifSlice = createSlice({
    name: 'searchGifs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchGifs.pending, (state) => {
            state.status = 'loading';
            state.error = '';
        })
        .addCase(fetchGifs.fulfilled, (state, action: PayloadAction<{ data: ISearchGif[], pagination: { total_count: number } }>) => {
            state.value = action.payload.data;
            state.total = action.payload.pagination.total_count;
            state.status = 'resolved';
        })
        .addCase(fetchGifs.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
    },
});

export const selectSearchGifs = (state: {searchGifs: {value: ISearchGif[]}}) => state.searchGifs.value;
export const selectTotalGifs = (state: {searchGifs: {total: number}}) => state.searchGifs.total;
export const selectStatusGifs = (state: {searchGifs: {status: string}}) => state.searchGifs.status;
export const selectErrorGifs = (state: {searchGifs: {error: string | undefined}}) => state.searchGifs.error;
export default searchGifSlice.reducer;