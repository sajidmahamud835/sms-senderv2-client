import React, { useState, useMemo } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from 'react';
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
    const [csvFile, setCsvFile] = useState([]);
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
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
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

        const function4Chacking = (e) => {
            console.log(e.name);
            if (e.number === '') {
                console.log('a number is not available');
            }
            else {
                console.log(array);
                setArray(array);
            }
        }
        const chacking = array.map(ar => function4Chacking(ar))
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'number',
            headerName: 'Number',
            type: 'number',
            width: 200,
            editable: true,
        },
    ];
    // const headerKeys = Object.keys(Object.assign({}, ...array));

    useEffect(() => {
        fetch("http://localhost:4000/csvList", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(array),
        })
            .then((res) => res.json())
    }, [array])

    // console.log(array)
    useEffect(() => {
        fetch('http://localhost:4000/csvList')
            .then(res => res.json())
            .then(data => setCsvFile(data))
    }, [])

    return (
        <div style={{ textAlign: "center" }} className="newCampaign">

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
            <h1>Upload Your excel File </h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />
            </form>

            <br />


            <DataGrid
                rows={csvFile}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[25]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default ExcelToCSV;