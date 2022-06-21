import React, { useEffect } from 'react';
import './ManageSubscriptions.css'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import swal from 'sweetalert';
const ManageSubscriptions = () => {
    const [data, setData] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/subscription-list')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    // console.log(data)
    const handleDelete = (id) => {
        if (id) {
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willAdd) => {
                    if (willAdd) {
                        const url = `http://localhost:4000/delete-subscription/${id}`
                        fetch(url, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount > 0) {
                                    swal("List is Deleted", {
                                        icon: "success",
                                    });
                                    setRowData(rowData.filter((item) => item._id !== id));

                                }
                            });
                    } else {
                        swal("Sorry Some Error occurs!");
                    }
                });
        }

    };

    useEffect(() => {
        let id = 1;
        const initialArray = []
        data.map(list => {
            const newList = { ...list, id: id }
            id++;
            initialArray.push(newList)
            return 0
        })
        setRowData(initialArray);

    }, [data])
    console.log(rowData)
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.id}
                    </div>
                );
            }

        },
        {
            field: "name",
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
            field: "Price",
            headerName: "Price",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.Price}
                    </div>
                );
            },
        },
        {
            field: "SmsLimit",
            headerName: "SMS limit",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.SmsLimit}
                    </div>
                );
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={"/edit-subscriptions/" + params.row.id}>
                            <button className="campaignListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="campaignListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </div>
                );
            },
        },
    ];
    console.log(data);
    return (
        <div className="campaignList">
            <div className="campaignTitleContainer">
                <h1 className="campaignTitle">Manage Subscriptions</h1>
                <Link to="/new-subscriptions">
                    <button className="campaignAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
                rows={rowData}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
};

export default ManageSubscriptions;