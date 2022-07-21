import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UseFirebase from "../../Hooks/UseFirebase";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const PricingTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { user, loading } = UseFirebase();
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  // subscriptions
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/subscriptions`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => {
        // console.log(res.status);
        if (res.status === 403 || res.status === 401) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then((data) => setSubscriptions(data));

    fetch(`${process.env.REACT_APP_SERVER_URL}/users/email/${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => {
        // console.log(res.status);
        if (res.status === 403 || res.status === 401) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then(data => setUserData(data));
  }, [navigate, user]);
  // console.log(subscriptions);
  const handelSubscription = (data) => {
    const updateData = { subscriptionId: data._id };
    const url = `${process.env.REACT_APP_SERVER_URL}/users/${userData[0]._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        if (userData[0].profileUpdated) {
          navigate("/");
        }
        else {
          navigate("/updateProfile");
        }
      });
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {subscriptions?.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier?._id}
              xs={12}
              sm={tier?.name === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier?.name}
                  titleTypographyProps={{ align: "center" }}
                  action={tier?.name === "Pro" ? <StarIcon /> : null}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h4"
                      color="text.primary"
                    >
                      ${tier?.Price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography component="li" variant="h6" align="center">
                        {tier?.SmsLimit}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /sms
                      </Typography>
                    </Box>
                  </ul>
                  <ul>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      className="mt-3"
                    >
                      {tier?.SubscriptionsNote}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      handelSubscription(tier);
                    }}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default PricingTable;
