// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Button, Card, Modal, Carousel, Col, Form, InputGroup, Row } from 'react-bootstrap';
// // import { Col, Form, Input, Row, message } from 'antd';
// import { Link } from 'react-router-dom';
// import { message } from 'antd';

// const AllPropertiesCards = ({ loggedIn }) => {
//    const [index, setIndex] = useState(0);
//    const [show, setShow] = useState(false);
//    const [allProperties, setAllProperties] = useState([]);
//    const [filterPropertyType, setPropertyType] = useState('');
//    const [filterPropertyAdType, setPropertyAdType] = useState('');
//    const [filterPropertyAddress, setPropertyAddress] = useState('');
//    const [propertyOpen, setPropertyOpen] = useState(null)
//    const [userDetails, setUserDetails] = useState({
//       fullName: '',
//       phone: 0,
//    })

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setUserDetails({ ...userDetails, [name]: value });
//    };

//    const handleClose = () => setShow(false);

//    const handleShow = (propertyId) => {
//       setPropertyOpen(propertyId)
//       setShow(true)
//    };

//    const getAllProperties = async () => {
//       try {
//          const res = await axios.get('http://localhost:8001/api/user/getAllProperties');
//          setAllProperties(res.data.data);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const handleBooking = async (status, propertyId, ownerId) => {
//       try {
//          await axios.post(`http://localhost:8001/api/user/bookinghandle/${propertyId}`, { userDetails, status, ownerId }, {
//             headers: {
//                Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//          })
//             .then((res) => {
//                if (res.data.success) {
//                   message.success(res.data.message)
//                   handleClose()
//                }
//                else {
//                   message.error(res.data.message)
//                }
//             })
//       } catch (error) {
//          console.log(error);
//       }
//    }


//    useEffect(() => {
//       getAllProperties();
//    }, []);



//    const handleSelect = (selectedIndex) => {
//       setIndex(selectedIndex);
//    };

//    const filteredProperties = allProperties
//       .filter((property) => filterPropertyAddress === '' || property.propertyAddress.includes(filterPropertyAddress))
//       .filter(
//          (property) =>
//             filterPropertyAdType === '' ||
//             property.propertyAdType.toLowerCase().includes(filterPropertyAdType.toLowerCase())
//       )
//       .filter(
//          (property) =>
//             filterPropertyType === '' ||
//             property.propertyType.toLowerCase().includes(filterPropertyType.toLowerCase())
//       );

