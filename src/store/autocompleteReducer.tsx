import {createSlice} from "@reduxjs/toolkit";
import {fetchAutocomplete} from "../asyncAction/fetchAutocomplete";
import {ISearchAutocomplete} from "../types/types";

interface IAutocompleteState {
    value: ISearchAutocomplete[];
};

const initialState: IAutocompleteState = {
    value: [],
};

export const autocompleteSlice = createSlice({
    name: 'autocomplete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAutocomplete.fulfilled, (state, action) => {
            state.value = action.payload;
        })
    },
});

export default autocompleteSlice.reducer;