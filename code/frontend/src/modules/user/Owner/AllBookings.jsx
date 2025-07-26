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
// import { Button } from 'react-bootstrap';

// const AllProperty = () => {
//    const [allBookings, setAllBookings] = useState([]);

//    const getAllProperty = async () => {
//       try {
//          const response = await axios.get('http://localhost:8001/api/owner/getallbookings', {
//             headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
//          });
//          if (response.data.success) {
//             setAllBookings(response.data.data);
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

//    const handleStatus = async (bookingId, propertyId, status) => {
//       try {
//          const res = await axios.post('http://localhost:8001/api/owner/handlebookingstatus', { bookingId, propertyId, status }, {
//             headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
//          })
//          if (res.data.success) {
//             message.success(res.data.message)
//             getAllProperty()
//          }
//          else {
//             message.error('Something went wrong')
//          }
//       } catch (error) {
//          console.log(error);
//       }
//    }

//    return (
//       <div>
//          <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                <TableHead>
//                   <TableRow>
//                      <TableCell>Booking ID</TableCell>
//                      <TableCell align="center">Property ID</TableCell>
//                      <TableCell align="center">Tenent Name</TableCell>
//                      <TableCell align="center">Tenent Phone</TableCell>
//                      <TableCell align="center">Booking Status</TableCell>
//                      <TableCell align="center">Actions</TableCell>
//                   </TableRow>
//                </TableHead>
//                <TableBody>
//                   {allBookings.map((booking) => (
//                      <TableRow
//                         key={booking._id}
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                      >
//                         <TableCell component="th" scope="row">
//                            {booking._id}
//                         </TableCell>
//                         <TableCell align="center">{booking.propertyId}</TableCell>
//                         <TableCell align="center">{booking.userName}</TableCell>
//                         <TableCell align="center">{booking.phone}</TableCell>
//                         <TableCell align="center">{booking.bookingStatus}</TableCell>
//                         <TableCell align="center">
//                            {
//                               booking?.bookingStatus === "pending" ? <Button onClick={() => handleStatus(booking._id, booking.propertyId, 'booked')} variant='outline-success'>Change</Button> : <Button onClick={() => handleStatus(booking._id, booking.propertyId, 'pending')} variant='outline-danger'>Change</Button>
//                            }
//                         </TableCell>
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
import { Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AllProperty = () => {
  const [allBookings, setAllBookings] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/owner/getallbookings', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.data.success) {
        setAllBookings(response.data.data);
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

  const handleStatus = async (bookingId, propertyId, status) => {
    try {
      const res = await axios.post('http://localhost:8001/api/owner/handlebookingstatus', { bookingId, propertyId, status }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
      });
      if (res.data.success) {
        message.success(res.data.message);
        getAllProperty();
      } else {
        message.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0faff', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#00BFFF' }}>
        All Bookings
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="bookings table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#87CEFA' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Booking ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Property ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tenant Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tenant Phone</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBookings.map((booking) => (
              <TableRow
                key={booking._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#e6f7ff' }
                }}
              >
                <TableCell component="th" scope="row">{booking._id}</TableCell>
                <TableCell align="center">{booking.propertyId}</TableCell>
                <TableCell align="center">{booking.userName}</TableCell>
                <TableCell align="center">{booking.phone}</TableCell>
                <TableCell align="center">{booking.bookingStatus}</TableCell>
                <TableCell align="center">
                  {booking.bookingStatus === "pending" ? (
                    <Button
                      onClick={() => handleStatus(booking._id, booking.propertyId, 'booked')}
                      style={{
                        borderColor: '#00BFFF',
                        color: '#00BFFF',
                        fontWeight: 'bold'
                      }}
                      variant="outline-info"
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleStatus(booking._id, booking.propertyId, 'pending')}
                      style={{
                        borderColor: '#ff4d4f',
                        color: '#ff4d4f',
                        fontWeight: 'bold'
                      }}
                      variant="outline-danger"
                    >
                      Revert
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllProperty;
