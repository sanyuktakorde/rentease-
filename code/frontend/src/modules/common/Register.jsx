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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { message } from 'antd';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.name || !data?.email || !data?.password || !data?.type) return alert("Please fill all fields");
    else {
      axios.post('http://localhost:8001/api/user/register', data)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            navigate('/login');
          } else {
            message.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Error", error);
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
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Renter Full Name/Owner Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              autoComplete="current-password"
            />

            <InputLabel id="user-type-label" sx={{ mt: 2 }}>User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="demo-simple-select"
              name='type'
              value={data.type}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 1 }}
            >
              <MenuItem value={'Select User'} disabled>Select User</MenuItem>
              <MenuItem value={'Renter'}>Renter</MenuItem>
              <MenuItem value={"Owner"}>Owner</MenuItem>
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#00BFFF',
                '&:hover': {
                  backgroundColor: '#0099CC',
                }
              }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                Already have an account?
                <Link to={'/login'} style={{ color: '#00BFFF', marginLeft: '5px' }}>
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;

