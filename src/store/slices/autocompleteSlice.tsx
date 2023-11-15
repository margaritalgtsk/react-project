import {createSlice} from "@reduxjs/toolkit";
import {fetchAutocomplete} from "../../asyncAction/fetchAutocomplete";
import {ISearchAutocomplete} from "../../types/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

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
        builder.addCase(fetchAutocomplete.fulfilled, (state, action: PayloadAction<ISearchAutocomplete[]>) => {
            state.value = action.payload;
        })
    },
});

export const selectAutocomplete = (state: {autocomplete: IAutocompleteState}) => state.autocomplete.value;
export default autocompleteSlice.reducer;