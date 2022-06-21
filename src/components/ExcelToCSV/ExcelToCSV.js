import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseFirebase from '../../Hooks/UseFirebase';
import './ExcelToCSV.css';
import swal from 'sweetalert';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 100 },
//     {
//         field: 'name',
//         headerName: 'Name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'number',
//         headerName: 'Number',
//         type: 'number',
//         width: 200,
//         editable: true,
//     },
// ];
const ExcelToCSV = () => {
    const navigate = useNavigate()
    const { user } = UseFirebase()
    // Code for convert csv to json 
    const [array, setArray] = useState([]);
    const [listName, setListName] = useState('');
    const [listText, setListText] = useState('');
    const fileReader = new FileReader();


    const handleOnChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
    };



    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\r\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");
        const CSVArray = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {

                object[header] = values[index];
                return object;
            }, {});

            return obj;
        });
        setArray(CSVArray)
    };
    const ListName = (e) => {
        setListName(e.target.value)
    }

    const ListText = (e) => {
        setListText(e.target.value)
    }

    const NewListMake = (e) => {
        e.preventDefault()
        const email = user.email;
        const listData = { listName, email, listText, array };

        const url = `http://localhost:4000/upload-excel-file`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(listData)
        })
            .then(res => res.json())
            .then(data => {

                if (data?.insertedId) {
                    swal({
                        title: "Are you sure?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willAdd) => {
                            if (willAdd) {
                                swal("List is added", {
                                    icon: "success",
                                });
                                navigate('/all-lists')
                            } else {
                                swal("Your imaginary file is safe!");
                            }
                        });
                }
            })
    }


    const GoTOAllLIst = () => {
        navigate('/all-lists')
    } 

    return (
        <div className="excelToCSVContainer">

            {/* Drop Box Code Start here*/}


            {/* Drop Box Code End */}
            <div className='d-flex justify-content-between'>
                <h1>Upload Your excel File </h1>
                <button onClick={GoTOAllLIst} className="allListBtn">All List</button>
            </div>
            <div className='d-flex flex-column align-items-center'  >


                <form onSubmit={NewListMake}>
                    <div className='d-flex mt-5 '>
                        <label className='me-5'>Name :</label>
                        <input required onBlur={ListName} type="text" placeholder='List name' />
                    </div>
                    <div className='d-flex  '>
                        <label className='me-5'>Description :</label>
                        <textarea onBlur={ListText} name="listDescription" cols="50" rows="5"></textarea>
                    </div>
                    <div className='d-flex flex-row mt-5'>
                        <h6 className='me-5'>Upload File (CSV) :</h6>
                        <input
                            required
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='text-center'>
                        <button type='submit' className="makeListBtn m-5">Create</button>
                    </div>
                </form>
            </div>

            <br />


            {/* <DataGrid
                rows={csvFile}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[25]}
                checkboxSelection
                disableSelectionOnClick
            /> */}
        </div>
    );
};

export default ExcelToCSV;