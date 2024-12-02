import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	CoinHistoryResponse,
	CoinResponse,
	CoinsResponse,
	StatsResponse,
} from "./types/crypto.types";

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
		getCryptos: builder.query<
			CoinsResponse,
			{ count: number; searchTerm: string }
		>({
			query: ({ count, searchTerm }) =>
				`/coins?limit=${count}&search=${searchTerm}`,
		}),
		getStats: builder.query<StatsResponse, void>({
			query: () => "/stats",
		}),
		getCryproDetails: builder.query<CoinResponse, string>({
			query: coinId => `/coin/${coinId}`,
		}),
		getCryproHistory: builder.query<
			CoinHistoryResponse,
			{ coinId: string; timePeriod: string }
		>({
			query: ({ coinId, timePeriod }) =>
				`/coin/${coinId}/history?timePeriod=${timePeriod}`,
		}),
	}),
});

export const {
	useGetCryptosQuery,
	useGetStatsQuery,
	useGetCryproDetailsQuery,
	useGetCryproHistoryQuery,
} = cryptoApi;
