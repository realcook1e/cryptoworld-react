import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsResponse } from "./types/news.types";

const baseUrl = "https://news-api14.p.rapidapi.com/v2";

export const cryptoNewsApi = createApi({
	reducerPath: "cryptoNewsApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: headers => {
			headers.set(
				"x-rapidapi-key",
				"6f2af9e3a2msh62f1885848ce393p162b9bjsnf06914c50d17"
			);
			headers.set("x-rapidapi-host", "news-api14.p.rapidapi.com");
		},
	}),
	endpoints: builder => ({
		getNews: builder.query<NewsResponse, { query: string; count: number }>(
			{
				query: ({ query, count }) =>
					`/search/articles?query=${query}&language=en&limit=${count}`,
			}
		),
	}),
});

export const { useGetNewsQuery } = cryptoNewsApi;
