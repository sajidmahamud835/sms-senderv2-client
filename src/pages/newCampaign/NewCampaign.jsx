import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
	const [disabled, setDisabled] = useState(false);
	const [errorMassage, setErrorMassage] = useState(false);
	const [from, setFrom] = useState(false);
	const [contactValue, setContactValue] = useState(false);
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
			.then(data => setNumberList(data));
		// .then(data => console.log(data));

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

	useEffect(() => {
		console.log({ from, contactValue });
		// condition for felling form
		if (from && from !== "none" && contactValue && contactValue !== "none") {
			console.log("fine");
			setErrorMassage(false);
			setDisabled(false);
		}
		// condition end
	}, [contactValue, disabled, from]);

	// console.log(numberList);

	const campaignName = (e) => {
		setNameInputData(e.target.value);
	};

	const OptionList = (e) => {
		setContactList(e.target.value);
		setContactValue(e.target.value);
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

		if (from && from !== "none" && contactValue && contactValue !== "none") {
			if (e) {
				swal({
					title: "Are you sure?",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				}).then((willAdd) => {
					if (willAdd) {
						const url = `${process.env.REACT_APP_SERVER_URL}/campaigns`;
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
								if (data) {
									toast.success("Campaign is added");
								}
								navigate("/campaigns");
							});
					} else {
						swal(" Some Error Occurs!");
					}
				});
			}
		} else {
			setErrorMassage("Please fill in from and contact!");
			setDisabled(true);
		}
		// console.log(DraftData);
	};

	const handleSender = (e) => {
		setNumber(e.target.value);
		setFrom(e.target.value);
	};
	return (
		<div className="newCampaign">
			<div className="card shadow px-5 py-4 my-4">
				{errorMassage && <div className="alert alert-danger">{errorMassage}</div>}
				<form onSubmit={fromSubmit} className="addCampaignForm">
					<h1>Create A Campaign</h1>
					<div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
						<label htmlFor="lists">Name :</label>
						<input
							className="m-0 ps-2 w-75 form-control"
							required
							onChange={campaignName}
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
							onChange={handleSender}
							required
						>
							<option value="none">None</option>
							{myNumbers?.map((myNumber, index) => (
								<option key={index} value={myNumber.number}>{myNumber.number}</option>
							))}
						</select>
					</div>
					<div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
						<label htmlFor="lists">Contact List :</label>
						{(numberList.length === 0) && <button onClick={() => navigate('/newContacts')} className="btn btn-danger m-2">Create</button>}
						<select
							name="lists"
							onChange={OptionList}
							id="cars"
							className="form-control w-50"
						>
							<option value="none">None</option>
							{numberList?.map((numberListData) => (
								<option key={numberListData._id} value={numberListData._id}>
									{numberListData.listName}
								</option>
							))}
						</select>
					</div>
					<div className="py-1 addCampaignItem  my-3">
						<label className="d-block py-3">Message:</label>
						<textarea
							rows="4"
							cols="50"
							onChange={campaignNote}
							placeholder="Write your message here."
							className="form-control"
						></textarea>
					</div>
					<div className="py-1 inputContainer d-flex justify-content-between  my-3 flex-lg-row flex-column">
						<div>
							<label className="pe-3">Start Time</label>
							<input required onChange={StartTime} className="form-control" type="time" name="startTime" />
						</div>
						<div>
							<label className="pe-3">End Time</label>
							<input required onChange={EndTime} className="form-control" type="time" name="endTime" />
						</div>
					</div>
					<div className="py-1 inputContainer d-flex justify-content-between  my-3 flex-lg-row flex-column">
						<div>
							<label className="pe-3">Start Date</label>
							<input required onChange={StartDate} className="form-control" type="date" name="starDate" />
						</div>
						<div>
							<label className="pe-3">End Date</label>
							<input required onChange={EndDate} className="form-control" type="date" name="endDate" />
						</div>
					</div>
					<div className="d-flex justify-content-between mt-5 flex-lg-row flex-column">
						<button
							type="submit"
							onClick={SavedDraft}
							className="btn btn-success m-2"
							disabled={disabled}
						>
							Save as Draft
						</button>
						<button
							type="submit"
							onClick={ScheduleCampaign}
							className="btn btn-primary m-2"
							disabled={disabled}
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