//    return (
//       <>
//          <div className=" mt-4 filter-container text-center">
//             <p className="mt-3">Filter By: </p>
//             <input
//                type="text"
//                placeholder=": Address"
//                value={filterPropertyAddress}
//                onChange={(e) => setPropertyAddress(e.target.value)}
//             />
//             <select value={filterPropertyAdType} onChange={(e) => setPropertyAdType(e.target.value)}>
//                <option value="">All Ad Types</option>
//                <option value="sale">Sale</option>
//                <option value="rent">Rent</option>
//             </select>
//             <select value={filterPropertyType} onChange={(e) => setPropertyType(e.target.value)}>
//                <option value="">All Types</option>
//                <option value="commercial">Commercial</option>
//                <option value="land/plot">land/Plot</option>
//                <option value="residential">Residential</option>
//             </select>
//          </div>
//          <div className="d-flex column mt-5">
//             {filteredProperties && filteredProperties.length > 0 ? (
//                filteredProperties.map((property) => (
//                   <Card border="dark" key={property._id} style={{ width: '18rem', marginLeft: 10 }}>
//                      <Card.Body>
//                         <Card.Title><img src={`http://localhost:8001${property.propertyImage[0].path}`} alt='photos' /></Card.Title>
//                         <Card.Text>
//                            <p style={{ fontWeight: 600 }} className='my-1'>Location:</p> {property.propertyAddress} <br />
//                            <p style={{ fontWeight: 600 }} className='my-1'>Property Type:</p> {property.propertyType} <br />
//                            <p style={{ fontWeight: 600 }} className='my-1'>Ad Type:</p> {property.propertyAdType} <br />
//                            {!loggedIn ? (
//                               <>
//                               </>
//                            ) : (
//                               <>
//                                  <p style={{ fontWeight: 600 }} className='my-1'>Owner Contact:</p> {property.ownerContact} <br />
//                                  <p style={{ fontWeight: 600 }} className='my-1'>Availabilty:</p> {property.isAvailable} <br />
//                                  <p style={{ fontWeight: 600 }} className='my-1'>Property Amount:</p> Rs.{property.propertyAmt}<br />
//                               </>
//                            )}
//                         </Card.Text>
//                         {
//                            !loggedIn ? (<>
//                               <p style={{ fontSize: 12, color: 'orange', marginTop: 20 }}>For more details, click on get info</p>
//                               <Link to={'/login'}>
//                                  <Button style={{ float: 'left' }} variant="outline-dark">
//                                     Get Info
//                                  </Button>
//                               </Link></>
//                            ) : (
//                               <div>
//                                  {
//                                     property.isAvailable === "Available" ? <><p style={{ float: 'left', fontSize: 12, color: 'orange' }}>Get More Info of the Property</p>
//                                        <Button onClick={() => handleShow(property._id)} style={{ float: 'right' }} variant="outline-dark">
//                                           Get Info
//                                        </Button>
//                                        <Modal show={show && propertyOpen === property._id} onHide={handleClose}>
//                                           <Modal.Header closeButton>
//                                              <Modal.Title>Property Info</Modal.Title>
//                                           </Modal.Header>
//                                           <Modal.Body>
//                                              {property.propertyImage && property.propertyImage.length > 0 && (
//                                                 <Carousel activeIndex={index} onSelect={handleSelect}>
//                                                    {property.propertyImage.map((image, idx) => (
//                                                       <Carousel.Item key={idx}>
//                                                          <img
//                                                             src={`http://localhost:8001${image.path}`}
//                                                             alt={`Image ${idx + 1}`}
//                                                             className="d-block w-100"
//                                                          />
//                                                       </Carousel.Item>
//                                                    ))}
//                                                 </Carousel>
//                                              )}
//                                              <div>
//                                                 <div className="d-flex my-3">
//                                                    <div>
//                                                       <p className='my-1'><b>Owner Contact:</b> {property.ownerContact} </p>
//                                                       <p className='my-1'><b>Availabilty:</b> {property.isAvailable} </p>
//                                                       <p className='my-1'><b>Property Amount: </b>Rs.{property.propertyAmt}</p>
//                                                    </div>
//                                                    <div className="mx-4">
//                                                       <p className='my-1'><b>Location:</b> {property.propertyAddress} </p>
//                                                       <p className='my-1'><b>Property Type:</b> {property.propertyType} </p>
//                                                       <p className='my-1'><b>Ad Type: </b>{property.propertyAdType}</p>
//                                                    </div>
//                                                 </div>
//                                                 <p className='my-1'><b>Additional Info: </b>{property.additionalInfo}</p>
//                                              </div>
//                                              <hr />
//                                              <div>
//                                                 <span className='w-100'><h4><b>Your Details to confirm booking</b></h4></span>
//                                                 <Form onSubmit={(e) => {
//                                                    e.preventDefault();
//                                                    handleBooking('pending', property._id, property.ownerId)
//                                                 }}>
//                                                    <Row className="mb-3">
//                                                       <Form.Group as={Col} md="6">
//                                                          <Form.Label>Full Name</Form.Label>
//                                                          <InputGroup hasValidation>
//                                                             <Form.Control
//                                                                type="text"
//                                                                placeholder="Full Name"
//                                                                aria-describedby="inputGroupPrepend"
//                                                                required
//                                                                name='fullName'
//                                                                value={userDetails.fullName}
//                                                                onChange={handleChange}
//                                                             />
//                                                          </InputGroup>
//                                                       </Form.Group>
//                                                       <Form.Group as={Col} md="6">
//                                                          <Form.Label>Phone Number</Form.Label>
//                                                          <InputGroup hasValidation>
//                                                             <Form.Control
//                                                                type="number"
//                                                                placeholder="Phone Number"
//                                                                aria-describedby="inputGroupPrepend"
//                                                                required
//                                                                name='phone'
//                                                                value={userDetails.phone}
//                                                                onChange={handleChange}
//                                                             />
//                                                          </InputGroup>
//                                                       </Form.Group>
//                                                    </Row>
//                                                    <Button type='submit' variant="secondary">
//                                                       Book Property
//                                                    </Button>
//                                                 </Form>
//                                              </div>


//                                           </Modal.Body>
//                                        </Modal></> : <p>Not Available</p>
//                                  }
//                               </div>
//                            )
//                         }
//                      </Card.Body>
//                   </Card>
//                ))
//             ) : (
//                <p>No Properties available at the moment.</p>
//             )}
//          </div>
//       </>
//    );
// };

// export default AllPropertiesCards;



