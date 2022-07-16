import React from 'react';
import "./featuredInfo.css";
import { Grid } from '@material-ui/core';
const FeaturedInfo = (props) => {
  const [data, setData] = React.useState(props.data);
  return (
    <div className="featured">
      <Grid container spacing={1}>
        {data.map((item) =>
          <Grid sm={12} md={6} lg={4} key={item.id} style={{ width: "100%" }}>
            <div className="featuredItem">
              <span className="featuredTitle">{item.name}</span>
              <div className="featuredMoneyContainer">
                {item.icon}
                <span className="featuredMoney">{item.value}</span>
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FeaturedInfo; 
