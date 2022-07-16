import React, { useEffect } from 'react';
import "./campaignList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useState } from "react";


const CampaignList = () => {
  const [cdata, setCData] = useState([]);
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/campaigns`)
      .then(res => res.json())
      .then(data => setCData(data));
  }, []);


  useEffect(() => {
    let id = 1;
    const initArray = [];
    cdata.map(list => {
      const newList = { ...list, id: id };
      id++;
      initArray.push(newList);
      return 0;
    });
    setRowData(initArray);

  }, [cdata]);



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
            const url = `${process.env.REACT_APP_SERVER_URL}/campaigns/${id}`;
            fetch(url, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(data => {
                if (data.deletedCount > 0) {
                  swal("Campaign is Deleted", {
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
      }
    },
    {
      field: "number",
      headerName: "Contacts",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="campaignListItem">
            {params.row.number}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    // {
    //   field: "smssent",
    //   headerName: "SMS Sent",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/campaign/" + params.row._id}>
              <button className="campaignListEdit">Details</button>
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
  return (
    <div className="campaignList ">
      <div className="campaignTitleContainer">
        <h1 className="campaignTitle">Manage Campaigns</h1>
        <Link to="/newCampaign">
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

export default CampaignList;
