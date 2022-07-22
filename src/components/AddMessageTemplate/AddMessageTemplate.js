import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFirebase from "../../Hooks/UseFirebase";

const AddMessageTemplate = ({ setMessageTemplate, dataChanged, setDataChanged }) => {
    const [message, setMessage] = useState("");
    const [template, setTemplate] = useState("");
    const { user } = UseFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/templates/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => {
                if (res.status === 403 || res.status === 401) {
                    navigate('/login');
                } else {
                    return res.json();
                }
            })
            .then(data => setTemplate(data?.templates));
    }, [navigate, user.email]);

    const handleSubmit = () => {
        setMessageTemplate(message);
        setDataChanged(!dataChanged);
    };
    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#messageTemplate"
            >
                Add Message Template
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="messageTemplate"
                tabIndex="-1"
                aria-labelledby="messageTemplateLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="messageTemplateLabel">
                                Use Template
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-between align-items-center my-3">
                                <label htmlFor="receiver" className="w-50">
                                    Message:
                                </label>
                                <select
                                    name="lists"
                                    onChange={(e) => setMessage(e.target.value)}
                                    id="cars"
                                    className="form-control w-50"
                                >
                                    <option value="none">None</option>
                                    {template && <>
                                        {template?.map((singleMessage) => (
                                            <option key={singleMessage?._id} value={singleMessage?.message}>
                                                {singleMessage?.title}
                                            </option>
                                        ))}
                                    </>}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSubmit} data-bs-dismiss="modal" className="btn btn-primary">
                                Add Template
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddMessageTemplate;