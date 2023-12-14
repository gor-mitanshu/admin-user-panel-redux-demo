import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import PaymentSuccessModal from "./paymentStatus/PaymentSuccessModal";
import PaymentFailureModal from "./paymentStatus/PaymentFailureModal";

const PaymentCard = ({ product }: any) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [referenceNum, setReferenceNum] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [openFailureModal, setOpenFailureModal] = useState(false);

  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const checkOutHandler = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const amount = product.price;
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/loggedProfile`,
        {
          headers: {
            Authorization: `Bearer ${accessTokenwithoutQuotes}`,
          },
        }
      );

      const data = response.data.data;
      const { _id: userId, firstname, lastname, email } = data;
      const {
        data: { order },
      } = await axios.post(
        `${process.env.REACT_APP_API}/user/payment/payment-checkout`,
        {
          amount,
          userId,
          userName: `${firstname} ${lastname}`,
          userEmail: email,
        },
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );

      const options = {
        key: process.env.REACT_APP_KEY_ID,
        // amount: order.amount * 100,
        amount: order.amount,
        currency: "INR",
        name: product.name,
        description: "Test Transaction",
        image: product.image,
        order_id: order.id,
        prefill: {
          name: `${firstname} ${lastname}`,
          email: email,
          contact: "1234567890",
        },
        handler: async function (response: any) {
          const body = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            uid: data._id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            amount: order.amount,
            order_id: order.id,
            currency: order.currency,
            order_created_at: order.created_at,
            amount_due: order.amount_due,
            amount_paid: order.amount_paid,
            attempts: order.attempts,
          };

          const res = await axios.post(
            `${process.env.REACT_APP_API}/user/payment/getRazorPaydetails`,
            body,
            {
              headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
            }
          );
          if (!!res && res.data.success) {
            setPaymentDetails(res.data.data);
            setReferenceNum(res.data.data.razorpay_order_id);
            setPaymentStatus("success");
            setOpenSuccessModal(true);
          } else {
            setPaymentStatus("failure");
            setOpenFailureModal(true);
          }
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = (window as any).Razorpay(options);
      if (razor) {
        razor.open();
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus("error");
    }
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item lg={6} md={10}>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={product.image}
                alt={product.name}
              />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {product.price} ₹
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={checkOutHandler}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <PaymentSuccessModal
        open={openSuccessModal}
        handleClose={() => setOpenSuccessModal(false)}
        referenceNum={referenceNum}
        paymentDetails={paymentDetails}
      />

      <PaymentFailureModal
        open={openFailureModal}
        handleClose={() => setOpenFailureModal(false)}
      />

      {paymentStatus === "error" && toast.error("Please try again later.")}
    </div>
  );
};

export default PaymentCard;
