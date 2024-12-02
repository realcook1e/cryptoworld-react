import { FC } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { CoinHistory } from "../../api/types/crypto.types";
import styles from "./styles.module.scss";

const { Title } = Typography;

interface LineChartProps {
	coinHistory: CoinHistory | undefined;
	currentPrice: string | number;
	coinName: string;
}

const LineChart: FC<LineChartProps> = ({
	coinHistory,
	currentPrice,
	coinName,
}) => {
	const coinPrices: string[] = [];
	const coinTimestamps: string[] = [];

	if (coinHistory) {
		for (const item of coinHistory.history) {
			coinPrices.push(item.price);
			coinTimestamps.push(
				new Date(item.timestamp * 1000).toLocaleDateString()
			);
		}
	}

	Chart.register(...registerables);

	const data = {
		labels: coinTimestamps,
		datasets: [
			{
				label: "Price in USD",
				data: coinPrices,
				fill: false,
				backgroundColor: "#00711d",
				borderColor: "#00711d",
			},
		],
	};

	const options = {
		scales: {
			x: {
				reverse: true,
			},
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<>
			<Row className={styles.chartHeader}>
				<Title
					level={2}
					className={styles.chartTitle}
				>
					{coinName} Price Chart
				</Title>
				<Col className={styles.priceContainer}>
					<Title
						level={5}
						className={styles.priceChange}
					>
						{coinHistory?.change}%
					</Title>
					<Title
						level={5}
						className={styles.currentPrice}
					>
						Current {coinName} Price: $ {currentPrice}
					</Title>
				</Col>
			</Row>
			<Line
				data={data}
				options={options}
			/>
		</>
	);
};
export default LineChart;
