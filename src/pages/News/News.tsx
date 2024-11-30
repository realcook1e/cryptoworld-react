import { FC, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../../api/cryptoNewsApi";
import noImage from "../../assets/images/no_image.png";

import styles from "./styles.module.scss";
import { useGetCryptosQuery } from "../../api/cryptoApi";
interface NewsProps {
	isLimited?: boolean;
}

const { Text, Title } = Typography;
const { Option } = Select;

const News: FC<NewsProps> = ({ isLimited = false }) => {
	const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
	const { data: news, isLoading } = useGetNewsQuery({
		query: newsCategory,
		count: isLimited ? 4 : 10,
	});

	const { data: cryptosList } = useGetCryptosQuery({
		count: 100,
		searchTerm: "",
	});

	if (isLoading) return "Loading..."; // TODO: add spinner

	return (
		<Row gutter={[24, 24]}>
			{!isLimited && (
				<Col span={24}>
					<Select
						showSearch
						className={styles.select}
						placeholder='Select a crypto'
						optionFilterProp='children'
						onChange={value => setNewsCategory(value)}
					>
						<Option value='Cryptocurrency'>Cryptocurrency</Option>
						{cryptosList?.data.coins.map(coin => (
							<Option
								value={coin.name}
								key={coin.uuid}
							>
								{coin.name}
							</Option>
						))}
					</Select>
				</Col>
			)}
			{news?.data.map((article, i) => (
				<Col
					xs={24}
					sm={12}
					lg={8}
					key={i}
				>
					<Card
						hoverable
						className={styles.card}
					>
						<a
							href={article.url}
							target='_blank'
							rel='noreferrer'
						>
							<div className={styles.container}>
								<Title
									className={styles.title}
									level={4}
								>
									{article.title}
								</Title>
								<img
									src={article.thumbnail || noImage}
									alt={article.title}
									className={styles.image}
								/>
							</div>
							<p className={styles.descr}>
								{article.excerpt.length > 100
									? `${article.excerpt.substring(0, 100)}...`
									: article.excerpt}
							</p>
							<div className={styles.publisher}>
								<div>
									<Avatar
										src={article.publisher.favicon || noImage}
										alt={article.publisher.name}
									/>
									<Text className={styles.publisherName}>
										{article.publisher.name}
									</Text>
								</div>
								<Text>
									{moment(article.date).startOf("seconds").fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
