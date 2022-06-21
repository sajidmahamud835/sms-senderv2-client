import "./newCampaign.css";
import React from 'react';

const NewCampaign = () => {
  return (
    <div className="newCampaign">
      <h1 className="addCampaignTitle">Create A Campaign</h1>
      <form className="addCampaignForm">
        <div className="addCampaignItem">
          <label>Contacts</label>
          <input type="file" id="file" />
        </div>
        <div className="addCampaignItem">
          <label>Name</label>
          <input type="text" placeholder="Test Campaign 01" />
        </div>
        <div className="addCampaignItem">
          <label>From</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addCampaignItem">
          <label>Message</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addCampaignItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addCampaignButton">Create</button>
      </form>
    </div>
  );
};

export default NewCampaign; 