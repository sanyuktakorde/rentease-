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
//          const response = await axios.get('http://localhost:8001/api/admin/getallproperties', {
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
//                      <TableCell>Property ID</TableCell>
//                      <TableCell align="center">Owner ID</TableCell>
//                      <TableCell align="center">Property Type</TableCell>
//                      <TableCell align="center">Property Ad Type</TableCell>
//                      <TableCell align="center">Property Address</TableCell>
//                      <TableCell align="center">Owner Contact</TableCell>
//                      <TableCell align="center">Property Amt</TableCell>
//                   </TableRow>
//                </TableHead>
//                <TableBody>
//                   {allProperties.map((property) => (
//                      <TableRow
//                         key={property._id}
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                      >
//                         <TableCell component="th" scope="row">
//                            {property._id}
//                         </TableCell>
//                         <TableCell align="center">{property.ownerId}</TableCell>
//                         <TableCell align="center">{property.propertyType}</TableCell>
//                         <TableCell align="center">{property.propertyType}</TableCell>
//                         <TableCell align="center">{property.propertyAddress}</TableCell>
//                         <TableCell align="center">{property.ownerContact}</TableCell>
//                         <TableCell align="center">{property.propertyAmt}</TableCell>
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
      const response = await axios.get('http://localhost:8001/api/admin/getallproperties', {
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
    <Box sx={{ padding: 4, backgroundColor: '#f0faff', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#00BFFF' }}>
        All Property Listings
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="property table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#87CEFA' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Property ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Owner ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Property Type</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ad Type</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Owner Contact</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProperties.map((property) => (
              <TableRow
                key={property._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#e6f7ff' }
                }}
              >
                <TableCell component="th" scope="row">{property._id}</TableCell>
                <TableCell align="center">{property.ownerId}</TableCell>
                <TableCell align="center">{property.propertyType}</TableCell>
                <TableCell align="center">{property.propertyType}</TableCell>
                <TableCell align="center">{property.propertyAddress}</TableCell>
                <TableCell align="center">{property.ownerContact}</TableCell>
                <TableCell align="center">{property.propertyAmt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllProperty;
