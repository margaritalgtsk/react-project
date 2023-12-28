import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ISearchGif} from "../types/types";

interface MyData {
    data: ISearchGif[];
    pagination: {
        total_count: number;
    };
}

interface GifsQueryParams {
    searchQuery: string,
    offset?: number
}

export const fetchGifs = createAsyncThunk<
    MyData,
    GifsQueryParams,
    {
        rejectValue: string
    }
>('searchGifs/fetchGifs', async ({searchQuery, offset = 0}, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=yeHqYTRQ2ty3VRbvFi0sJBAVC1Eah5kc&q=${searchQuery}&limit=9&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.message);
        } else {
            return rejectWithValue("Server Error!!");
        }
    }
});