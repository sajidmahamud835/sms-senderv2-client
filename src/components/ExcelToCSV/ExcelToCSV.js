import React, { useState, useMemo } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from 'react';
import './ExcelToCSV.css'
// import { useDropzone } from 'react-dropzone'

// Drop box Style Start


// const baseStyle = {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     borderWidth: 2,
//     borderRadius: 2,
//     borderColor: '#eeeeee',
//     borderStyle: 'dashed',
//     backgroundColor: '#fafafa',
//     color: '#bdbdbd',
//     outline: 'none',
//     transition: 'border .24s ease-in-out'
// };

// const focusedStyle = {
//     borderColor: '#2196f3'
// };

// const acceptStyle = {
//     borderColor: '#00e676'
// };

// const rejectStyle = {
//     borderColor: '#ff1744'
// };

// Drop box Style End
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

    // Code for Drop Box Start

    // const {
    //     getRootProps,
    //     getInputProps,
    //     isFocused,
    //     isDragAccept,
    //     isDragReject,
    //     acceptedFiles
    // } = useDropzone({
    //     accept: 'text/csv'
    // });

    // const style = useMemo(() => ({
    //     ...baseStyle,
    //     ...(isFocused ? focusedStyle : {}),
    //     ...(isDragAccept ? acceptStyle : {}),
    //     ...(isDragReject ? rejectStyle : {})
    // }), [
    //     isFocused,
    //     isDragAccept,
    //     isDragReject
    // ]);

    // const files = acceptedFiles.map(file => (
    //     <li key={file.name}>
    //         {file.name} - {file.size} bytes
    //     </li>
    // ));





    // Code for Drop Box End




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
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");

        // console.log(csvRows);

        const array = csvRows.map(i => {
            const values = i.split(",");
            // console.log(values);
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                // I need to add index but here is no option to get add index
                // let x = Math.random();
                // object["id"] = x;
                return object;
            }, {});
            return obj;
        });
        setArray(array)
    };
    const ListName = (e) => {
        setListName(e.target.value)
    }
    const ListText = (e) => {
        setListText(e.target.value)
    }
    const NewListMake = (e) => {
        e.preventDefault()
        console.log({ listName, listText, array });
    }


    // const listData = {
    //     _id:'dashdjashaa23124',
    //     listName: 'listName',
    //     description: "description",

    // }
    // const updatedListData = {
    //     ...listData,
    //     listNumbers: array
    // }



    // useEffect(() => {
    //     fetch("http://localhost:4000/csvList", {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //         body: JSON.stringify(array),
    //     })
    //         .then((res) => res.json())
    //         .then(data => {
    //             console.log(data);
    //             console.log('data has gone')
    //         })
    // }, [array])

    // console.log(array)
    // useEffect(() => {
    //     fetch('http://localhost:4000/csvList')
    //         .then(res => res.json())
    //         .then(data => setCsvFile(data))
    // }, [])

    return (
        <div className="excelToCSVContainer">

            {/* Drop Box Code Start here*/}


            {/* <div className="container">
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside> */}


            {/* Drop Box Code End */}
            <div className='d-flex flex-column align-items-center'  >
                <h1>Upload Your excel File </h1>

                <form onSubmit={NewListMake}>
                    <div className='d-flex  '>
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