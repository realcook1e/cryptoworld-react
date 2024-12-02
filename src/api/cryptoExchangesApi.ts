import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ExchangeItem } from "./types/exchanges.types";

const baseUrl = "https://674ca89b54e1fca9290d3888.mockapi.io";

export const cryptoExchangesApi = createApi({
	reducerPath: "cryptoExchangesApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
	}),
	endpoints: builder => ({
		getExchanges: builder.query<ExchangeItem[], void>({
			query: () => "/exchanges",
		}),
	}),
});

export const { useGetExchangesQuery } = cryptoExchangesApi;
