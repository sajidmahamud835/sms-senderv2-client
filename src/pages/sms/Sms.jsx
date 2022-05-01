import React, { useState } from "react";
import "./sms.css";
import { Alert } from "react-bootstrap";

const Sms = () => {
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
    const [myNumbers, setMyNumbers] = useState([
        "+19034204596"
    ])

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setError("");
        fetch("https://sms-sender-server.herokuapp.com/sms/send", {
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
        <section className="sms m-3 p-3 shadow rounded">
            <h1 className="text-center mt-5 text-primary">Send Bulk Message</h1>
            <div className="mx-auto mt-5 p-3 shadow-sm rounded" style={{ width: "500px" }}>
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
                <form onSubmit={handleSubmit} className="px-3">
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <label htmlFor="receiver" className="w-50">To:</label>
                        {isSingle ? (
                            <input
                                id="receiver"
                                type="text"
                                placeholder="Receiver Number..."
                                className="ms-3 ps-2 form-control w-full"
                                onChange={receiverNumberCollect}
                                required
                            />
                        ) : (
                            <textarea
                                id="receiver"
                                type="text"
                                placeholder="Receiver Number..."
                                className="ms-3 ps-2 form-control w-full"
                                onChange={receiverNumberCollect}
                                required
                            />
                        )}
                    </div>
                    <div className="d-flex align-items-center justify-content-between my-3">
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
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <label htmlFor="receiver" className="w-50">From:</label>
                        <select
                            id="receiver"
                            className="ms-3 ps-2 form-control w-full"
                            onChange={handleSender}
                            required
                        >
                            <option value="saab">None</option>
                            {myNumbers.map(myNumber => (
                                <option value={myNumber}>{myNumber}</option>
                            ))
                            }
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <label htmlFor="receiver" className="w-50">Message Body:</label>
                        <textarea
                            id="receiver"
                            type="text"
                            placeholder="Write your message..."
                            className="ms-3 ps-2 form-control w-full"
                            onChange={handleMessage}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <div></div>
                        {!isAdvanced && <h6
                            className="btn text-secondary"
                            onClick={() => setIsAdvanced(!isAdvanced)}
                        >
                            Show Advanced
                        </h6>}
                        {isAdvanced && <h6
                            className="btn text-secondary"
                            onClick={() => setIsAdvanced(!isAdvanced)}
                        >
                            Hide Advanced
                        </h6>}
                    </div>
                    {isAdvanced && (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <label htmlFor="delay" className="w-50">Delay:</label>
                                <input
                                    id="delay"
                                    type="text"
                                    placeholder="Delay..."
                                    className="ms-3 ps-2 form-control w-full"
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center my-3">
                                <label htmlFor="timeout" className="w-50">Timeout:</label>
                                <input
                                    id="timeout"
                                    type="text"
                                    placeholder="Timeout..."
                                    className="ms-3 ps-2 form-control w-full"
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
        </section>
    );
};

export default Sms;
