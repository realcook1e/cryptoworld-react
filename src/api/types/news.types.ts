interface NewsApiResponse<T> {
	success: true;
	size: number;
	totalHits: number;
	hitsPerPage: number;
	page: number;
	totalPages: number;
	timeMs: number;
	data: T;
}

interface NewsArticle {
	title: string;
	url: string;
	excerpt: string;
	thumbnail: string;
	language: string;
	paywall: boolean;
	contentLength: number;
	date: string;
	authors: string[];
	keywords: string[];
	publisher: {
		name: string;
		url: string;
		favicon: string;
	};
}

export type NewsResponse = NewsApiResponse<NewsArticle[]>;
