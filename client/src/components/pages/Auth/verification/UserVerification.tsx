import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserVerification = () => {
  const { verificationToken } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  console.log(verificationToken);
  useEffect(() => {
    debugger;
    const verifyUser = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/user/verify/${verificationToken}`
        );

        if (res.status === 200) {
          setVerificationStatus("Email verification successful.");
        }
      } catch (error: any) {
        console.log(error);
        setVerificationStatus(error?.response.data.message);
      }
    };

    verifyUser();
  }, [verificationToken]);

  return (
    <div>
      <h2>{verificationStatus}</h2>
    </div>
  );
};

export default UserVerification;
