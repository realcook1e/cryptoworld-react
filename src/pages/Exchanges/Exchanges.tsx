import { FC, useState } from "react";
import { useGetExchangesQuery } from "../../api/cryptoExchangesApi";
import { Row, Col, Typography } from "antd";
import styles from "./styles.module.scss";
import millify from "millify";
import HTMLReactParser from "html-react-parser/lib/index";

const { Title } = Typography;

const Exchanges: FC = () => {
	const [activeItem, setActiveItem] = useState<null | number>(null);
	const { data, isLoading } = useGetExchangesQuery();

	if (isLoading) return "Loading...";

	const handleClick = (index: number) => {
		if (index === activeItem) {
			setActiveItem(null);
			return;
		}

		setActiveItem(index);
	};

	return (
		<>
			<Row className={styles.heading}>
				<Col
					xs={8}
					lg={9}
				>
					Exchanges{" "}
				</Col>
				<Col
					xs={8}
					lg={5}
				>
					24h Trade Volume{" "}
				</Col>
				<Col
					xs={8}
					lg={5}
				>
					Markets{" "}
				</Col>
				<Col
					xs={0}
					lg={5}
				>
					Change
				</Col>
			</Row>
			<div className={styles.exchangeList}>
				{data?.map((exchange, index) => (
					<Row className={styles.exchangeItem}>
						<Col span={24}>
							<Row
								className={styles.content}
								key={exchange.id}
								onClick={() => handleClick(index)}
							>
								<Col
									xs={8}
									lg={9}
									className={styles.name}
								>
									<span>{index + 1}.</span>
									<img
										src={exchange.logoUrl}
										alt={exchange.marketName}
										className={styles.logo}
									/>{" "}
									<Title level={5}>{exchange.marketName}</Title>
								</Col>
								<Col
									xs={8}
									lg={5}
								>
									{millify(+exchange.volume)}
								</Col>
								<Col
									xs={8}
									lg={5}
								>
									{millify(+exchange.markets)}
								</Col>
								<Col
									xs={0}
									lg={5}
								>
									{exchange.change}%
								</Col>
							</Row>
							{activeItem === index && (
								<Col
									span={24}
									className={styles.description}
								>
									{HTMLReactParser(exchange.description)}
								</Col>
							)}
						</Col>
					</Row>
				))}
			</div>
		</>
	);
};
export default Exchanges;
