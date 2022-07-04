import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UseFirebase from "../../Hooks/UseFirebase";
import "./newCampaign.css";

const NewCampaign = () => {
	const { user } = UseFirebase();
	const [name, setNameInputData] = useState();
	const [optionInputData, setOptionInputData] = useState();
	const [campaignMsg, setCampaignNote] = useState();
	const [startTimeInput, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [status, setStatus] = useState();
	const [number, setNumber] = useState();
	const [myNumbers, setMyNumbers] = useState(["+19034204596", "+19785813348"]);
	const [numberList, setNumberList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const url = `http://localhost:4000/upload-excel-file?email=${user?.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setNumberList(data));
	}, [user?.email]);

	console.log(numberList);

	const campaignName = (e) => {
		setNameInputData(e.target.value);
	};

	const OptionList = (e) => {
		setOptionInputData(e.target.value);
	};

	const campaignNote = (e) => {
		setCampaignNote(e.target.value);
	};

	const StartTime = (e) => {
		setStartTime(e.target.value);
	};

	const EndTime = (e) => {
		setEndTime(e.target.value);
	};

	const StartDate = (e) => {
		setStartDate(e.target.value);
	};

	const EndDate = (e) => {
		setEndDate(e.target.value);
	};

	const SavedDraft = (e) => {
		setStatus("Draft");
	};

	const ScheduleCampaign = (e) => {
		setStatus("Scheduled");
	};

	const fromSubmit = (e) => {
		e.preventDefault();
		const DraftData = {
			name,
			number,
			optionInputData,
			campaignMsg,
			startTimeInput,
			endTime,
			startDate,
			endDate,
			status,
		};
		if (e) {
			swal({
				title: "Are you sure?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then((willAdd) => {
				if (willAdd) {
					const url = `http://localhost:4000/campaign-list`;
					fetch(url, {
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify(DraftData),
					})
						.then((res) => res.json())
						.then((data) => {
							swal("Campaign is added", {
								icon: "success",
							});
							navigate("/campaigns");
						});
				} else {
					swal(" Some Error Occurs!");
				}
			});
		}
		console.log(DraftData);
	};

	const handleSender = (e) => {
		setNumber(e.target.value);
	};

	return (
		<div className="newCampaign">
			<div className="card shadow px-5 py-4 my-4">
				<form onSubmit={fromSubmit} className="addCampaignForm">
					<h1>Create A Campaign</h1>
					<div className="py-1 addCampaignItem d-flex justify-content-between align-items-center my-3">
						<label htmlFor="lists">Name :</label>
						<input
							className="m-0 ms-3 ps-2 w-75 form-control"
							required
							onBlur={campaignName}
							type="text"
							placeholder="Campaign Name"
						/>
					</div>
					<div className="py-1 d-flex justify-content-between align-items-center my-3">
						<label htmlFor="receiver" className="">
							From:
						</label>
						<select
							id="receiver"
							className="ms-3 ps-2 form-control w-75"
							onBlur={handleSender}
							required
						>
							<option value="saab">None</option>
							{myNumbers.map((myNumber) => (
								<option value={myNumber}>{myNumber}</option>
							))}
						</select>
					</div>
					<div className="py-1 addCampaignItem my-3 d-flex justify-content-between align-items-center">
						<label htmlFor="lists">Contact List :</label>
						<select
							name="lists"
							onBlur={OptionList}
							id="cars"
							className="form-control w-50"
						>
							{numberList.map((numberListData) => (
								<option key={numberListData._id} value={numberListData._id}>
									{numberListData.listName}
								</option>
							))}
						</select>
					</div>
					<div className="py-1 addCampaignItem  my-3">
						<label className="d-block py-3">Keep Notes:</label>
						<textarea
							rows="4"
							cols="50"
							onBlur={campaignNote}
							placeholder="Notes about campaign ....."
							className="form-control"
						></textarea>
					</div>
					<div className="py-1 inputContainer d-flex justify-content-between align-items-center my-3">
						<div>
							<label className="pe-3">Start Time</label>
							<input required onBlur={StartTime} className="form-control" type="time" name="startTime" />
						</div>
						<div>
							<label className="pe-3">End Time</label>
							<input required onBlur={EndTime} className="form-control" type="time" name="endTime" />
						</div>
					</div>
					<div className="py-1 inputContainer d-flex justify-content-between align-items-center my-3">
						<div>
							<label className="pe-3">Start Date</label>
							<input required onBlur={StartDate} className="form-control" type="date" name="starDate" />
						</div>
						<div>
							<label className="pe-3">End Date</label>
							<input required onBlur={EndDate} className="form-control" type="date" name="endDate" />
						</div>
					</div>
					<div className="d-flex justify-content-between mt-5">
						<button
							type="submit"
							onClick={SavedDraft}
							className="btn btn-success m-2"
						>
							Save as Draft
						</button>
						<button
							type="submit"
							onClick={ScheduleCampaign}
							className="btn btn-primary m-2"
						>
							Schedule Campaign
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewCampaign;
