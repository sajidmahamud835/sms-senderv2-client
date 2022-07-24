import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import UseFirebase from "../../Hooks/UseFirebase";

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
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        setIsLoading(true);
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
            .then(data => {
                setNumberList(data);
                setIsLoading(false);
            });
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

    // console.log(numberList);

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
            name, number, contactList, messageBody, startTime, endTime, startDate, endDate, status, email: user?.email
        };
        if (e) {
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willAdd) => {
                if (willAdd) {
                    const url = `${process.env.REACT_APP_SERVER_URL}/campaigns-update/${id}`;
                    fetch(url, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(DraftData),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            swal("Campaign is updated", {
                                icon: "success",
                            });
                            if (data) {
                                toast.success("Campaign is updated");
                            }
                            navigate("/campaigns");
                        });
                } else {
                    swal(" Some Error Occurs!");
                }
            });
        }
    };

    // get single campaign data
    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_URL}/campaigns/${id}`, {
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
                setNameInputData(data[0].name);
                setContactList(data[0].contactList);
                setCampaignNote(data[0].messageBody);
                setStartTime(data[0].startTime);
                setEndTime(data[0].endTime);
                setStartDate(data[0].startDate);
                setEndDate(data[0].endDate);
                setStatus(data[0].status);
                setNumber(data[0].number);
            })
            .then(() => setIsLoading(false));
    }, [navigate, id]);

    const handleSender = (e) => {
        setNumber(e.target.value);
    };
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="newCampaign">
            <div className="card shadow px-5 py-4 my-4">
                <form onSubmit={fromSubmit} className="addCampaignForm">
                    <h1>Edit Campaign</h1>
                    <div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
                        <label htmlFor="lists">Name :</label>
                        <input
                            className="m-0 ps-2 w-75 form-control"
                            defaultValue={name}
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
                            value={number}
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
                            value={contactList}
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
                            defaultValue={messageBody}
                            placeholder="Write your message here."
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="py-1 inputContainer d-flex justify-content-between  my-3 flex-lg-row flex-column">
                        <div>
                            <label className="pe-3">Start Time</label>
                            <input onChange={StartTime}
                                defaultValue={startTime}
                                className="form-control" type="time" name="startTime" />
                        </div>
                        <div>
                            <label className="pe-3">End Time</label>
                            <input onChange={EndTime}
                                defaultValue={endTime}
                                className="form-control" type="time" name="endTime" />
                        </div>
                    </div>
                    <div className="py-1 inputContainer d-flex justify-content-between  my-3 flex-lg-row flex-column">
                        <div>
                            <label className="pe-3">Start Date</label>
                            <input onChange={StartDate}
                                defaultValue={startDate}
                                className="form-control" type="date" name="starDate" />
                        </div>
                        <div>
                            <label className="pe-3">End Date</label>
                            <input onChange={EndDate}
                                defaultValue={endDate}
                                className="form-control" type="date" name="endDate" />
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
