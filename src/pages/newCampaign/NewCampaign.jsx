import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UseFirebase from "../../Hooks/UseFirebase";
import "./newCampaign.css";

const NewCampaign = () => {
	const { user, loading } = UseFirebase();
	const [name, setNameInputData] = useState();
	const [contactList, setContactList] = useState();
	const [messageBody, setCampaignNote] = useState();
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [status, setStatus] = useState();
	const [number, setNumber] = useState();
	const [myNumbers, setMyNumbers] = useState([]);
	const [numberList, setNumberList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/contacts/email/${user?.email}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then((res) => {
				// console.log(res.status);
				if (res.status === 403 || res.status === 401) {
					navigate('/login');
				} else {
					return res.json();
				}
			})
			.then(data => setNumberList(data))
			.then(data => console.log(data));

	}, [loading, navigate, user]);

	//GET Twilio Numbers
	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/smsApi/numbers`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then((res) => {
				// console.log(res.status);
				if (res.status === 403 || res.status === 401) {
					navigate('/login');
				} else {
					return res.json();
				}
			})
			.then(data => {
				setMyNumbers(data);
			});
	}, [navigate]);

	console.log(numberList);

	const campaignName = (e) => {
		setNameInputData(e.target.value);
	};

	const OptionList = (e) => {
		setContactList(e.target.value);
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
			contactList,
			messageBody,
			startTime,
			endTime,
			startDate,
			endDate,
			status,
			email: user?.email

		};
		if (e) {
			swal({
				title: "Are you sure?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then((willAdd) => {
				if (willAdd) {
					const url = `${process.env.REACT_APP_SERVER_URL}/campaign-list`;
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
					<div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
						<label htmlFor="lists">Name :</label>
						<input
							className="m-0 ps-2 w-75 form-control"
							required
							onBlur={campaignName}
							type="text"
							placeholder="Campaign Name"
						/>
					</div>
					<div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
						<label htmlFor="receiver" className="">
							From:
						</label>
						<select
							id="receiver"
							className="ps-2 form-control w-75"
							onBlur={handleSender}
							required
						>
							<option value="saab">None</option>
							{myNumbers?.map((myNumber) => (
								<option value={myNumber.number}>{myNumber.number}</option>
							))}
						</select>
					</div>
					<div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
						<label htmlFor="lists">Contact List :</label>
						<select
							name="lists"
							onBlur={OptionList}
							id="cars"
							className="form-control w-50"
						>
							{numberList?.map((numberListData) => (
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
					<div className="py-1 inputContainer d-flex justify-content-between  my-3 flex-lg-row flex-column">
						<div>
							<label className="pe-3">Start Time</label>
							<input required onBlur={StartTime} className="form-control" type="time" name="startTime" />
						</div>
						<div>
							<label className="pe-3">End Time</label>
							<input required onBlur={EndTime} className="form-control" type="time" name="endTime" />
						</div>
					</div>
					<div className="py-1 inputContainer d-flex justify-content-between  my-3 flex-lg-row flex-column">
						<div>
							<label className="pe-3">Start Date</label>
							<input required onBlur={StartDate} className="form-control" type="date" name="starDate" />
						</div>
						<div>
							<label className="pe-3">End Date</label>
							<input required onBlur={EndDate} className="form-control" type="date" name="endDate" />
						</div>
					</div>
					<div className="d-flex justify-content-between mt-5 flex-lg-row flex-column">
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
