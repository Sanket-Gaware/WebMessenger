import { Send } from "@mui/icons-material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useState } from "react";
import axios from "axios";
import { IconButton, TextField } from "@mui/material";
import "../css/All.css";

const SendBar = ({ id, sid, socket }) => {
  const token = localStorage.getItem("Token");
  const [sendMessage, setSendMessage] = useState("");

  const SendMsg = () => {
    if (sendMessage.trim() === "" || !id._id) return;

    axios
      .post(
        `https://node-js-view-point.onrender.com/api/messages/sendmessage/${id._id}`,
        { message: sendMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setSendMessage("");
        }
      })
      .catch((error) => console.error("Error sending message:", error));

    if (socket) {
      socket.emit("sendMessage", {
        message: sendMessage,
        participients: [sid, id._id],
      });
    }
  };
  return (
    <div className="d-flex justify-content-between align-items-center rounded-3 p-lg-2 p-md-2 px-0 py-1 mt-0 mt-md-2 mt-lg-2 m-2 sendbar">
      <IconButton
        sx={{
          padding: "10px",
        }}
      >
        <SentimentSatisfiedAltIcon color="primary" />
      </IconButton> 
      <TextField
        sx={{
          width: "85%",
          marginRight: { md: "10px", xs: "0px" },
        }}
        placeholder="Type a message..."
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          sx: {
            borderRadius: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
            backgroundColor: "#F5F5F5",
            "&:focus": {
              backgroundColor: "#F9F9F9",
            },
          },
        }}
      />
      <IconButton
        sx={{
          borderRadius: "50%",
          padding: "8px",
        }}
      >
        <AttachmentIcon color="dark" />
      </IconButton>
      <IconButton
        onClick={() => SendMsg()}
        sx={{
          borderRadius: "50%",
          padding: "8px",
        }}
      >
        <Send color="primary" />
      </IconButton>
    </div>
  );
};

export default SendBar;
