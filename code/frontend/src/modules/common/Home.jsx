// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Navbar from 'react-bootstrap/Navbar';
// import { Container, Nav, Button } from 'react-bootstrap';
// import Carousel from 'react-bootstrap/Carousel';
// import p1 from '../../images/p1.jpg'
// import p2 from '../../images/p2.jpg'
// import p3 from '../../images/p3.jpg'
// import p4 from '../../images/p4.jpg'
// import AllPropertiesCards from '../user/AllPropertiesCards';

// const Home = () => {
//    const [index, setIndex] = useState(0);

//    const handleSelect = (selectedIndex) => {
//       setIndex(selectedIndex);
//    };
//    return (
//       <>
//          <Navbar expand="lg" className="bg-body-tertiary">
//             <Container fluid>
//                <Navbar.Brand><h2>RentEase</h2></Navbar.Brand>
//                <Navbar.Toggle aria-controls="navbarScroll" />
//                <Navbar.Collapse id="navbarScroll">
//                   <Nav
//                      className="me-auto my-2 my-lg-0"
//                      style={{ maxHeight: '100px' }}
//                      navbarScroll
//                   >
//                   </Nav>
//                   <Nav>
//                      <Link to={'/'}>Home</Link>
//                      <Link to={'/login'}>Login</Link>
//                      <Link to={'/register'}>Register</Link>
//                   </Nav>

//                </Navbar.Collapse>
//             </Container>
//          </Navbar>


//          <div className='home-body'>
//             <Carousel activeIndex={index} onSelect={handleSelect}>
//                <Carousel.Item>
//                   <img
//                      src={p1}
//                      alt="First slide"
//                   />
//                </Carousel.Item>
//                <Carousel.Item>
//                   <img
//                      src={p2}
//                      alt="Second slide"
//                   />
//                </Carousel.Item>
//                <Carousel.Item>
//                   <img
//                      src={p3}
//                      alt="Third slide"
//                   />
//                </Carousel.Item>
//                <Carousel.Item>
//                   <img
//                      src={p4}
//                      alt="Fourth slide"
//                   />
//                </Carousel.Item>
//             </Carousel>
//          </div>


//          <div className='property-content'>
//             <div className='text-center'>
//                <h1 className='m-1 p-5'>All Properties that may you look for</h1>
//                <p style={{fontSize: 15, fontWeight: 800}}>Want to post your Property? <Link to={'/register'}><Button variant='outline-info'>Register as Owner</Button></Link></p>
//             </div>

//             <Container>
//                <AllPropertiesCards />
//             </Container>
//          </div>
//       </>
//    )
// }

// export default Home

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import AllPropertiesCards from '../user/AllPropertiesCards';

import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.jpg';
import p3 from '../../images/p3.jpg';
import p4 from '../../images/p4.jpg';

