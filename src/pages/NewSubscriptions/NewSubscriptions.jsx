import React, { useEffect, useState } from 'react';
import './NewSubscriptions.css'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import UseFirebase from '../../Hooks/UseFirebase';
const NewSubscriptions = () => {
    const { user } = UseFirebase();
    const [name, setNameInputData] = useState();
    const [Price, setPackagePrice] = useState();
    const [SubscriptionsNote, setSubscriptionsNote] = useState();
    const [SmsLimit, setPackageSmsLimit] = useState();
    const navigate = useNavigate()

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
                        const url = `http://localhost:4000/subscription-list`;
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
                                navigate('/manage-subscriptions')
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
            <form onSubmit={fromSubmit} className="addCampaignForm">
                <h1>Create A Package</h1>
                <div className="addCampaignItem align-items-center my-3">
                    <label htmlFor="lists">Package Name :</label>
                    <input
                        required
                        onBlur={PackageName}
                        type="text"
                        placeholder="Package Name"
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="lists" className='d-block'>Package Price :</label>
                    <input
                        required
                        onBlur={PackagePrice}
                        type="number"
                        placeholder="Package Price"
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="lists" className='d-block'>Package SMS Limit :</label>
                    <input
                        required
                        onBlur={PackageSmsLimit}
                        type="number"
                        placeholder="Package Price"
                    />
                </div>
                <div className="addCampaignItem  my-3">
                    <label className="d-block py-3">Message :</label>
                    <textarea
                        rows="4" cols="50"
                        onBlur={campaignNote}
                        placeholder="Notes about campaign ....."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="m-5"
                >
                    Add Subscription
                </button>
            </form>
        </div>
    );
};

export default NewSubscriptions;