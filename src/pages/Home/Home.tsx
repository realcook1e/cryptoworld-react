import { FC } from "react";
import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";

import { useGetStatsQuery } from "../../api/cryptoApi";
import News from "../News/News";
import Currency from "../Currency/Currency";
import styles from "./styles.module.scss";

const { Title } = Typography;

const Home: FC = () => {
	const { data, isLoading } = useGetStatsQuery();
	const globalStats = data?.data;

	if (isLoading) {
		return "Loading..."; //TODO: Add spinner
	}

	return (
		<>
			<Title level={2}>Global Crypto Stats</Title>
			<Row>
				<Col span={12}>
					<Statistic
						title='Total crypto currencies'
						value={globalStats?.totalCoins}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title='Total Exchanges'
						value={globalStats ? millify(globalStats.totalExchanges) : 0}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title='Total Market Cap'
						value={globalStats ? millify(+globalStats.totalMarketCap) : 0}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title='Total 24h Volume'
						value={globalStats ? millify(+globalStats.total24hVolume) : 0}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title='Total Markets'
						value={globalStats ? millify(globalStats.totalMarkets) : 0}
					/>
				</Col>
			</Row>
			<div className={styles.container}>
				<Title
					level={2}
					className={styles.title}
				>
					Top 10 Crypto in the World
				</Title>
				<Title
					level={3}
					className={styles.more}
				>
					<Link to='/currency'>Show more</Link>
				</Title>
			</div>
			<Currency isLimited />
			<div className={styles.container}>
				<Title
					level={2}
					className={styles.title}
				>
					Latest Crypto News
				</Title>
				<Title
					level={3}
					className={styles.more}
				>
					<Link to='/news'>Show more</Link>
				</Title>
			</div>
			<News isLimited />
		</>
	);
};

export default Home;
