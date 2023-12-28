import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ISearchAutocomplete} from "../types/types";

interface AutocompleteQueryParams {
        searchQuery: string,
}

export const fetchAutocomplete = createAsyncThunk<
    ISearchAutocomplete[],
    AutocompleteQueryParams,
    {
            rejectValue: string
    }
>('autocomplete/fetchAutocomplete', async ({searchQuery}, { rejectWithValue }) => {
        try {
                const response = await axios.get(`https://api.giphy.com/v1/gifs/search/tags?api_key=yeHqYTRQ2ty3VRbvFi0sJBAVC1Eah5kc&q=${searchQuery}&limit=5&offset=0`);
                return response.data.data;
        } catch (error) {
                if (axios.isAxiosError(error)) {
                        return rejectWithValue(error.message);
                } else {
                        return rejectWithValue("Server Error!!");
                }
        }
});