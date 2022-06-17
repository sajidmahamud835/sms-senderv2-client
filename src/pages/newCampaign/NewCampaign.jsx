import "./newCampaign.css";
import React from 'react';
import { useState } from "react";

const NewCampaign = () => {
  const [nameInputData, setNameInputData] = useState()
  const [optionInputData, setOptionInputData] = useState()
  const [campaignMsg, setCampaignNote] = useState()
  const [startTimeInput, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [number, setNumber] = useState()
  const [myNumbers, setMyNumbers] = useState([
    "+19034204596", "+19785813348"
  ])

  const campaignName = (e) => {
    setNameInputData(e.target.value);
  }
  const OptionList = (e) => {
    setOptionInputData(e.target.value);
  }
  const campaignNote = (e) => {
    setCampaignNote(e.target.value);
  }
  const StartTime = (e) => {
    setStartTime(e.target.value);
  }
  const EndTime = (e) => {
    setEndTime(e.target.value);
  }
  const StartDate = (e) => {
    setStartDate(e.target.value);
  }
  const EndDate = (e) => {
    setEndDate(e.target.value);
  }
  const saveDraft = (e) => {
    e.preventDefault();
    const DraftData = {
      nameInputData, number, optionInputData, campaignMsg, startTimeInput, endTime, startDate, endDate
    }
    console.log(DraftData);

  }
  const handleSender = (e) => {
    setNumber(e.target.value)
  };
  return (
    <div className="newCampaign">
      <form className="addCampaignForm">
        <h1 >Create A Campaign</h1>
        <div className="addCampaignItem">
          <label htmlFor="lists">Name :</label>
          <input onBlur={campaignName} type="text" placeholder="Campaign Name" />
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <label htmlhtmlFor="receiver" className="w-50">From:</label>
          <select
            id="receiver"
            className="ms-3 ps-2 form-control w-full"
            onBlur={handleSender}
            required
          >
            <option value="saab">None</option>
            {myNumbers.map(myNumber => (
              <option value={myNumber}>{myNumber}</option>
            ))
            }
          </select>
        </div>
        <div className="addCampaignItem d-flex justify-content-between align-items-center my-3">
          <label htmlFor="lists"  >Contact List :</label>
          <select name="lists" onBlur={OptionList} id="cars">
            <option value="list1">List 1</option>
            <option value="list2">List 2</option>
            <option value="list3">List 3</option>
            <option value="list4">List 4</option>
          </select>
        </div>
        <div className="addCampaignItem d-flex justify-content-between align-items-center my-3">
          <label >Message</label>
          <textarea onBlur={campaignNote} placeholder="Notes about campaign ....."></textarea>
        </div>
        <div className="inputContainer d-flex justify-content-between align-items-center my-3">
          <div>
            <label  >Start Time</label>
            <input onBlur={StartTime} type="time" name="startTime" />
          </div>
          <div>
            <label >End Time</label>
            <input onBlur={EndTime} type="time" name="endTime" />
          </div>

        </div>
        <div className="inputContainer d-flex justify-content-between align-items-center my-3">
          <div  >
            <label  >Start Date</label>
            <input onBlur={StartDate} type="date" name="starDate" />
          </div>
          <div >
            <label >End Date</label>
            <input onBlur={EndDate} type="date" name="endDate" />
          </div>
        </div>
        <button onClick={saveDraft} className="addCampaignButton m-5">Save as Draft</button>
        <button className="addCampaignButton m-5">Schedule Campaign</button>
      </form >
    </div >
  );
};

export default NewCampaign; 