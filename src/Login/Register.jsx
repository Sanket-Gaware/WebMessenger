import {
  useTheme,
  InputAdornment,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
// import "../Css/DashboardAll.css";
import { useState} from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = yup.object({
  fname: yup.string("Enter your email").required("First name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  function signup(values) {
    setErrorMessage("");
    axios
      .post("https://node-js-view-point.onrender.com/api/auth/signup", {
        profile: profile,
        fullname: values.fname + " " + values.lname,
        username: values.email,
        gender: values.gender,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log(response);
          toast.success("User Created");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.data.message || "failed !");
          toast.error(error.response.data.message);
        } else {
          setErrorMessage("User creation failed");
          toast.error("User Creation Failed");
        }
      });
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fname: "",
      lname: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signup(values);
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card
        sx={{
          py: 4,
          borderRadius: "10px",
          boxShadow: "none",
          border: "1px solid white",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                padding: "20px",
                [theme.breakpoints.down("xs")]: {
                  padding: "10px",
                },
              },
            }}
          >
            <Typography
              className="d-flex justify-content-center align-items-center"
              variant="h5"
              sx={{ fontWeight: "bold", letterSpacing: "1px" }}
            >
              Chat App
            </Typography>
            <br />
            <Typography
              className="d-flex justify-content-center align-items-center"
              variant="h5"
              sx={{
                fontWeight: "bolder",
                color: "#673Ab7",
                fontFamily: "sans-serif",
                letterSpacing: "1.5px",
                mb: 1,
              }}
            >
              Sign Up
            </Typography>
            <Typography
              className="d-flex justify-content-center align-items-center"
              sx={{ mb: 3, color: "#677586", fontFamily: "sans-serif" }}
            >
              Enter your credentials to continue
            </Typography>

            {errorMessage && (
              <Typography
                className="d-flex justify-content-center"
                color="error"
                sx={{ mb: 2, fontSize: "small" }}
              >
                {errorMessage}
              </Typography>
            )}
            <Typography
              className="d-flex justify-content-center align-items-center"
              sx={{ mb: 2, color: "black", fontFamily: "sans-serif" }}
            >
              Select a Profile Picture
            </Typography>
            <div className="d-flex gap-2 justify-content-center mb-2">
              {ProfileImages.map((pic, i) => {
                return (
                  <Avatar
                    key={i}
                    src={pic.link}
                    onClick={() => setProfile(pic.link)}
                    sx={{
                      border:
                        profile === pic.link
                          ? "3px solid rgb(136, 228, 159)"
                          : "3px solid rgb(187, 157, 252)",
                      width: "50px",
                      height: "50px",
                      mb: 1,
                      "&:hover": {
                        border: "none",
                      },
                    }}
                  />
                );
              })}
            </div>
            <Box>
              <Row className="d-flex justify-content-center">
                <Col md={4} sm={4} xs={12}>
                  <TextField
                    type="text"
                    label="First Name"
                    variant="filled"
                    id="fname"
                    name="fname"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{
                      sx: {
                        fontSize: "0.75rem",
                        "&.MuiInputLabel-shrink": {
                          marginTop: "1rem",
                          paddingLeft: "0.25rem",
                          fontSize: "0.95rem",
                          transform: "translate(14px, -6px) scale(0.75)",
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontWeight: "550",
                        fontFamily: "inherit",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        paddingLeft: "0.3rem",
                        "&:hover": {
                          border: "1px solid rgba(0, 0, 0, 0.87)",
                        },
                        "&.Mui-focused": {
                          border: "2px solid rgb(33, 150, 243)",
                        },
                      },
                    }}
                    sx={{
                      mb: 2,
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  />
                </Col>
                <Col md={4} sm={4} xs={12}>
                  <TextField
                    type="text"
                    label="Last Name"
                    variant="filled"
                    id="lname"
                    name="lname"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{
                      sx: {
                        fontSize: "0.75rem",
                        "&.MuiInputLabel-shrink": {
                          marginTop: "1rem",
                          paddingLeft: "0.25rem",
                          fontSize: "0.95rem",
                          transform: "translate(14px, -6px) scale(0.75)",
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontWeight: "550",
                        fontFamily: "inherit",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        paddingLeft: "0.3rem",
                        "&:hover": {
                          border: "1px solid rgba(0, 0, 0, 0.87)",
                        },
                        "&.Mui-focused": {
                          border: "2px solid rgb(33, 150, 243)",
                        },
                      },
                    }}
                    sx={{
                      mb: 2,
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  />
                </Col>
              </Row>

              <Row className="d-flex justify-content-center">
                <Col md={4} sm={4} xs={12}>
                  <TextField
                    type="email"
                    label="Email Address"
                    variant="filled"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputLabelProps={{
                      sx: {
                        fontSize: "0.75rem",
                        "&.MuiInputLabel-shrink": {
                          marginTop: "1rem",
                          paddingLeft: "0.25rem",
                          fontSize: "0.95rem",
                          transform: "translate(14px, -6px) scale(0.75)",
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontWeight: "550",
                        fontFamily: "inherit",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        paddingLeft: "0.3rem",
                        "&:hover": {
                          border: "1px solid rgba(0, 0, 0, 0.87)",
                        },
                        "&.Mui-focused": {
                          border: "2px solid rgb(33, 150, 243)",
                        },
                      },
                    }}
                    sx={{
                      mb: 2,
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  />
                </Col>
                <Col md={4} sm={4} xs={12}>
                  <TextField
                    select
                    label="Gender"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{
                      sx: {
                        fontSize: "0.75rem",
                        "&.MuiInputLabel-shrink": {
                          marginTop: "1rem",
                          paddingLeft: "0.25rem",
                          fontSize: "0.95rem",
                          transform: "translate(14px, -15px) scale(0.75)",
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontWeight: "550",
                        fontFamily: "inherit",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        paddingLeft: "0.3rem",
                        "&:hover": {
                          border: "1px solid rgba(0, 0, 0, 0.87)",
                        },
                        "&.Mui-focused": {
                          // border: "2px solid rgb(33, 150, 243)",
                        },
                      },
                    }}
                    sx={{
                      mb: 2,
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Col>
              </Row>

              <Row className="d-flex justify-content-center">
                <Col md={4} sm={4} xs={12}>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="filled"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputLabelProps={{
                      sx: {
                        fontSize: "0.75rem",
                        "&.MuiInputLabel-shrink": {
                          marginTop: "1rem",
                          paddingLeft: "0.25rem",
                          fontSize: "0.95rem",
                          transform: "translate(14px, -6px) scale(0.75)",
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        fontWeight: "550",
                        fontFamily: "inherit",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        paddingLeft: "0.3rem",
                        "&:hover": {
                          border: "1px solid rgba(0, 0, 0, 0.87)",
                        },
                        "&.Mui-focused": {
                          border: "2px solid rgb(33, 150, 243)",
                        },
                      },
                    }}
                    sx={{
                      mb: 2,
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  />
                </Col>
                <Col md={4} sm={4} xs={12}>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    variant="filled"
                    id="password1"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    InputLabelProps={{
                      sx: {
                        fontSize: "0.75rem",
                        "&.MuiInputLabel-shrink": {
                          marginTop: "1rem",
                          paddingLeft: "0.25rem",
                          fontSize: "0.95rem",
                          transform: "translate(14px, -6px) scale(0.75)",
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        fontWeight: "550",
                        fontFamily: "inherit",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        paddingLeft: "0.3rem",
                        "&:hover": {
                          border: "1px solid rgba(0, 0, 0, 0.87)",
                        },
                        "&.Mui-focused": {
                          border: "2px solid rgb(33, 150, 243)",
                        },
                      },
                    }}
                    sx={{
                      mb: 2,
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  />
                </Col>
              </Row>
            </Box>
          </Box>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              type="submit"
              className="signupButton"
              variant="filled"
              sx={{
                backgroundColor: "#673Ac7",
                width: "65%",
                color: "white",
                fontWeight: "bold",
                p: 1,
                mb: 2,
                "@media (max-width:500px)": { width: "90%", mx: 2 },
              }}
            >
              Sign Up
            </Button>
          </div>

          <Divider
            sx={{
              mb: 2,
              borderBottom: "1px solid",
              width: "70%",
              mx: "auto",
            }}
          />
          <Typography
            className="d-flex justify-content-center align-items-center text-decoration-none"
            sx={{
              color: "#121226",
              fontWeight: "bold",
              "@media (max-width:430px)": { fontSize: "smaller" },
            }}
            // as={Link}
            to="/"
          >
            Already have an account?
          </Typography>
        </form>
      </Card>
    </div>
  );
};
export default Register;

const ProfileImages = [
  {
    link: "https://img.freepik.com/free-photo/3d-rendering-boy-wearing-cap-with-letter-r_1142-40523.jpg?ga=GA1.1.1384733336.1733983682&semt=ais_hybrid",
    id: 1,
  },
  {
    link: "https://img.freepik.com/free-photo/3d-illustration-business-man-with-glasses-grey-background-clipping-path_1142-58140.jpg?t=st=1738217918~exp=1738221518~hmac=71c7f150c4bc67af8c2c065c100f87dcfedf7f0dac3d755a0700e7f709b34159&w=740",
    id: 2,
  },
  {
    link: "https://img.freepik.com/free-photo/3d-illustration-cute-little-girl-with-green-jacket_1142-42111.jpg?ga=GA1.1.1384733336.1733983682",
    id: 3,
  },
  {
    link: "https://img.freepik.com/free-photo/medium-shot-little-girl-indoors_23-2151061744.jpg?ga=GA1.1.1384733336.1733983682",
    id: 4,
  },
  {
    link: "https://static.qobuz.com/images/covers/ua/a8/fy53g3rnha8ua_600.jpg",
    id: 5,
  },
];
