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
  const [status, setStatus] = useState()
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
  const SavedDraft = (e) => {
    setStatus('SavedDraft')
  }
  const ScheduleCampaign = (e) => {
    setStatus('ScheduleCampaign')
  }
  const fromSubmit = (e) => {
    e.preventDefault();
    const DraftData = {
      nameInputData,
      number,
      optionInputData,
      campaignMsg,
      startTimeInput,
      endTime,
      startDate,
      endDate,
      status,
    }








    console.log(DraftData);







  }
  const handleSender = (e) => {
    setNumber(e.target.value)
  };
  return (
    <div className="newCampaign">
      <form onSubmit={fromSubmit} className="addCampaignForm">
        <h1 >Create A Campaign</h1>
        <div className="addCampaignItem d-flex justify-content-between align-items-center my-3">
          <label htmlFor="lists">Name :</label>
          <input required onBlur={campaignName} type="text" placeholder="Campaign Name" />
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <label htmlFor="receiver" className="w-50">From:</label>
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
            <label className="px-3">Start Time</label>
            <input required onBlur={StartTime} type="time" name="startTime" />
          </div>
          <div>
            <label className="px-3" >End Time</label>
            <input required onBlur={EndTime} type="time" name="endTime" />
          </div>

        </div>
        <div className="inputContainer d-flex justify-content-between align-items-center my-3">
          <div  >
            <label className="px-3" >Start Date</label>
            <input required onBlur={StartDate} type="date" name="starDate" />
          </div>
          <div >
            <label className="px-3" >End Date</label>
            <input required onBlur={EndDate} type="date" name="endDate" />
          </div>
        </div>
        <button type="submit" onClick={SavedDraft} className="addCampaignButton m-5">Save as Draft</button>
        <button type="submit" onClick={ScheduleCampaign} className="addCampaignButton m-5">Schedule Campaign</button>
      </form >
    </div >
  );
};

export default NewCampaign; 