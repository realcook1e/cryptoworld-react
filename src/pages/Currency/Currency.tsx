import { ChangeEvent, FC, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../../api/cryptoApi";
import styles from "./styles.module.scss";
import { useDebounce } from "../../hooks/useDebounce";

interface CurrencyProps {
	isLimited?: boolean;
}

const Currency: FC<CurrencyProps> = ({ isLimited = false }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);

	const count = isLimited ? 10 : 100;
	const { data: cryptosList, isLoading } = useGetCryptosQuery({
		count,
		searchTerm: debouncedSearchTerm,
	});
	const cryptos = cryptosList?.data?.coins;

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<>
			{!isLimited && (
				<div className={styles.search}>
					<Input
						placeholder='Search crypto...'
						onChange={handleSearchChange}
					/>
				</div>
			)}

			{isLoading || searchTerm !== debouncedSearchTerm ? (
				"Loading..."
			) : (
				<Row
					gutter={[32, 16]}
					className={styles.container}
				>
					{cryptos?.map(coin => (
						<Col
							xs={24}
							sm={12}
							lg={6}
							className={styles.card}
							key={coin.uuid}
						>
							<Link to={`/currency/${coin.uuid}`}>
								<Card
									title={`${coin.rank}. ${coin.name}`}
									loading={isLoading}
									extra={
										<img
											className={styles.image}
											alt={coin.name}
											src={coin.iconUrl}
										/>
									}
									hoverable
								>
									<p>Price: {millify(+coin.price)}</p>
									<p>Market Cap: {millify(+coin.marketCap)}</p>
									<p>Daily Change: {millify(+coin.change)}%</p>
								</Card>
							</Link>
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default Currency;
