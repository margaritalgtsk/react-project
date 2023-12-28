import {createSlice} from "@reduxjs/toolkit";
import {fetchAutocomplete} from "../../asyncAction/fetchAutocomplete";
import {ISearchAutocomplete} from "../../types/types";

interface IAutocompleteState {
    value: ISearchAutocomplete[];
    error: string | undefined;
}

const initialState: IAutocompleteState = {
    value: [],
    error: ''
};

export const autocompleteSlice = createSlice({
    name: 'autocomplete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAutocomplete.pending, (state) => {
                state.error = '';
            })
            .addCase(fetchAutocomplete.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(fetchAutocomplete.rejected, (state, action) => {
                state.error = action.payload;
            })
    },
});

export const selectAutocomplete = (state: {autocomplete: {value: ISearchAutocomplete[]}}) => state.autocomplete.value;
export const selectErrorAutocomplete = (state: {autocomplete: {error: string | undefined}}) => state.autocomplete.error;
export default autocompleteSlice.reducer;