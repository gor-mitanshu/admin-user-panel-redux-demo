import {
  Grid,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Block, Check, Delete, Edit, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import DialogModal from "../../dailogueBox/DialogModal";
import { useDispatch } from "react-redux";
import { IAppState } from "../../../../../redux/type";
import { useSelector } from "react-redux";
import {
  usersFailure,
  usersRequest,
  usersSuccess,
} from "../../../../../redux/action/getAllUsersAction";
import { getUsersService } from "../../../../../service/commonService";
import { RootState } from "../../../../../redux/store";

function getRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const opacity = 0.5;
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function getInitials(name: any) {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part: any) => part.charAt(0).toUpperCase());
  return initials.join("");
}

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginToken = useSelector((state: RootState) => state.login.token);
  const usersState = useSelector((state: IAppState) => state.users);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    userId?: string;
  }>({ open: false });

  const getUsers = async () => {
    try {
      dispatch<any>(usersRequest());
      if (loginToken) {
        const response: any = await getUsersService(loginToken);
        if (response && response.data) {
          dispatch<any>(usersSuccess(response.data.data));
        } else {
          console.log("Users not found");
          dispatch<any>(usersFailure());
        }
      } else {
        console.log("Token not found");
        dispatch<any>(usersFailure());
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      dispatch<any>(usersFailure());
    }
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onUserDelete = (id: string) => {
    setConfirmDialog({ open: true, userId: id });
  };

  const handleConfirmation = async (confirmed: boolean) => {
    if (confirmed) {
      debugger;
      try {
        const accessToken: any = localStorage.getItem("token");
        const accessTokenwithoutQuotes = JSON.parse(accessToken);
        const res = await axios.delete(
          `${process.env.REACT_APP_API}/user/delete/${confirmDialog.userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessTokenwithoutQuotes}`,
            },
          }
        );
        if (res && res.data) {
          getUsers();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    setConfirmDialog({ open: false, userId: undefined });
  };

  const rows = usersState.users.map((user: any, key: any) => ({
    id: key + 1,
    userId: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    picture: (
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      <Avatar
        src={
          user.picture
            ? `${process.env.REACT_APP_API}/userImages/${user.picture}`
            : getInitials(user.firstname)
        }
        alt={getInitials(user.firstname)}
        style={{ backgroundColor: getRandomColor() }}
      />
    ),
    status: user.status,
  }));

  const columns: any = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header",
      description: "ID",
      flex: 0.1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "picture",
      headerName: "Picture",
      headerClassName: "header",
      description: "Picture",
      renderCell: (params: any) => params.value,
      flex: 0.4,
      // editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstname",
      headerName: "Firstname",
      headerClassName: "header",
      description: "Firstname",
      flex: 0.8,
      // editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastname",
      headerName: "Lastname",
      headerClassName: "header",
      description: "Lastname",
      flex: 0.8,
      // editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "header",
      description: "Email",
      flex: 1.5,
      // editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "header",
      description: "Contact",
      flex: 1,
      // editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "header",
      description: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <Chip
            label={params.row.status.toUpperCase()}
            icon={
              params.row.status === "active" ? (
                <Check color="success" />
              ) : (
                <Block color="error" />
              )
            }
            size="medium"
            variant="outlined"
            sx={{ width: "130px" }}
            className={
              params.row.status === "active"
                ? "active"
                : params.row.status === "inactive"
                ? "inactive"
                : ""
            }
            color="info"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "header",
      description: "Actions",
      flex: 1,
      type: "actions",
      headerAlign: "center",
      align: "center",
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<Visibility color={"primary"} />}
          label="Delete"
          onClick={() =>
            params.row.userId &&
            navigate(`/users/viewuser/${params.row.userId}`)
          }
        />,
        <GridActionsCellItem
          icon={<Delete color={"error"} />}
          label="Delete"
          onClick={() => onUserDelete(params.row.userId)}
        />,
        <GridActionsCellItem
          icon={<Edit color="info" />}
          label="Edit"
          onClick={() => navigate(`/users/updateuser/${params.row.userId}`)}
        />,
      ],
    },
  ];
  return (
    <>
      <Helmet>
        <title>Admin Panel - Users</title>
      </Helmet>
      <Grid container padding={2} style={{ height: "50%" }}>
        <Typography
          className="font"
          color="black"
          variant="h3"
          paddingBottom={3}
        >
          Users
        </Typography>
        {usersState.loading === false ? (
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
            xs={12}
          >
            {usersState.users.length > 0 ? (
              <Grid item lg={12} sm={12} xs={11}>
                <DataGrid
                  columns={columns}
                  rows={rows}
                  density="comfortable"
                  // rowHeight={70}
                  // getRowHeight={() => "auto"}
                  // getEstimatedRowHeight={() => 200}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 7 } },
                  }}
                  {...usersState}
                  pageSizeOptions={[7, 10, 25]}
                  sx={{ background: "#a9a9a914" }}
                  slots={{ toolbar: GridToolbar }}
                />
              </Grid>
            ) : (
              <Typography variant="h5" color="error">
                No Data Found
              </Typography>
            )}
          </Grid>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Grid>

      {confirmDialog.open && (
        <DialogModal
          isOpen={confirmDialog.open}
          handleClose={() =>
            setConfirmDialog({ open: false, userId: undefined })
          }
          handleConfirm={() => handleConfirmation(true)}
          title="Confirm Delete"
          message="Are you sure you want to delete this user?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          confirmColor="error"
          cancelColor="primary"
        />
      )}
    </>
  );
};

export default Users;
