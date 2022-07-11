import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './EditAllList.css';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from 'react-router-dom';

const EditAllList = () => {
    let { Id } = useParams();
    const [listData, setListData] = useState({})
    const [rowData, setRowData] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/excel-file/${Id}`)
            .then(res => res.json())
            .then(data => setListData(data[0]))
    }, [Id])


    useEffect(() => {
        // setRowData(listData?.array);
        if (listData.array) {
            setRowData(listData.array);
        }

    }, [listData])


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100, renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.id}
                    </div>
                );
            },
        },
        {
            field: "name",
            headerName: "Campaign Name",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "mobile",
            headerName: "Mobile",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="campaignListItem">
                        {params.row.name}
                    </div>
                );
            },
        }

    ];
    return (
        <div className='EditAllListContainer'>
            <h1> Edit List</h1>
            <Container className="d-block">
                <h3 >Name :  <b>{listData?.listName}</b></h3>
                <h5>Details :  <b>{listData?.listText}</b></h5>
                <h5>Total Number :  <b>{rowData.length}</b></h5>
            </Container>
            <Container className="d-block">
                <DataGrid
                    rows={rowData}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                />
            </Container>
        </div >
    );
};

export default EditAllList;