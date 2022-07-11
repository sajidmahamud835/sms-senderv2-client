import React, { useEffect, useState } from 'react';
import './NewSubscriptions.css';

import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import UseFirebase from '../../Hooks/UseFirebase';
const NewSubscriptions = () => {
    const { user } = UseFirebase();
    const [name, setNameInputData] = useState();
    const [Price, setPackagePrice] = useState();
    const [SubscriptionsNote, setSubscriptionsNote] = useState();
    const [SmsLimit, setPackageSmsLimit] = useState();
    const navigate = useNavigate();

    const PackageName = (e) => {
        setNameInputData(e.target.value);
    };

    const PackagePrice = (e) => {
        setPackagePrice(e.target.value);
    };

    const campaignNote = (e) => {
        setSubscriptionsNote(e.target.value);
    };
    const PackageSmsLimit = (e) => {
        setPackageSmsLimit(e.target.value);
    };




    const fromSubmit = (e) => {
        e.preventDefault();
        const DraftData = {
            name, Price, SubscriptionsNote, SmsLimit
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
                        const url = `${process.env.REACT_APP_SERVER_URL}/subscription-list`;
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
                                });
                                navigate('/manage-subscriptions');
                            });

                    } else {
                        swal(" Some Error Occurs!");
                    }
                });
        }
        console.log(DraftData);
    };



    return (
        <div className="newCampaign">
            <div className="card shadow px-5 py-4 my-4">
                <form onSubmit={fromSubmit} className="addCampaignForm">
                    <h1>Create A Package</h1>
                    <div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
                        <label htmlFor="lists">Package Name :</label>
                        <input
                            className="ps-2 form-control w-75"
                            required
                            onBlur={PackageName}
                            type="text"
                            placeholder="Package Name"
                        />
                    </div>
                    <div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
                        <label htmlFor="lists" className='d-block'>Package Price :</label>
                        <input
                            className="ps-2 form-control w-75"
                            required
                            onBlur={PackagePrice}
                            type="number"
                            placeholder="Package Price"
                        />
                    </div>
                    <div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
                        <label htmlFor="lists" className='d-block'>SMS Limit :</label>
                        <input
                            className="ps-2 form-control w-75"
                            required
                            onBlur={PackageSmsLimit}
                            type="number"
                            placeholder="Package SMS Limit"
                        />
                    </div>
                    <div className="my-4 d-flex justify-content-between my-3 flex-lg-row flex-column">
                        <label className="d-block py-3">Message :</label>
                        <textarea
                            className="ps-2 form-control w-75"
                            rows="4" cols="50"
                            onBlur={campaignNote}
                            placeholder="Notes about subscription ....."
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="m-5 addCampaignButton"
                        >
                            Add Subscription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewSubscriptions;