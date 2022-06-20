import { useEffect, useState } from "react";
import UseFirebase from "../../Hooks/UseFirebase";
import "./newCampaign.css";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate()
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
			})
				.then((willAdd) => {
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
									icon: "success"
								})
								navigate('/campaigns')
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
			<form onSubmit={fromSubmit} className="addCampaignForm">
				<h1>Create A Campaign</h1>
				<div className="addCampaignItem align-items-center my-3">
					<label htmlFor="lists">Name :</label>
					<input
						required
						onBlur={campaignName}
						type="text"
						placeholder="Campaign Name"
					/>
				</div>

				<div className="d-flex justify-content-between align-items-center my-3">
					<label htmlFor="receiver" className="w-25">
						From:
					</label>
					<select
						id="receiver"
						className="ms-3 ps-2 form-control w-full"
						onBlur={handleSender}
						required
					>
						<option value="saab">None</option>
						{myNumbers.map((myNumber) => (
							<option value={myNumber}>{myNumber}</option>
						))}
					</select>
				</div>
				<div className="addCampaignItem my-3">
					<label htmlFor="lists">Contact List :</label>
					<select name="lists" onBlur={OptionList} id="cars" className="  mx-3">
						{numberList.map((numberListData) => (
							<option key={numberListData._id} value={numberListData._id}>
								{numberListData.listName}
							</option>
						))}
					</select>
				</div>
				<div className="addCampaignItem  my-3">
					<label className="d-block py-3">Message :</label>
					<textarea
						rows="4" cols="50"
						onBlur={campaignNote}
						placeholder="Notes about campaign ....."
					></textarea>
				</div>
				<div className="inputContainer d-flex justify-content-between align-items-center my-3">
					<div>
						<label className="pe-3">Start Time</label>
						<input required onBlur={StartTime} type="time" name="startTime" />
					</div>
					<div>
						<label className="pe-3">End Time</label>
						<input required onBlur={EndTime} type="time" name="endTime" />
					</div>
				</div>
				<div className="inputContainer d-flex justify-content-between align-items-center my-3">
					<div>
						<label className="pe-3">Start Date</label>
						<input required onBlur={StartDate} type="date" name="starDate" />
					</div>
					<div>
						<label className="pe-3">End Date</label>
						<input required onBlur={EndDate} type="date" name="endDate" />
					</div>
				</div>
				<button
					type="submit"
					onClick={SavedDraft}
					className="addCampaignButton m-5"
				>
					Save as Draft
				</button>
				<button
					type="submit"
					onClick={ScheduleCampaign}
					className="addCampaignButton2 m-5"
				>
					Schedule Campaign
				</button>
			</form>
		</div>
	);
};

export default NewCampaign;
