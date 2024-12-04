import { FC, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
	CheckOutlined,
	DollarCircleOutlined,
	ExclamationCircleOutlined,
	FundOutlined,
	MoneyCollectOutlined,
	NumberOutlined,
	StopOutlined,
	ThunderboltOutlined,
	TrophyOutlined,
} from "@ant-design/icons";

import {
	useGetCryproDetailsQuery,
	useGetCryproHistoryQuery,
} from "../../api/cryptoApi";
import { LineChart, Loader } from "../../components";
import styles from "./styles.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const CurrencyDetails: FC = () => {
	const [timePeriod, setTimePeriod] = useState("7d");
	const { coinId } = useParams();

	const { data: cryptoDetailsData, isLoading } = useGetCryproDetailsQuery(
		coinId!,
		{ skip: !coinId }
	);
	const { data: coinHistoryData } = useGetCryproHistoryQuery(
		{ coinId: coinId!, timePeriod },
		{ skip: !coinId }
	);
	const cryptoDetails = cryptoDetailsData?.data.coin;
	const coinHistory = coinHistoryData?.data;

	if (isLoading) return <Loader />;

	const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

	const stats = [
		{
			title: "Price to USD",
			value: `$ ${cryptoDetails?.price && millify(+cryptoDetails.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "Rank",
			value: cryptoDetails?.rank,
			icon: <NumberOutlined />,
		},
		{
			title: "24h Volume",
			value: `$ ${
				cryptoDetails?.["24hVolume"] &&
				millify(+cryptoDetails["24hVolume"])
			}`,
			icon: <ThunderboltOutlined />,
		},
		{
			title: "Market Cap",
			value: `$ ${
				cryptoDetails?.marketCap && millify(+cryptoDetails.marketCap)
			}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "All-time-high(daily avg.)",
			value: `$ ${
				cryptoDetails?.allTimeHigh.price &&
				millify(+cryptoDetails.allTimeHigh.price)
			}`,
			icon: <TrophyOutlined />,
		},
	];

	const genericStats = [
		{
			title: "Number Of Markets",
			value: cryptoDetails?.numberOfMarkets,
			icon: <FundOutlined />,
		},
		{
			title: "Number Of Exchanges",
			value: cryptoDetails?.numberOfExchanges,
			icon: <MoneyCollectOutlined />,
		},
		{
			title: "Aprroved Supply",
			value: cryptoDetails?.supply.confirmed ? (
				<CheckOutlined />
			) : (
				<StopOutlined />
			),
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Total Supply",
			value: `$ ${
				cryptoDetails?.supply.total && millify(+cryptoDetails.supply.total)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Circulating Supply",
			value: `$ ${
				cryptoDetails?.supply.circulating &&
				millify(+cryptoDetails.supply.circulating)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	return (
		<Col className={styles.coinContainer}>
			<Col className={styles.coinHeading}>
				<Title
					level={2}
					className={styles.coinName}
				>
					{" "}
					{cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
				</Title>
				<p>
					{cryptoDetails?.name} live price in dollars. View value
					statistics, market cap and supply.
				</p>
			</Col>
			<Select
				defaultValue='7d'
				className={styles.periodSelect}
				placeholder='Select Time Period'
				onChange={value => setTimePeriod(value)}
			>
				{time.map(date => (
					<Option key={date}>{date}</Option>
				))}
			</Select>
			<LineChart
				coinHistory={coinHistory}
				currentPrice={
					cryptoDetails?.price ? millify(+cryptoDetails.price) : 0
				}
				coinName={cryptoDetails?.name || "not found"}
			/>
			<Col className={styles.statsContainer}>
				<Col
					className={styles.coinValueStats}
					lg={12}
					xs={24}
				>
					<Col className={styles.coinValueStatsHeading}>
						<Title
							level={3}
							className={styles.coinDetailsHeading}
						>
							{cryptoDetails?.name} Value Statistics
						</Title>
						<p>An overview showing the stats of {cryptoDetails?.name}</p>
					</Col>
					{stats.map(({ icon, title, value }) => (
						<Col
							className={styles.coinStats}
							key={title}
						>
							<Col className={styles.coinStatsName}>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className={styles.stats}>{value}</Text>
						</Col>
					))}
				</Col>
				<Col
					className={styles.otherStats}
					lg={12}
					xs={24}
				>
					<Col className={styles.coinValueStatsHeading}>
						<Title
							level={3}
							className={styles.coinDetailsHeading}
						>
							Other Statistics
						</Title>
						<p>An overview showing the stats of all cryptos</p>
					</Col>
					{genericStats.map(({ icon, title, value }) => (
						<Col
							className={styles.coinStats}
							key={title}
						>
							<Col className={styles.coinStatsName}>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className={styles.stats}>{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
			<Col className={styles.coinDescLink}>
				<Col
					className={styles.coinDesc}
					lg={12}
					xs={24}
				>
					<Title
						level={3}
						className={styles.coinDetailsHeading}
					>
						What is {cryptoDetails?.name}
					</Title>
					<p className={styles.coinDescInfo}>
						{cryptoDetails?.description}
					</p>
				</Col>
				<Col
					className={styles.coinLinks}
					lg={12}
					xs={24}
				>
					<Title
						level={3}
						className={styles.coinDetailsHeading}
					>
						{cryptoDetails?.name} Links
					</Title>
					{cryptoDetails?.links.map(link => (
						<Row
							className={styles.coinLink}
							key={link.name}
						>
							<Title
								level={5}
								className={styles.linkName}
							>
								{link.type}
							</Title>
							<a
								href={link.url}
								target='_blank'
								rel='noreferrer'
							>
								{link.name}
							</a>
						</Row>
					))}
				</Col>
			</Col>
		</Col>
	);
};

export default CurrencyDetails;
