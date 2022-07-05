import { Spinner } from "react-bootstrap";
import './LoadingSpinner.css';
const LoadingSpinner = () => {
	return (
		<div className="screen">
			<div className="spinner-container" style={{}}>
				<Spinner
					animation="border"
					variant="primary"
					className="d-block mx-auto"
					role="status"
					style={{ width: "70px", height: "70px" }}
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		</div>
	);
};

export default LoadingSpinner;
