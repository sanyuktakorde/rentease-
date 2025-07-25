import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { message } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    } else {
      axios.post('http://localhost:8001/api/user/login', data)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));

            switch (isLoggedIn.type) {
              case "Admin":
                navigate("/adminhome");
                break;
              case "Renter":
                navigate("/renterhome");
                break;
              case "Owner":
                if (isLoggedIn.granted === 'ungranted') {
                  message.error('Your account is not yet confirmed by the admin');
                } else {
                  navigate("/ownerhome");
                }
                break;
              default:
                navigate("/login");
                break;
            }
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
          }
          navigate("/login");
        });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar expand="lg" style={{ backgroundColor: '#87CEFA' }}>
        <Container fluid>
          <Navbar.Brand style={{ fontWeight: 'bold', color: '#fff' }}>
            <h2>RentEase</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link to={'/'} style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>Home</Link>
              <Link to={'/login'} style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>Login</Link>
              <Link to={'/register'} style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* FORM CONTAINER */}
      <Container component="main" maxWidth="xs" style={{ backgroundColor: '#f0faff', borderRadius: '12px', padding: '2rem', marginTop: '3rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ bgcolor: '#00BFFF' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#00BFFF', fontWeight: 'bold', marginTop: 1 }}>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#00BFFF',
                '&:hover': {
                  backgroundColor: '#0099cc'
                }
              }}
            >
              Sign In
            </Button>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                Forgot password?
                <Link to={'/forgotpassword'} style={{ color: '#00BFFF', marginLeft: '5px' }}>
                  Click here
                </Link>
              </Grid>
              <Grid item xs={12}>
                Don't have an account?
                <Link to={'/register'} style={{ color: '#00BFFF', marginLeft: '5px' }}>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
