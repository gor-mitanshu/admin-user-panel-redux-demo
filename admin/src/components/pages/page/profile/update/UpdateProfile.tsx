import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { Avatar, Typography, Button, Grid, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import DialogModal from "../../dailogueBox/DialogModal";

interface IUser {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  picture: string | File;
}

const UpdateProfile = () => {
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
  });
  const initialUser = useRef<IUser>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    picture: "",
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      axios
        .get(`${process.env.REACT_APP_API}/admin/getAdmin/${id}`, {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        })
        .then((response) => {
          const userData = response.data.data;
          setEditedUser(userData);
          initialUser.current = userData;
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

  const handleSubmit = async () => {
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

      if (imageChanged && editedUser.picture instanceof File) {
        formData.append("picture", editedUser.picture);
      } else {
        formData.append("picture", initialPicture);
      }
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/admin/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessTokenwithoutQuotes}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        navigate(`/profile`);
        toast.success("User Updated Successfully");
      } else {
        showErrorWithTimeout("Unable to edit", 3000);
        return;
      }
    } catch (error: any) {
      console.log(error);
      showErrorWithTimeout(error.response.data.message, 3000);
      return;
    }
  };

  const hasChanges = () => {
    return (
      editedUser.firstname !== initialUser.current.firstname ||
      editedUser.lastname !== initialUser.current.lastname ||
      editedUser.email !== initialUser.current.email ||
      editedUser.phone !== initialUser.current.phone ||
      (imageChanged &&
        editedUser.picture instanceof File &&
        editedUser.picture !== initialUser.current.picture)
    );
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmUpdate = () => {
    handleSubmit();
    handleCloseDialog();
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel - Update Profile</title>
      </Helmet>
      <Typography
        textAlign={"center"}
        className="font"
        color="black"
        variant="h3"
        paddingBottom={3}
      >
        Update Profile
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
                  editedUser.picture
                    ? editedUser.picture instanceof File
                      ? URL.createObjectURL(editedUser.picture)
                      : `${process.env.REACT_APP_API}/adminImages/${editedUser.picture}`
                    : ""
                }
                alt={editedUser.firstname
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")
                  .toUpperCase()}
                sx={{
                  width: "150px",
                  height: "150px",
                  margin: "0 auto 20px",
                }}
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
                    InputProps={{
                      readOnly: true,
                    }}
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
                    fullWidth
                    type="file"
                    id="picture"
                    name="picture"
                    onChange={handleChange}
                    InputProps={{ inputProps: { multiple: false } }}
                  />
                </Grid>
              </Grid>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  style={{ marginTop: "20px", marginRight: "5px" }}
                  // onClick={handleOpenDialog}
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginTop: "20px" }}
                  // onClick={(e: any) => handleSubmit()}
                  onClick={handleOpenDialog}
                  disabled={!hasChanges()}
                >
                  Update
                </Button>
              </div>
            </Grid>
          </>
        ) : (
          <Typography variant="h5" color="error">
            No Data Found
          </Typography>
        )}
      </Grid>

      <DialogModal
        isOpen={isDialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmUpdate}
        title="Confirm Update"
        message="Are you sure you want to update your profile?"
        cancelButtonText="Cancel"
        confirmButtonText="Update"
        cancelColor="error"
        confirmColor="primary"
      />
    </>
  );
};

export default UpdateProfile;
