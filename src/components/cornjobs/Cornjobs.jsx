import React from "react";
import swal from "sweetalert";

const Cornjobs = () => {
	//get domain name
	const domain = window.location.hostname;
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">Setup Cornjob</h5>
				<p className="card-text">
					Please set a cornjob to run every minute to following url:
					<br />
					<br />
					<div className="d-flex">
						<input
							className="form-control"
							type="text"
							defaultValue={`https://${domain}/cornjobs`}
						/>
						{/* Copy buttion */}
						<button
							className="btn btn-primary ms-1"
							onClick={() => {
								navigator.clipboard.writeText(`https://${domain}/cornjobs`);
								swal("Link Copied", "", "success");
							}}
						>
							Copy
						</button>
					</div>
				</p>
				<p className="card-text">
					<small className="text-muted">Last executed 3 mins ago.</small>
				</p>

				<button type="button" className="btn btn-primary">
					Test Cornjob
				</button>
			</div>
		</div>
	);
};

export default Cornjobs;
