import "./campaignList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { campaignRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CampaignList() {
  const [data, setData] = useState(campaignRows);

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
      field: "campaign",
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
      field: "contacts",
      headerName: "Contacts",
      width: 200
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "smssent",
      headerName: "SMS Sent",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/campaign/" + params.row.id}>
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
    <div className="campaignList">
      <div className="campaignTitleContainer">
        <h1 className="campaignTitle">Manage Campaigns</h1>
        <Link to="/newcampaign">
          <button className="campaignAddButton">Create</button>
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
}
