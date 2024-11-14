import { FC } from "react";
import { Avatar, Button, Menu, MenuProps, Typography } from "antd";
import { Link, NavLink } from "react-router-dom";
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
	{
		key: "home",
		label: <NavLink to='/'>Home</NavLink>,
		icon: <HomeOutlined />,
	},
	{
		key: "currency",
		label: <NavLink to='/currency'>Currency</NavLink>,
		icon: <FundOutlined />,
	},
	{
		key: "exchanges",
		label: <NavLink to='/exchanges'>Exchanges</NavLink>,
		icon: <MoneyCollectOutlined />,
	},
	{
		key: "news",
		label: <NavLink to='/news'>News</NavLink>,
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
