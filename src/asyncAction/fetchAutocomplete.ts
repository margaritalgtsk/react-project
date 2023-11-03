import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchAutocomplete = createAsyncThunk(
    "autocomplete/fetchAutocomplete",
    async ({searchQuery}: {searchQuery: string}) => {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search/tags?api_key=yeHqYTRQ2ty3VRbvFi0sJBAVC1Eah5kc&q=${searchQuery}&limit=5&offset=0`);
        return response.data.data;
});