import React, { useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
const ExcelToCSV = () => {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        console.log(csvRows);
        const array = csvRows.map(i => {
            const values = i.split(",");
            console.log(values);
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                // I need to add index but here is no option to get add index
                let x = Math.random();
                object["id"] = x;
                return object;
            }, {});
            console.log(obj);
            return obj;
        });

        const function4Chacking = (e) => {
            if (e.number === '') {
                console.log('a number is not available');
            }
            else {
                setArray(array);
            }
        }
        const chacking = array.map(ar => function4Chacking(ar))
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'personName',
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
    const headerKeys = Object.keys(Object.assign({}, ...array));
    return (
        <div style={{ textAlign: "center" }} className="newCampaign">
            <h1>Upload Your excel File </h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>

            <br />


            <DataGrid
                rows={array}
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