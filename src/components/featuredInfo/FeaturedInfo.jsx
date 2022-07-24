import React from 'react';
import "./FeaturedInfo.css";
import { Grid } from '@material-ui/core';
const FeaturedInfo = (props) => {
  const [data, setData] = React.useState(props.data);
  //use loading to show the loading spinner
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setData(props.data);
    if (props.data.length > 0) {
      setLoading(false);
    }
  }
    , [props.data]);
  return (
    <div className="featured">
      {
        loading ? <div className="loading">Loading...</div> :
          <Grid container spacing={1}>
            {data.map((item) =>
              <Grid item sm={12} md={6} lg={4} key={item.id} style={{ width: "100%" }}>
                <div className="featuredItem">
                  <span className="featuredTitle">{item.icon} {item.name}</span>
                  <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{item.value}</span>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
      }
    </div>
  );
};

export default FeaturedInfo; 
