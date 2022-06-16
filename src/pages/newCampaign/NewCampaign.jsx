import "./newCampaign.css";
import React from 'react';

const NewCampaign = () => {
  return (
    <div className="newCampaign">
      <h1 className="addCampaignTitle">Create A Campaign</h1>
      <form className="addCampaignForm">
        <div className="addCampaignItem">
          <label>Contacts</label>
        </div>
        <div className="addCampaignItem">
          <label className="pe-4">Name</label>
          <input type="text" placeholder="Campaign Name" />
        </div>
        <div className="addCampaignItem">
          <label for="lists" className="pe-4">Contact List</label>
          <select name="lists" id="cars">
            <option value="list1">List 1</option>
            <option value="list2">List 2</option>
            <option value="list3">List 3</option>
            <option value="list4">List 4</option>
          </select>
        </div>
        <div className="addCampaignItem">
          <label className="pe-4">Message</label>
          <textarea placeholder="Notes about campaign ....."></textarea>
        </div>
        <div className="addCampaignItem mt-5">
          <div>
            <label  >Start Time</label>
            <input type="time" name="startTime" />
          </div>
          <div>
            <label >End Time</label>
            <input type="time" name="endTime" />
          </div>

        </div>
        <div className="addCampaignItem">
          <div  >
            <label  >Start Date</label>
            <input type="date" name="starDate" />
          </div>
          <div className="mx-5">
            <label >End Date</label>
            <input type="date" name="endDate" />
          </div>

        </div>
        <button className="addCampaignButton m-5">Save as Draft</button>
        <button className="addCampaignButton m-5">Schedule Campaign</button>
      </form>
    </div>
  );
};

export default NewCampaign; 