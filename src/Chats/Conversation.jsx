import {
  ArrowBack,
  CallOutlined,
  Logout,
  MoreVert,
  VideocamOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../SearchBar/SearchBox";
import SendBar from "./SendBar";
import DefaultChatPage from "./defaultChatPage";
import "../css/All.css";
import {
  Alert,
  Box,
  Menu,
  MenuItem,
  Card,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import useSocket from "../CustomHooks/useSocket";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
// import EmojiPicker from "emoji-picker-react";

const Conversation = () => {
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [chatUser, setChatUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [defaultPg, setDefaultPg] = useState(true);
  const [state, setState] = useState("none");
  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("username");
  const [ipSearch, setIpSearch] = useState("");
  const [open, setOpen] = useState(null);
  const [rid, setRid] = useState(null);
  const [sid, setSid] = useState(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleMobileView = () => {
    setState(state === "none" ? "flex" : "none");
  };
  const socket = useSocket("https://node-js-view-point.onrender.com");

  // Fetch users on component mount
  useEffect(() => {
    if (token) {
      axios
        .get("https://node-js-view-point.onrender.com/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => setUsers(response.data))
        .catch((error) => {
          console.error("Error fetching users:", error.response);
          setErr(error.response.data.message);
        });
    }
    setUsers1(users);
  }, [token]);
  useEffect(() => {
    setUsers1(users);
  }, [users]);
  const currentUser = users.find((user) => user.username === username);

  // Set current user ID
  useEffect(() => {
    if (currentUser) setSid(currentUser._id);
  }, [users, username]);

  const handleSelectedUser = (id) => {
    setRid(id);
    setDefaultPg(false);
    setChatUser(users.find((user) => user._id === id));

    axios
      .get(`https://node-js-view-point.onrender.com/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  };

  // Real-time message receiving
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      const { message, participients } = data;
      if (participients.includes(rid)) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("sendMessage", handleNewMessage);
    return () => socket.off("sendMessage", handleNewMessage);
  }, [socket, rid]);

  // Handle search
  const handleSearch = (input) => {
    setIpSearch(input);
    if (ipSearch !== "") {
      const filteredUsers = users.filter((user) =>
        user.fullname.toLowerCase().includes(input.toLowerCase())
      );
      setUsers1(filteredUsers);
    } else {
      setUsers1(users);
    }
  };

  const handleLogout = () => {
    toast.success(
      <div>
        <p>Do you want to continue? </p>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="contained" onClick={() => toast.dismiss()}>
            Cancle
          </Button>
          <Button variant="contained" onClick={removeToken}>
            OK
          </Button>
        </div>
      </div>
    );
  };

  const removeToken = () => {
    toast.dismiss();
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    toast.success("Logged Out Successfully!");
    navigate("/");
  };
  // removeToken();

  return (
    <div className="container-fluid p-md-1 p-lg-0 p-sm-5 p-0 border ">
      {err == "" ? (
        <div className="row d-flex mx-0">
          <Box
            className="col-md-4 col-xs-12 p-0"
            sx={{
              display: {
                xs: `${state == "none" ? "flex" : "none"}`,
                md: "flex",
              },
              flex: "column",
            }}
          >
            <Card className="flex-grow-1" sx={{ boxShadow: { xs: "none" } }}>
              <Typography className=" px-3 py-2 d-flex justify-content-between align-items-center mb-0 currentuser">
                {currentUser && (
                  <div className="d-flex align-items-center gap-2">
                    <Avatar src={currentUser.profile} />
                    <Typography className="fw-bold">
                      {currentUser.fullname}
                    </Typography>
                  </div>
                )}
                <IconButton
                  sx={{ color: "red" }}
                  onClick={() => handleLogout()}
                >
                  <Logout sx={{ color: "red" }} />
                </IconButton>
              </Typography>

              <div className="py-3 px-2 chatbar">
                <Search
                  sx={{
                    borderRadius: "25px",
                    margin: "-10px 2px -10px 2px",
                    border: "none",
                  }}
                >
                  <SearchIconWrapper>
                    <SearchIcon
                      sx={{
                        color: "rgb(18, 25, 38)",
                        width: { md: "20px" },
                        marginInlineStart: { xs: 1, md: 0 },
                      }}
                    />
                  </SearchIconWrapper>
                  <StyledInputBase
                    sx={{
                      color: "rgb(18, 25, 38);",
                      fontWeight: 500,
                      marginInlineStart: {
                        xs: 3,
                        md: 0,
                      },
                      "& .MuiInputBase-input": {
                        borderRadius: "25px",
                        "&:focus": { borderRadius: "25px" },
                      },
                    }}
                    placeholder="Search…"
                    type="search"
                    value={ipSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Search>
                {users1
                  .filter((user) => user.username !== username)
                  .map((user, i) => (
                    <div key={i} onClick={() => handleSelectedUser(user._id)}>
                      <Divider
                        sx={{
                          my: 2,
                          borderBottom: "1px solid gray",
                        }}
                      />
                      <div className="d-flex justify-content-between align-items-center mx-2 ">
                        <div
                          className="d-flex gap-2"
                          onClick={handleMobileView}
                        >
                          <Avatar src={user.profile} />

                          <Typography className="fw-bold">
                            {user.fullname}
                          </Typography>
                        </div>
                        <div>
                          <Typography>&hearts;</Typography>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </Box>
          <Box
            className="col-md-8 p-0"
            sx={{
              minHeight: "100%",
              display: { xs: `${state}`, md: "flex" },
            }}
          >
            {defaultPg === true ? (
              <DefaultChatPage />
            ) : (
              <Card
                className="d-flex flex-column h-100 p-md-0 px-2"
                sx={{
                  backgroundImage: `url('/DashboardImages/chatbg.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                  width: "100%",
                  boxShadow: { xs: "none" },
                }}
              >
                {chatUser && (
                  <div className="sendbar p-md-2 p-lg-2 m-0">
                    <Typography className="d-flex justify-content-between align-items-center mb-0">
                      <div className="d-flex align-items-center gap-md-2 gap-lg-2 gap-1">
                        <IconButton
                          sx={{
                            px: 0,
                            "&:hover": { backgroundColor: "transparent" },
                            display: { xs: "block", md: "none" },
                            p: 1,
                          }}
                        >
                          <ArrowBack sx={{}} onClick={handleMobileView} />
                        </IconButton>
                        <Avatar src={chatUser.profile} />
                        <Typography
                          className="fw-bold"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: { xs: "small", md: "medium" },
                            ms: { xs: 1 },
                          }}
                        >
                          {chatUser.fullname}
                        </Typography>
                      </div>
                      <div className="d-flex gap-lg-3 gap-0 justify-content-center align-items-center">
                        <IconButton>
                          <CallOutlined color="primary" />
                        </IconButton>
                        <IconButton>
                          <VideocamOutlined color="secondary" />
                        </IconButton>
                        <IconButton onClick={() => setOpen(true)}>
                          <MoreVert />
                        </IconButton>
                        <Menu
                          open={open}
                          onClose={() => setOpen(null)}
                          sx={{
                            top: {
                              md: "30px",
                              xs: "20px",
                            },
                            "& .MuiPaper-root": {
                              borderRadius: "10px",
                              backgroundColor: "white",
                            },
                          }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <MenuItem onClick={() => setOpen(null)}>
                            View Contact
                          </MenuItem>
                          <MenuItem
                            sx={{ my: 1 }}
                            onClick={() => setOpen(null)}
                          >
                            Mute Notification
                          </MenuItem>
                          <MenuItem onClick={() => setOpen(null)}>
                            Wallpaper
                          </MenuItem>
                          <MenuItem
                            sx={{ my: 1 }}
                            onClick={() => setOpen(null)}
                          >
                            More...
                          </MenuItem>
                        </Menu>
                      </div>
                    </Typography>
                  </div>
                )}

                <Divider sx={{ borderBottom: "1px solid gray" }} />

                <Box className="flex-grow-1 pb-2 chatarea p-lg-2 p-1">
                  {messages.length > 0 ? (
                    messages.map((data, i) => (
                      <div key={i}>
                        {data.senderId !== chatUser._id ? (
                          <div className="d-flex justify-content-end">
                            <div className="msground px-2 mb-3">
                              <Typography sx={{ mb: "-2px" }} className="">
                                {data.message}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "x-small" }}
                                className="text-muted d-flex justify-content-end user-select-none"
                              >
                                {new Date(data.createdAt).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </Typography>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-start">
                            <div className="msground1 px-2 mb-3">
                              <Typography sx={{ mb: "-2px" }} className="">
                                {data.message}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "x-small" }}
                                className="text-muted d-flex justify-content-end user-select-none"
                              >
                                {new Date(data.createdAt).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </Typography>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <Typography className="d-flex justify-content-center align-items-center my-auto">
                      No messages yet
                    </Typography>
                  )}
                </Box>
                <div
                  className="position-sticky p-0 p-lg-0 px-lg-0 sendbarbg"
                  style={{ bottom: 0 }}
                >
                  <SendBar
                    sx={{ position: "fixed" }}
                    id={chatUser}
                    // onSend={handleSelectedUser}
                    sid={sid}
                    socket={socket}
                  />
                </div>
              </Card>
            )}
          </Box>
        </div>
      ) : (
        <div>
          <Alert severity="info">
            Something Went Wrong or Access Deined ! or Invalid Token
          </Alert>
          <Button
            variant="outlined"
            color="error"
            className="d-flex mx-auto my-2"
            onClick={() => handleLogout()}
          >
            LogOut
          </Button>
        </div>
      )}
    </div>
  );
};

export default Conversation;
