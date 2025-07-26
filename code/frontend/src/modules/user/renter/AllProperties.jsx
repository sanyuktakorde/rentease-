// import { message } from 'antd';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const AllProperty = () => {
//    const [allProperties, setAllProperties] = useState([]);

//    const getAllProperty = async () => {
//       try {
//          const response = await axios.get(`http://localhost:8001/api/user/getallbookings`, {
//             headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
//          });

//          if (response.data.success) {
//             setAllProperties(response.data.data);
//          } else {
//             message.error(response.data.message);
//          }
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    useEffect(() => {
//       getAllProperty();
//    }, []);

//    return (
//       <div>
//          <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                <TableHead>
//                   <TableRow>
//                      <TableCell>Booking ID</TableCell>
//                      <TableCell>Property ID</TableCell>
//                      <TableCell align="center">Tenent Name</TableCell>
//                      <TableCell align="center">Phone</TableCell>
//                      <TableCell align="center">Booking Status</TableCell>
//                   </TableRow>
//                </TableHead>
//                <TableBody>
//                   {allProperties.map((booking) => (
//                      <TableRow
//                         key={booking._id}
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                      >
//                         <TableCell component="th" scope="row">
//                            {booking._id}
//                         </TableCell>
//                         <TableCell component="th" scope="row">{booking.propertyId}</TableCell>
//                         <TableCell align="center">{booking.userName}</TableCell>
//                         <TableCell align="center">{booking.phone}</TableCell>
//                         <TableCell align="center">{booking.bookingStatus}</TableCell>
//                      </TableRow>
//                   ))}
//                </TableBody>
//             </Table>
//          </TableContainer>
//       </div>
//    );
// };

// export default AllProperty;

import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/api/user/getallbookings`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
      });

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <Box sx={{
      padding: '30px',
      background: 'linear-gradient(to bottom right, #00BFFF, #87CEFA)',
      minHeight: '100vh',
      borderRadius: 3
    }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'white',
          mb: 4,
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        All Bookings
      </Typography>

      <TableContainer component={Paper} sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#00BFFF' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Booking ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Property ID</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Tenant Name</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Booking Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProperties.map((booking, index) => (
              <TableRow
                key={booking._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f0faff' : '#e1f5ff',
                  '&:hover': { backgroundColor: '#d0f0ff' }
                }}
              >
                <TableCell>{booking._id}</TableCell>
                <TableCell>{booking.propertyId}</TableCell>
                <TableCell align="center">{booking.userName}</TableCell>
                <TableCell align="center">{booking.phone}</TableCell>
                <TableCell align="center">{booking.bookingStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllProperty;


