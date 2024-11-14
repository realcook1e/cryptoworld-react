interface SuccessResponse<T> {
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

export type CoinsResponse = SuccessResponse<CoinsData>;