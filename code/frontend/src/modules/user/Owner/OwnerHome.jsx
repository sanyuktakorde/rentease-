// import React, { useState, useContext } from 'react'
// import { Link } from 'react-router-dom';
// import Navbar from 'react-bootstrap/Navbar';
// import { Container, Nav } from 'react-bootstrap';
// import { UserContext } from '../../../App';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import AddProperty from './AddProperty';
// import AllProperties from './AllProperties';
// import AllBookings from './AllBookings';

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }
// const OwnerHome = () => {
//   const user = useContext(UserContext)
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   if (!user) {
//     return null
//   }

//   const handleLogOut = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//   }

//   return (
//     <div>
//       <Navbar expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand><h2>RentEase</h2></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="me-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             >
//             </Nav>
//             <Nav>
//               <h5 className='mx-3'>Hi {user.userData.name}</h5>
//               <Link onClick={handleLogOut} to={'/'}>Log Out</Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Box sx={{ width: '100%' }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//             <Tab label="Add Property" {...a11yProps(0)} />
//             <Tab label="All Properties"
//               {...a11yProps(1)} />
//             <Tab label="All Bookings" {...a11yProps(2)} />
//           </Tabs>
//         </Box>
//         <CustomTabPanel value={value} index={0}>
//           <AddProperty />
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <AllProperties />
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={2}>
//           <AllBookings />
//         </CustomTabPanel>
//       </Box>
//     </div>
//   )
// }

// export default OwnerHome


import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddProperty from './AddProperty';
import AllProperties from './AllProperties';
import AllBookings from './AllBookings';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const OwnerHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!user) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #00BFFF, #87CEFA)',
      color: '#fff',
    }}>
      <Navbar expand="lg" style={{ backgroundColor: '#00BFFF' }} variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <h2 style={{ margin: 0, color: '#fff' }}>RentEase</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll />
            <Nav className="d-flex align-items-center">
              <h5 className='mx-3' style={{ margin: 0 }}>Hi {user.userData.name}</h5>
              <Link
                to="/"
                onClick={handleLogOut}
                style={{
                  color: '#fff',
                  backgroundColor: '#00BFFF',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  border: '1px solid white'
                }}
              >
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Box sx={{
        width: '90%',
        margin: '20px auto',
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: 3,
        p: 2,
        color: 'black'
      }}>
        <Box sx={{ borderBottom: 1, borderColor: '#87CEFA' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Owner Home Tabs"
            textColor="primary"
            indicatorColor="primary"
            TabIndicatorProps={{
              style: { backgroundColor: '#00BFFF' }
            }}
            sx={{
              '& button': {
                fontWeight: 'bold',
                color: '#00BFFF'
              },
              '& button.Mui-selected': {
                color: '#00BFFF'
              }
            }}
          >
            <Tab label="Add Property" {...a11yProps(0)} />
            <Tab label="All Properties" {...a11yProps(1)} />
            <Tab label="All Bookings" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <AddProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperties />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default OwnerHome;

