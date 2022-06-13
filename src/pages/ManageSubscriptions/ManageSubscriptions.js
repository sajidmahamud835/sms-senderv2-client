import React from 'react';
import './ManageSubscriptions.css'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { SubscriptionsRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
const ManageSubscriptions = () => {
    const [data, setData] = useState(SubscriptionsRows);
    console.log(data)
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        // {
        //   field: "id",
        //   headerName: "ID",
        //   width: 100
        // },
        {
            field: "campaign",
            headerName: "Subscriptions Name",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "sold",
            headerName: "Total Sold",
            width: 200
        },
        {
            field: "price",
            headerName: "Price",
            width: 120,
        },
        {
            field: "smssent",
            headerName: "SMS Sent",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={"/campaign/" + params.row.id}>
                            <button className="campaignListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="campaignListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </div>
                );
            },
        },
    ];
    console.log(data);
    console.log(columns);
    return (
        <div className="campaignList">
            <div className="campaignTitleContainer">
                <h1 className="campaignTitle">Manage Subscriptions</h1>
                <Link to="/new-campaign">
                    <button className="campaignAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
};

export default ManageSubscriptions;