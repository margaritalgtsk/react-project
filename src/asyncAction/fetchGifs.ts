import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchGifs = createAsyncThunk(
    "searchGifs/fetchGifs",
    async ({searchQuery, offset = 0}: {searchQuery: string, offset?: number}) => {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=yeHqYTRQ2ty3VRbvFi0sJBAVC1Eah5kc&q=${searchQuery}&limit=9&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`);
        return response.data;
});