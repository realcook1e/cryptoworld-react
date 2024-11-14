import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import {
	PageLayout,
	Home,
	Exchanges,
	Currency,
	CurrencyDetails,
	News,
} from "./pages";

const App: FC = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<PageLayout />}
			>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path='exchanges'
					element={<Exchanges />}
				/>
				<Route
					path='currency'
					element={<Currency />}
				/>
				<Route
					path='currency/:coinId'
					element={<CurrencyDetails />}
				/>
				<Route
					path='news'
					element={<News />}
				/>
			</Route>
		</Routes>
	);
};

export default App;
