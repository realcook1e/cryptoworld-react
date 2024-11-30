interface CryptoApiResponse<T> {
	status: "success";
	data: T;
}

interface CoinsData {
	stats: CoinsStats;
	coins: Coin[];
}

interface CoinsStats {
	total: number;
	totalCoins: number;
	totalMarkets: number;
	totalExchanges: number;
	totalMarketCap: string;
	total24hVolume: string;
}

interface Coin {
	uuid: string;
	symbol: string;
	name: string;
	color: string;
	iconUrl: string;
	marketCap: string;
	price: string;
	listedAt: number;
	tier: number;
	change: string;
	sparkline: Array<string | null>;
	rank: number;
	lowVolume: boolean;
	coinrankingUrl: string;
	"24hVolume": string;
	btcPrice: string;
}

interface CoinLink {
	name: string;
	url: string;
	type: string;
}

interface CoinSupply {
	confirmed: boolean;
	supplyAt: number;
	max: string;
	total: string;
	circulating: string;
}

interface CoinExtended extends Coin {
	description: string;
	websiteUrl: string;
	links: CoinLink[];
	supply: CoinSupply;
	numberOfMarkets: number;
	numberOfExchanges: number;
	fullyDilutedMarketCap: string;
	priceAt: number;
	allTimeHigh: {
		price: string;
		timestamp: number;
	};
	hasContent: boolean;
	tags: string[];
}

interface GlobalStats extends Omit<CoinsStats, "total"> {
	referenceCurrencyRate: number;
	btcDominance: number;
	bestCoins: Pick<
		Coin,
		"uuid" | "name" | "symbol" | "iconUrl" | "coinrankingUrl"
	>[];
	newestCoins: Pick<
		Coin,
		"uuid" | "name" | "symbol" | "iconUrl" | "coinrankingUrl"
	>[];
}

export type CoinsResponse = CryptoApiResponse<CoinsData>;
export type CoinResponse = CryptoApiResponse<{ coin: CoinExtended }>;
export type StatsResponse = CryptoApiResponse<GlobalStats>;