import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Carousel, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const AllPropertiesCards = ({ loggedIn }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [filterPropertyType, setPropertyType] = useState('');
  const [filterPropertyAdType, setPropertyAdType] = useState('');
  const [filterPropertyAddress, setPropertyAddress] = useState('');
  const [propertyOpen, setPropertyOpen] = useState(null);
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    phone: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleClose = () => setShow(false);
  const handleShow = (propertyId) => {
    setPropertyOpen(propertyId);
    setShow(true);
  };

  const getAllProperties = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/user/getAllProperties');
      setAllProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (status, propertyId, ownerId) => {
    try {
      const res = await axios.post(
        `http://localhost:8001/api/user/bookinghandle/${propertyId}`,
        { userDetails, status, ownerId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const filteredProperties = allProperties
    .filter((p) => filterPropertyAddress === '' || p.propertyAddress.includes(filterPropertyAddress))
    .filter((p) => filterPropertyAdType === '' || p.propertyAdType.toLowerCase().includes(filterPropertyAdType.toLowerCase()))
    .filter((p) => filterPropertyType === '' || p.propertyType.toLowerCase().includes(filterPropertyType.toLowerCase()));

  return (
    <>
      <div className="filter-container text-center p-3 rounded" style={{ background: '#87CEFA', color: '#003f5c' }}>
        <p style={{ fontWeight: 600 }}>Filter By:</p>
        <input
          type="text"
          placeholder="Address"
          value={filterPropertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
          style={{ margin: '5px', padding: '5px', borderRadius: '5px' }}
        />
        <select value={filterPropertyAdType} onChange={(e) => setPropertyAdType(e.target.value)} style={{ margin: '5px', padding: '5px' }}>
          <option value="">All Ad Types</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select value={filterPropertyType} onChange={(e) => setPropertyType(e.target.value)} style={{ margin: '5px', padding: '5px' }}>
          <option value="">All Types</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
          <option value="residential">Residential</option>
        </select>
      </div>

      <div className="d-flex flex-wrap justify-content-center mt-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Card
              key={property._id}
              style={{
                width: '20rem',
                margin: '10px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 191, 255, 0.3)'
              }}
            >
              <Card.Img variant="top" src={`http://localhost:8001${property.propertyImage[0].path}`} style={{ height: '180px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold', color: '#00BFFF' }}>
                  {property.propertyAddress}
                </Card.Title>
                <Card.Text>
                  <b>Type:</b> {property.propertyType} <br />
                  <b>Ad Type:</b> {property.propertyAdType} <br />
                  {loggedIn && (
                    <>
                      <b>Owner Contact:</b> {property.ownerContact} <br />
                      <b>Availability:</b> {property.isAvailable} <br />
                      <b>Amount:</b> Rs.{property.propertyAmt}
                    </>
                  )}
                </Card.Text>

                {!loggedIn ? (
                  <>
                    <p style={{ fontSize: 12, color: 'orange' }}>Login to get full details</p>
                    <Link to="/login">
                      <Button variant="outline-primary" style={{ width: '100%' }}>
                        Get Info
                      </Button>
                    </Link>
                  </>
                ) : (
                  property.isAvailable === "Available" ? (
                    <>
                      <Button variant="info" onClick={() => handleShow(property._id)} style={{ width: '100%', color: 'white', backgroundColor: '#00BFFF', border: 'none' }}>
                        Get Info
                      </Button>

                      <Modal show={show && propertyOpen === property._id} onHide={handleClose} size="lg" centered>
                        <Modal.Header closeButton>
                          <Modal.Title style={{ color: '#00BFFF' }}>Property Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {property.propertyImage && property.propertyImage.length > 0 && (
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                              {property.propertyImage.map((image, idx) => (
                                <Carousel.Item key={idx}>
                                  <img
                                    src={`http://localhost:8001${image.path}`}
                                    alt={`Image ${idx + 1}`}
                                    className="d-block w-100"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                  />
                                </Carousel.Item>
                              ))}
                            </Carousel>
                          )}
                          <div className="mt-3">
                            <Row>
                              <Col md={6}>
                                <p><b>Owner Contact:</b> {property.ownerContact}</p>
                                <p><b>Availability:</b> {property.isAvailable}</p>
                                <p><b>Amount:</b> Rs.{property.propertyAmt}</p>
                              </Col>
                              <Col md={6}>
                                <p><b>Location:</b> {property.propertyAddress}</p>
                                <p><b>Type:</b> {property.propertyType}</p>
                                <p><b>Ad Type:</b> {property.propertyAdType}</p>
                              </Col>
                            </Row>
                            <p><b>Additional Info:</b> {property.additionalInfo}</p>
                          </div>

                          <hr />
                          <Form onSubmit={(e) => {
                            e.preventDefault();
                            handleBooking('pending', property._id, property.ownerId);
                          }}>
                            <h5 className="mb-3">Enter your details to book:</h5>
                            <Row>
                              <Col md={6}>
                                <Form.Group controlId="formFullName">
                                  <Form.Label>Full Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Your Full Name"
                                    name="fullName"
                                    value={userDetails.fullName}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formPhone">
                                  <Form.Label>Phone</Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={userDetails.phone}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button type="submit" className="mt-3" style={{ backgroundColor: '#00BFFF', border: 'none' }}>
                              Book Property
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </>
                  ) : (
                    <p className="text-danger">Not Available</p>
                  )
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No Properties available at the moment.</p>
        )}
      </div>
    </>
  );
};

export default AllPropertiesCards;
