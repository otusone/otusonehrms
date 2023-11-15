import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "./Datetime.css";
import { Button, FormControl, MenuItem, Select } from "@mui/material";

function Datetime() {
  const [value, setValue] = React.useState<any>({});

  const handleCheckIn = async () => {
    const date = new Date();
    setValue(date);
    console.log(date, "date");

    try {
      // Example of making a POST API call using Axios
      const response = await axios.post(
        "https://hrms-server-ygpa.onrender.com/empAttendance/marked-attendance",
        value
      );

      // Handle the response data
      console.log("API Response:", response);
    } catch (error) {
      // Handle errors
      console.error("API Error:", error);
    }
  };

  const handledate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    console.log("Check In Clicked, Current Date:", formattedDate);
  };

  const handleCheckout = () => {
    const date = new Date();
    console.log(date, "date");
  };

  return (
    <>
      <div className="datetimecontainer">
        <div className="dateconatiner">
          <Button variant="outlined" onClick={handledate}>
            Current Date
          </Button>
        </div>

        <div className="timeconatiner">
          <Button variant="outlined" onClick={handleCheckIn}>
            Check In
          </Button>
        </div>

        <div className="timecheckout">
          <Button variant="outlined" onClick={handleCheckout}>
            Check Out
          </Button>
        </div>
      </div>
    </>
  );
}

export default Datetime;
