import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../api/cryptoApi";

export const store = configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(cryptoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
