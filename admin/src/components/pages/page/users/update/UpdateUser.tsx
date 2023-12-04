import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MenuItem,
  Button,
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { Helmet } from "react-helmet";

interface IUser {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  picture: string | File;
  status: string;
}

const UpdateUser = () => {
  const pictureInputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [initialPicture, setInitialPicture] = useState<string>("");
  const [imageChanged, setImageChanged] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    picture: "",
    status: "",
  });
  const statusOptions = ["active", "inactive"];

  useEffect(() => {
    const getUser = async () => {
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      axios
        .get(`${process.env.REACT_APP_API}/user/getUser/${id}`, {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        })
        .then((response) => {
          const userData = response.data.data;
          setEditedUser(userData);
          setInitialPicture(userData.picture);
        });
    };
    getUser();
  }, [id]);

  const showErrorWithTimeout = (errorMessage: string, timeout: number) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, timeout);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setEditedUser((prevUserDetails) => ({
        ...prevUserDetails,
        picture: file,
      }));
      setImageChanged(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files && files.length > 0) {
      setEditedUser((prevUserDetails) => ({
        ...prevUserDetails,
        picture: files[0],
      }));
      setImageChanged(true);
    } else {
      setEditedUser((prevUserDetails) => ({
        ...prevUserDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editedUser.firstname) {
      showErrorWithTimeout("Please Enter Your firstname", 3000);
      return;
    }
    if (!editedUser.lastname) {
      showErrorWithTimeout("Please Enter Your lastname", 3000);
      return;
    }
    if (!editedUser.email) {
      showErrorWithTimeout("Please Enter Your Email", 3000);
      return;
    }
    if (!editedUser.phone) {
      showErrorWithTimeout("Please Enter Your Phone", 3000);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("firstname", editedUser.firstname);
      formData.append("lastname", editedUser.lastname);
      formData.append("email", editedUser.email);
      formData.append("phone", editedUser.phone);
      formData.append("status", editedUser.status);

      if (imageChanged && editedUser.picture instanceof File) {
        formData.append("picture", editedUser.picture);
      } else {
        formData.append("picture", initialPicture);
      }
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/user/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessTokenwithoutQuotes}`,
          },
        }
      );
      if (res) {
        navigate(`/users`);
        toast.success("User Updated Successfully");
      } else {
        showErrorWithTimeout("Unable to edit", 3000);
        return;
      }
    } catch (error: any) {
      showErrorWithTimeout(error.response.data.message, 3000);
      return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel - Update User</title>
      </Helmet>
      <Typography
        textAlign={"center"}
        className="font"
        color="black"
        variant="h3"
        paddingBottom={3}
      >
        Update User
      </Typography>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {editedUser ? (
          <>
            <Grid item xs={11} sm={10} lg={6}>
              <Avatar
                src={
                  editedUser.picture instanceof File
                    ? URL.createObjectURL(editedUser.picture)
                    : `${process.env.REACT_APP_API}/${editedUser.picture}`
                }
                alt={editedUser.firstname
                  .concat(".", editedUser.lastname)
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")
                  .toUpperCase()}
                sx={{
                  width: "150px",
                  height: "150px",
                  margin: "0 auto 20px",
                  border: "1px solid black",
                }}
                // style={{ backgroundColor: getRandomColor() }}
              />
              {error && (
                <Typography marginY={1} textAlign={"center"} color="error">
                  <b>Error:</b> {error}
                </Typography>
              )}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstname"
                    value={editedUser?.firstname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={editedUser?.lastname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedUser?.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={editedUser?.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={editedUser?.status}
                    onChange={handleChange}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.toUpperCase()}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="file"
                    id="picture"
                    name="picture"
                    inputProps={{ multiple: false }}
                    ref={pictureInputRef}
                    onChange={handleImageChange}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="error"
                size="large"
                style={{ marginTop: "20px", marginRight: "5px" }}
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "20px" }}
                onClick={(e: any) => handleSubmit(e)}
              >
                Update
              </Button>
            </Grid>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Grid>
    </>
  );
};

export default UpdateUser;