const Home = () => {
   const [index, setIndex] = useState(0);

   const navLinkStyle = {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      color: '#fff',
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'all 0.3s ease-in-out'
   };

   const handleSelect = (selectedIndex) => setIndex(selectedIndex);

   return (
      <>
         {/* Navbar */}
         <Navbar
            expand="lg"
            className="sticky-top shadow-sm"
            style={{
               background: 'linear-gradient(to right, #87CEFA, #00BFFF)',
               height: '80px',
               zIndex: 1000
            }}
         >
            <Container>
               <Navbar.Brand
                  as={Link}
                  to="/"
                  style={{
                     fontFamily: 'Montserrat',
                     fontWeight: '700',
                     fontSize: '28px',
                     color: '#fff',
                     textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                     transition: 'all 0.3s ease-in-out'
                  }}
                  onMouseOver={(e) =>
                     (e.currentTarget.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.6)')
                  }
                  onMouseOut={(e) =>
                     (e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)')
                  }
               >
                  RentEase
               </Navbar.Brand>

               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="ms-auto d-flex align-items-center gap-3">
                     <Link to="/" style={navLinkStyle}>
                        Home
                     </Link>
                     <Link to="/login" style={navLinkStyle}>
                        Login
                     </Link>
                     <Link to="/register" style={navLinkStyle}>
                        Register
                     </Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* Hero Carousel */}
         <div style={{ height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
            <Carousel activeIndex={index} onSelect={handleSelect} fade controls indicators>
               {[p1, p2, p3, p4].map((img, i) => (
                  <Carousel.Item key={i}>
                     <img
                        src={img}
                        alt={`Slide ${i + 1}`}
                        className="d-block w-100"
                        style={{ height: '100vh', objectFit: 'cover' }}
                     />
                     <Carousel.Caption
                        style={{
                           top: '50%',
                           transform: 'translateY(-50%)',
                           bottom: 'auto',
                           color: '#fff',
                           textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
                        }}
                     >
                        <h1 className="display-4 fw-bold">Find Your Perfect Rental</h1>
                        <p className="lead mb-4">Explore, Compare & Connect — All in One Place</p>
                        <Link to="/register">
                           <Button
                              className="px-4 py-2 fs-6 fw-semibold rounded-pill"
                              style={{
                                 background: 'linear-gradient(to right, #87CEFA, #00BFFF)',
                                 border: 'none',
                                 color: '#fff',
                                 transition: 'all 0.3s ease-in-out'
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                           >
                              Get Started
                           </Button>
                        </Link>
                     </Carousel.Caption>
                  </Carousel.Item>
               ))}
            </Carousel>
         </div>

         {/* Property Section */}
         <section className="bg-light py-5">
            <Container>
               <div className="text-center mb-5">
                  <h2
                     className="fw-bold mb-3"
                     style={{
                        fontSize: '42px',
                        color: '#00BFFF',
                        fontFamily: 'Montserrat',
                        fontWeight: '700'
                     }}
                  >
                     Explore Our Latest Properties
                  </h2>

                  <p className="text-muted">
                     Want to list your property?{' '}
                     <Link to="/register">
                        <Button
                           className="ms-2 rounded-pill px-4 py-2"
                           style={{
                              background: 'linear-gradient(to right, #87CEFA, #00BFFF)',
                              border: 'none',
                              color: '#fff',
                              fontWeight: '600',
                              transition: 'all 0.3s ease-in-out'
                           }}
                           onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                           onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                           Register as Owner
                        </Button>
                     </Link>
                  </p>
               </div>

               {/* Styled Filter Section */}
               {/* <div className="d-flex flex-column align-items-center mb-5"> */}
                  {/* <div className="text-center mb-3">
                     <label
                        className="d-block mb-2 fw-semibold"
                        style={{
                           fontFamily: 'Open Sans',
                           fontSize: '18px',
                           color: '#333'
                        }}
                     >
                        Filter By:
                     </label>
                     <input
                        type="text"
                        placeholder="🔍 Address"
                        className="form-control text-center"
                        style={{
                           width: '280px',
                           borderRadius: '10px',
                           border: '1px solid #00BFFF',
                           padding: '10px',
                           fontFamily: 'Open Sans',
                           fontSize: '16px',
                           background: 'linear-gradient(to right, #87CEFA, #00BFFF)',
                           color: '#fff',
                           fontWeight: 500,
                           boxShadow: '0 2px 8px rgba(0, 191, 255, 0.2)'
                        }}
                     />
                  </div> */}

                  {/* <div className="d-flex flex-wrap justify-content-center gap-3"> */}
                     {/* Ad Types Dropdown */}
                     {/* <select
                        className="form-select text-center"
                        style={{
                           width: '220px',
                           borderRadius: '10px',
                           border: 'none',
                           fontFamily: 'Open Sans',
                           fontSize: '16px',
                           fontWeight: 600,
                           color: '#fff',
                           background: 'linear-gradient(to right, #87CEFA, #00BFFF)',
                           boxShadow: '0 4px 10px rgba(0, 191, 255, 0.2)',
                           padding: '10px 15px',
                           appearance: 'none',
                           WebkitAppearance: 'none',
                           MozAppearance: 'none'
                        }}
                     >
                        <option value="">All Ad Types</option>
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                     </select> */}

                     {/* Property Types Dropdown */}
                     {/* <select
                        className="form-select text-center"
                        style={{
                           width: '220px',
                           borderRadius: '10px',
                           border: 'none',
                           fontFamily: 'Open Sans',
                           fontSize: '16px',
                           fontWeight: 600,
                           color: '#fff',
                           background: 'linear-gradient(to right, #87CEFA, #00BFFF)',
                           boxShadow: '0 4px 10px rgba(0, 191, 255, 0.2)',
                           padding: '10px 15px',
                           appearance: 'none',
                           WebkitAppearance: 'none',
                           MozAppearance: 'none'
                        }}
                     >
                        <option value="">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="studio">Studio</option>
                     </select> */}
                  {/* </div> */}
               {/* </div> */}

               {/* Property Cards */}
               <AllPropertiesCards />
            </Container>
         </section>
      </>
   );
};

export default Home;
