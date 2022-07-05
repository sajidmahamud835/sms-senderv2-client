import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import UseFirebase from "../../Hooks/UseFirebase";
import "./sms.css";

const Sms = () => {
    const { user } = UseFirebase()
    const [isSingle, setIsSingle] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [messageIds, setMessageIds] = useState([]);
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [smsData, setSmsData] = useState({
        receiver: [],
        sender: "",
        message: "",
    });
    const [myNumbers, setMyNumbers] = useState([])
    useEffect(() => {
        fetch("http://localhost:4000/smsApi/numbers")
            .then(res => res.json())
            .then(data => {
                setMyNumbers(data)
            })
    }, [])

    // console.log(messageIds);

    const receiverNumberCollect = (e) => {
        const numberString = e.target.value;
        const numbers = numberString.split("\n");
        smsData.receiver = [...numbers];
    };

    const handleSender = (e) => {
        smsData.sender = e.target.value;
    };

    const handleMessage = (e) => {
        smsData.message = e.target.value;
        smsData.email = user.email;
        smsData.displayName = user.displayName;

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setError("");
        fetch("http://localhost:4000/sms/send", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(smsData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIsLoading(false);
                if (data.status === 200) {
                    setMessage(data.message);
                    setMessageIds(data.messageIds);
                    setError("");
                } else if (data.status === 400) {
                    setMessage("");
                    setError(data.message);
                }
            });
    };

    return (
        <section className="updateNumber sms m-3 p-3">
            <div className="card shadow px-5 py-4">
                <div className="userListTitleContainer">
                    <h1 className="userTitle m-0">Send Quick Message</h1>
                    <Link to="/newUser">
                        <button className="userAddButton">Create</button>
                    </Link>
                </div>
                <div className="mx-auto w-75 my-5">
                    <div className="mx-4">
                        {isLoading && <h4 className="text-center">Sending...</h4>}
                        {message && (
                            <Alert variant="success">
                                <h5 className="text-center">{message}</h5>
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="danger">
                                <h5 className="text-center">{error}</h5>
                            </Alert>
                        )}
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="px-3">
                            <div className="my-4 d-flex justify-content-between align-items-center my-3">
                                <label htmlFor="receiver" className="w-50">To:</label>
                                {isSingle ? (
                                    <input
                                        id="receiver"
                                        type="text"
                                        placeholder="Receiver Number..."
                                        className="m-0 ms-3 ps-2 form-control w-full"
                                        onChange={receiverNumberCollect}
                                        required
                                    />
                                ) : (
                                    <textarea
                                        id="receiver"
                                        type="text"
                                        placeholder="Receiver Number..."
                                        className="m-0 ms-3 ps-2 form-control w-full"
                                        onChange={receiverNumberCollect}
                                        required
                                    />
                                )}
                            </div>
                            <div className="my-4 d-flex align-items-center justify-content-between my-3">
                                <div></div>
                                <div className="d-flex">
                                    <div className="form-check me-3">
                                        <input
                                            className="form-check-input radio"
                                            type="radio"
                                            value=""
                                            id="flexCheckChecked"
                                            name="numberRequired"
                                            onClick={() => setIsSingle(true)}
                                        />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Single
                                        </label>
                                    </div>
                                    <div className="form-check ms-3">
                                        <input
                                            className="form-check-input radio"
                                            type="radio"
                                            value=""
                                            id="flexCheckDefault"
                                            name="numberRequired"
                                            onClick={() => setIsSingle(false)}
                                        />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Bulk
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="my-4 d-flex justify-content-between align-items-center my-3">
                                <label htmlFor="receiver" className="w-50">From:</label>
                                <select
                                    id="receiver"
                                    className="ms-3 ps-2 form-control w-full"
                                    onChange={handleSender}
                                    required
                                >
                                    <option value="saab">None</option>
                                    {myNumbers?.map(myNumber => (
                                        <option key={myNumber?._id} value={myNumber?.number}>{myNumber?.number}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="my-4 d-flex justify-content-between align-items-center my-3">
                                <label htmlFor="receiver" className="w-50">Message Body:</label>
                                <textarea
                                    id="receiver"
                                    type="text"
                                    placeholder="Write your message..."
                                    className="ms-3 ps-2 form-control w-full"
                                    style={{ height: 100 }}
                                    onChange={handleMessage}
                                    required
                                />
                            </div>
                            <div className="my-4 d-flex justify-content-between">
                                <div></div>
                                {!isAdvanced && <h6
                                    className="btn text-secondary"
                                    onClick={() => setIsAdvanced(!isAdvanced)}
                                >
                                    Show Advanced
                                </h6>}
                                {isAdvanced && <h6
                                    className="btn text-secondary m-0"
                                    onClick={() => setIsAdvanced(!isAdvanced)}
                                >
                                    Hide Advanced
                                </h6>}
                            </div>
                            {isAdvanced && (
                                <div className="my-4 ">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <label htmlFor="delay" className="w-50">Delay:</label>
                                        <input
                                            id="delay"
                                            type="text"
                                            placeholder="Delay..."
                                            className="m-0 ms-3 ps-2 form-control w-full"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center my-3">
                                        <label htmlFor="timeout" className="w-50">Timeout:</label>
                                        <input
                                            id="timeout"
                                            type="text"
                                            placeholder="Timeout..."
                                            className="m-0 ms-3 ps-2 form-control w-full"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Send Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sms;
