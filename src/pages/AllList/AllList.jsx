import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import UseFirebase from "../../Hooks/UseFirebase";
import './AllList.css';

const AllList = () => {
    const [allList, setAllList] = useState([]);
    const [rowDatas, setRowDatas] = useState([]);
    const { user } = UseFirebase();
    const navigate = useNavigate();
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
                        const url = `${process.env.REACT_APP_SERVER_URL}/delete-excel-file/${id}`;
                        fetch(url, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount > 0) {
                                    swal("List is Deleted", {
                                        icon: "success",
                                    });
                                    setRowDatas(rowDatas.filter((item) => item._id !== id));

                                }
                            });
                    } else {
                        swal("Sorry Some Error occurs!");
                    }
                });
        }


    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/upload-excel-file?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => {
                console.log(res.status);
                if (res.status === 403 || res.status === 401) {
                    navigate('/login');
                } else {
                    return res.json();
                }
            })
            .then(data => setAllList(data));
    }, [user?.email, navigate]);

    useEffect(() => {
        let id = 1;
        const initialArray = [];
        allList?.map(list => {
            const newList = { ...list, id: id };
            id++;
            initialArray.push(newList);
            return 0;
        });
        setRowDatas(initialArray);

    }, [allList]);


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
                        <Link to={"/edit-all-lists/" + params.row._id}>
                            <button className="campaignListEdit">Edit</button>
                        </Link>
                    </div>
                );
            },
        },
        {
            field: "action Delete",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <DeleteOutline
                            className="campaignListDelete"
                            onClick={() => handleDelete(params.row._id)}
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