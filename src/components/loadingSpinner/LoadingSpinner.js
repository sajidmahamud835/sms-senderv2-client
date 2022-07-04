import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
	return (
		<div className="d-flex" style={{ height: "90vh" }}>
			<div className="justify-content-center align-items-center">
				<Spinner
					animation="border"
					variant="primary"
					className="d-block mx-auto"
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		</div>
	);
};

export default LoadingSpinner;
