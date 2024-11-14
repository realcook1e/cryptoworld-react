import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinsResponse } from "./api.types";

const baseUrl = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
	reducerPath: "cryptoApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: headers => {
			headers.set(
				"x-rapidapi-key",
				"6f2af9e3a2msh62f1885848ce393p162b9bjsnf06914c50d17"
			);
			headers.set("x-rapidapi-host", "coinranking1.p.rapidapi.com");
		},
	}),
	endpoints: builder => ({
		getCryptos: builder.query<CoinsResponse, void>({
			query: () => "/coins",
		}),
	}),
});

export const { useGetCryptosQuery } = cryptoApi;
