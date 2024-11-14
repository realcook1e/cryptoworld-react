import { FC } from "react";
import { Typography, Space, Layout } from "antd";
import { Link, Outlet } from "react-router-dom";

import { Navbar } from "../../components";

const PageLayout: FC = () => {
	return (
		<div className='app'>
			<Navbar />
			<main className='main'>
				<Layout>
					<div className='content'>
						<Outlet />
					</div>
					<footer className='footer'>
						<Typography.Title
							level={5}
							style={{ textAlign: "center", color: "white" }}
						>
							Cryptoworld <br />
							All rights reserved
						</Typography.Title>
						<Space>
							<Link to='/'>Home</Link>
							<Link to='/currency'>Currency</Link>
							<Link to='/news'>News</Link>
						</Space>
					</footer>
				</Layout>
			</main>
		</div>
	);
};

export default PageLayout;
