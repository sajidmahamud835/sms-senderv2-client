import React, { useState } from 'react';
import './AllList.css'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Link } from 'react-router-dom';
import { AllListRows } from '../../dummyData';
const AllList = () => {
    const [data, setData] = useState(AllListRows);
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
            field: "name",
            headerName: "Lists Name",
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
            field: "number",
            headerName: "Total Number",
            width: 200
        },
        {
            field: "Ref",
            headerName: "Reference",
            width: 150,
        },
        {
            field: "campaign",
            headerName: "Campaign",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={"/edit-all-lists/" + params.row.id}>
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
    return (
        <div className=' allListContainer'>
            <div className="campaignTitleContainer">
                <h1 className="campaignTitle">All List</h1>
                <Link to="/excel-to-csv">
                    <button className="createCSVBtn"> <span><UploadFileIcon /> </span> Upload</button>
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

export default AllList;