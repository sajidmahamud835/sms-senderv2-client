import React from "react";
import LayOut from "../components/LayOut/LayOut";
import PricingTable from "../components/PriceTable/PriceTable";

const Verify = () => {
  return (
    <LayOut>
      <div
        className="mx-auto d-flex justify-content-center align-items-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-primary mb-5">
          Please select a subscription package and complete your profile to
          start using our service.
        </h1>
        <PricingTable />
      </div>
    </LayOut>
  );
};

export default Verify;
