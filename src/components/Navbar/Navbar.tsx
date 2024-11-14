import { FC } from "react";
import { Avatar, Button, Menu, MenuProps, Typography } from "antd";
import { Link } from "react-router-dom";
import {
	BulbOutlined,
	FundOutlined,
	HomeOutlined,
	MoneyCollectOutlined,
} from "@ant-design/icons";

import logo from "../../assets/images/logo.png";
import styles from "./styles.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
	{ key: "home", label: <Link to='/'>Home</Link>, icon: <HomeOutlined /> },
	{
		key: "currency",
		label: <Link to='/currency'>Currency</Link>,
		icon: <FundOutlined />,
	},
	{
		key: "exchanges",
		label: <Link to='/exchanges'>Exchanges</Link>,
		icon: <MoneyCollectOutlined />,
	},
	{
		key: "news",
		label: <Link to='/news'>News</Link>,
		icon: <BulbOutlined />,
	},
];

const Navbar: FC = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Avatar
						src={logo}
						size='large'
					/>
					<Typography.Title
						level={2}
						className={styles.logoTitle}
					>
						<Link to='/'>Cryptoworld</Link>
					</Typography.Title>
					{/* <Button className={styles.controlContainer}>

					</Button> */}
				</div>
				<Menu
					theme='dark'
					items={items}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
