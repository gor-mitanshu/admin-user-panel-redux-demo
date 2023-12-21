import React, { useEffect } from "react";
import "../dashboard/Dashboard.css";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Block, Check, Group } from "@mui/icons-material";
import EChart from "../echart/EChartData";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getUserCountsSuccess,
  userCountsFailure,
  userCountsRequest,
} from "../../../../redux/action/getUserCountAction";
import { getUserCountService } from "../../../../service/commonService";

const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const loginToken = useSelector((state: any) => state.login.token);
  const userCounts = useSelector((state: any) => state.userCounts.userCounts);
  const fetUserCounts = async () => {
    try {
      dispatch(userCountsRequest());
      if (loginToken) {
        const response = await getUserCountService(loginToken);
        if (response && response.data) {
          dispatch(getUserCountsSuccess(response.data.data));
        } else {
          console.error("User counts not found");
          dispatch<any>(userCountsFailure());
        }
      } else {
        console.error("Token not found");
        dispatch<any>(userCountsFailure());
      }
    } catch (error) {
      console.error("Error fetching user counts:", error);
      dispatch<any>(userCountsFailure());
    }
  };
  useEffect(() => {
    fetUserCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>Admin Panel - Dashboard</title>
      </Helmet>
      <Grid container padding={2} spacing={1}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card
            elevation={4}
            sx={{
              background: "#29a744",
              color: "#fff",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ fontSize: "2rem" }}
                >
                  {userCounts.active}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  component="div"
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Check color="inherit" />
                  Active Users
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>

        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card
            elevation={4}
            sx={{
              background: "#dc3546",
              color: "#fff",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ fontSize: "2rem" }}
                >
                  {userCounts.inactive}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  component="div"
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Block color="inherit" />
                  Inactive Users
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Card
            elevation={4}
            sx={{
              background: "#f8c12b",
              color: "#fff",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ fontSize: "2rem" }}
                >
                  {userCounts.total}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  component="div"
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Group color="inherit" />
                  Total Users
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid padding={2}>{userCounts.total > 0 && <EChart />}</Grid>
    </>
  );
};

export default Dashboard;
