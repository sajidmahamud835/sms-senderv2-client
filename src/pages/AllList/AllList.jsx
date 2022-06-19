import React, { useEffect, useState } from 'react';
import './AllList.css'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Link } from 'react-router-dom';
import { AllListRows } from '../../dummyData';
const AllList = () => {
    const [data, setData] = useState(AllListRows);
    const [allList, setAllList] = useState([]);
    const [rowDatas, setRowDatas] = useState([]);
    // console.log(data)
    console.log(allList)
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
    useEffect(() => {
        fetch('http://localhost:4000/upload-excel-file')
            .then(res => res.json())
            .then(data => setAllList(data))
    }, [])

    useEffect(() => {
        let id = 0;
        const araya = []
        allList.map(list => {
            // console.log(list) 
            const newList = { ...list, id: id }
            id++;
            araya.push(newList)


            // setRowDatas([...rowDatas, newList]);
            return 0
        })
        setRowDatas(araya);

    }, [allList])


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100
        },
        {
            field: "listName",
            headerName: "Name",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.listName}
                    </div>
                );
            },
        },
        {
            field: "array",
            headerName: "Total Number",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.array.length}
                    </div>
                );
            },
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
                rows={rowDatas}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div >
    );
};

export default AllList;