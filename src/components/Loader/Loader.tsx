import { Spin } from "antd";
import { FC } from "react";

const Loader: FC = () => {
	return (
		<div className='loader'>
			<Spin />
		</div>
	);
};
export default Loader;
