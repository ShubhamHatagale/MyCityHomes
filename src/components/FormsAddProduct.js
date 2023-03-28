
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Image, Row, Card, Form, Button, InputGroup, Dropdown, Table } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { useEffect } from "react";
export const GeneralInfoForm = () => {

  const [vendor, setvendor] = useState('')
  const [drop, setdrop] = useState('')
  const [name, setName] = useState('')
  const [marketPrice, setmarketPrice] = useState('')
  const [min_qty, setmin_qty] = useState('')
  const [ourPrice, setourPrice] = useState('')
  const [percent, setpercent] = useState('')
  const [shortDescc, setshortDescc] = useState('')
  const [varbasePrice, setvarbasePrice] = useState('')
  const [varMarketPrice, setvarmarketPrice] = useState('')
  const [varName, setvarName] = useState('')
  const [varourPrice, setvarourPrice] = useState('')
  const [longDescc, setlongDescc] = useState('')
  const [basePrice, setbasePrice] = useState('')
  const [allowance, setallowance] = useState('')
  const [fixed, setfixed] = useState('')


  const [unit, setunit] = useState('')
  const [brand, setbrand] = useState('')
  const [subCatId, setsubCatId] = useState('')
  const [primeCatId, setprimeCatId] = useState('')
  const [image, setImage] = useState([])
  const [img1, setimg1] = useState([])
  const [img2, setimg2] = useState([])
  const [img3, setimg3] = useState([])
  const [img4, setimg4] = useState([])
  const [img5, setimg5] = useState([])

  const [showon, setShowon] = useState(false)
  const [unitdata, setunitData] = useState([])
  const [brandIddata, setbrandData] = useState([])
  const [subCatIddata, setsubCatIdData] = useState([])
  const [data, setData] = useState([])
  const [demo, setDemo] = useState(false)

  const selectMainImage = (event) => {
    setImage(event.target.files[0])
    console.log(event.target.files[0])
  }

  const selectImage = (event) => {
    // console.log(e.target.files[0])
    setimg1(event.target.files[0])
    setimg2(event.target.files[1])
    setimg3(event.target.files[2])
    setimg4(event.target.files[3])
    setimg5(event.target.files[4])

    //  console.log(e.target.files[0].name)
    //  console.log(e.target.files[1].name)
    //  console.log(e.target.files[2].name)
    //  console.log(e.target.files[3].name)
    //  console.log(e.target.files[4].name)
  }

  // dropdowns------->fetch
  const getPrimeCatData = () => {
    Axios.get("http://localhost:3002/addPrimeCategory/get").then((response) => {
      // console.log(response.data)
      setprimeCatId(response.data[0].id)
      alert(response.data[0].id)
      console.log(response.data[0].id)
      setData(response.data)

    });
  }

  const getSubCatData = () => {
    Axios.get("http://localhost:3002/addSubCategory/get").then((response) => {
      // console.log(response.data)
      setsubCatId(response.data[0].id)
      console.log(response.data[0])
      setsubCatIdData(response.data)
    });
  }

  const getBrandData = () => {
    Axios.get("http://localhost:3002/addBrand/get").then((response) => {
      // console.log(response.data)
      setbrand(response.data[0].id)
      console.log(response.data[0])
      setbrandData(response.data)

    });
  }

  const getUnitData = () => {
    Axios.get("http://localhost:3002/addunit/get").then((response) => {
      // console.log(response.data)
      setunit(response.data[0].id)
      console.log(response.data[0])
      setunitData(response.data)
    });
  }
  // dropdowns------->fetch end

  useEffect(() => {
    getUnitData()
    getBrandData()
    getSubCatData()
    getPrimeCatData()
    // alert(drop)
    // console.log(drop)
  }, [])

  const Register = (event) => {

    let formData = new FormData();
    formData.append("avatar", image);
    // formData.append("avatar", img1);
    // formData.append("avatar", img2);
    // formData.append("avatar", img3);
    // formData.append("avatar", img4);
    // formData.append("avatar", img5);

    // fetch("http://localhost:3002/addProducts", {
    //   method: "post",
    //   body: formData,
      
    //   primeCatId: primeCatId,
    //   subCatId: subCatId,
    //   brand: brand,
    //   vendor: vendor,
    //   name: name,
    //   shortDescc: shortDescc,
    //   longDescc: longDescc,
    //   min_qty: min_qty,
    //   basePrice: basePrice,
    //   marketPrice: marketPrice,
    //   ourPrice: ourPrice,
    //   unit: unit,
    //   fixed: fixed,
    //   percent: percent,
    //   allowance: allowance,
    //   varName: varName,
    //   varbasePrice: varbasePrice,
    //   varMarketPrice: varMarketPrice,
    //   varourPrice: varourPrice,

    // })
    //   .then((res) => res.text())
    //   .then((resBody) => {
    //     console.log(resBody)
    //   })

    Axios.post("http://localhost:3002/addProducts", {
     primeCatId:primeCatId,
     subCatId:subCatId,
     brand:brand,
     vendor:vendor,
     name:name,
     shortDescc:shortDescc,
     longDescc:longDescc,
     min_qty:min_qty,
     basePrice:basePrice,
     marketPrice:marketPrice,
     ourPrice:ourPrice,	    
     unit:unit,
     fixed:fixed,
     percent:percent,
     allowance:allowance,
     varName:varName,
     varbasePrice:varbasePrice,
     varMarketPrice:varMarketPrice,
     varourPrice:varourPrice,

    }).then((response) => {
      if (response.data.message) {
        console.log(response)
      } else {
        console.log("Employee Added Successfully")
      }

    });
  }


  return (
    <div className='bg-white'>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Add Product</h5>
          <Form>

            <div className="d-flex">
              <Dropdown className='p-2'>
                <h5>Select Prime Category</h5>
                <Dropdown.Toggle as={Button} variant="primary">
                  <FontAwesomeIcon icon={faClipboard} className="me-2" /> Select prime category
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                  {
                    data.map((curElement) => {
                      return (
                        <>
                          <Dropdown.Item value={drop} >
                            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> {curElement.name}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      );
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className='p-2'>
                <h5>Select sub category</h5>
                <Dropdown.Toggle as={Button} variant="primary">
                  <FontAwesomeIcon icon={faClipboard} className="me-2" /> Select sub category
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                  {
                    subCatIddata.map((curElement) => {
                      return (
                        <>
                          <Dropdown.Item value={drop}>
                            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> {curElement.name}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      );
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className='p-2'>
                <h5>Select Brand</h5>
                <Dropdown.Toggle as={Button} variant="primary">
                  <FontAwesomeIcon icon={faClipboard} className="me-2" /> Select Brand
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                  {
                    brandIddata.map((curElement) => {
                      return (
                        <>
                          <Dropdown.Item value={drop}>
                            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> {curElement.name}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      );
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>

              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Select Vendor name</Form.Label>
                  <Form.Control required type="text" onChange={e => setvendor(e.target.value)} value={vendor} placeholder="Enter vendor name" />
                </Form.Group>
              </Col>
              {/* <Dropdown className='p-2'>
                <h5>Select Unit</h5>
                <Dropdown.Toggle as={Button} variant="primary">
                  <FontAwesomeIcon icon={faClipboard} className="me-2" /> Select Unit
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                  {
                    unitdata.map((curElement) => {
                      return (
                        <>
                          <Dropdown.Item>
                            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> {curElement.name}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      );
                    })
                  }

                </Dropdown.Menu>
              </Dropdown> */}
            </div>

            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Enter product name" />
                </Form.Group>
              </Col>

              <Col md={4} className="mb-3">
                <input type="file" name={image} onChange={selectMainImage} />
              </Col>

              <Col md={4} className="mb-3">
                <input type="file" multiple maxLength={5} onChange={selectImage} />
              </Col>
            </Row>

            <Form.Group id="password" className="mb-4">
              <Form.Label>Enter Short Descreption</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon />
                </InputGroup.Text>
                <Form.Control required type="text" onChange={e => setshortDescc(e.target.value)} value={shortDescc} placeholder="short description" />
              </InputGroup>
            </Form.Group>
            <Row>
              <Form>
                <Form.Group>
                  <Form.Label>Long description</Form.Label>
                  <Form.Control as="textarea" rows="4" onChange={e => setlongDescc(e.target.value)} value={longDescc} placeholder=" long description..." />
                </Form.Group>
              </Form>
              {/* <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" onChange={handleInput} placeholder="No." />
              </Form.Group>
            </Col> */}
            </Row>
            <div className="d-flex">
              <Form>
                <Form.Group>
                  <Form.Label>min_qty</Form.Label>
                  <Form.Control as="textarea" rows="1" onChange={e => setmin_qty(e.target.value)} value={min_qty} placeholder="Minimum Order Quantity" />
                </Form.Group>
              </Form>

              <Form className='m-4'>
                <Form.Group>
                  <Form.Label>Price Details</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon />
                    </InputGroup.Text>
                    <Form.Control required type="text" onChange={e => setbasePrice(e.target.value)} value={basePrice} placeholder="Base price" />
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon />
                    </InputGroup.Text>
                    <Form.Control required type="text" onChange={e => setmarketPrice(e.target.value)} value={marketPrice} placeholder="Market price" />
                  </InputGroup>
                  <InputGroup>

                    <InputGroup.Text>
                      <FontAwesomeIcon />
                    </InputGroup.Text>
                    <Form.Control required type="text" onChange={e => setourPrice(e.target.value)} value={ourPrice} placeholder="Our price" />
                  </InputGroup>             </Form.Group>
              </Form>

              <Dropdown className='p-2'>
                <h5>Select Unit</h5>
                <Dropdown.Toggle as={Button} variant="primary">
                  <FontAwesomeIcon icon={faClipboard} className="me-2" /> Select Unit
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                  {
                    unitdata.map((curElement) => {
                      return (
                        <>
                          <Dropdown.Item>
                            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> {curElement.name}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      );
                    })
                  }

                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex">
              <Form>
                <Form.Group>
                  <Form.Label>Commission Details</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon />
                    </InputGroup.Text>
                    <Form.Control required type="text" onChange={e => setfixed(e.target.value)} value={fixed} placeholder="fixed" />
                  </InputGroup>
                  <InputGroup>
                    <Form.Control required type="text" onChange={e => setpercent(e.target.value)} value={percent} placeholder="percent" />
                  </InputGroup>
                </Form.Group>
              </Form>

              <Form className='m-2'>
                <Form.Group>
                  <Form.Label>allowance</Form.Label>
                  <InputGroup>
                    <Form.Control required type="text" onChange={e => setallowance(e.target.value)} value={allowance} placeholder="allowance" />
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>

            <div className="d-flex">
              <Form className='m-2'>
                <Form.Group>
                  <Form.Label>Add Variant</Form.Label>
                  <InputGroup>
                    <Form.Control required type="text" onChange={e => setvarName(e.target.value)} value={varName} placeholder="variant name" />
                  </InputGroup>
                </Form.Group>
              </Form>
              {/* </div>

            <div className="d-flex"> */}
              <Form className='m-2'>
                <Form.Group>
                  <Form.Label>Variant Price</Form.Label>

                  <InputGroup>
                    <Form.Control required type="text" onChange={e => setvarmarketPrice(e.target.value)} value={varMarketPrice} placeholder="market price" />
                  </InputGroup>
                  <InputGroup>
                    <Form.Control required type="text" onChange={e => setvarbasePrice(e.target.value)} value={varbasePrice} placeholder="base price" />
                  </InputGroup>
                  <InputGroup>
                    <Form.Control required type="text" onChange={e => setvarourPrice(e.target.value)} value={varourPrice} placeholder="our price" />
                  </InputGroup>             </Form.Group>
              </Form>
            </div>

            <div className="d-flex">
              <Table striped bordered hover>
                <thead>
                  <th>Sr.No</th>
                  <th>Variant Name</th>
                  <th>Market price </th>
                  <th>Our price</th>
                  <th>Remove</th>
                  <th></th>
                </thead>
                <tbody>
                  {/* 
          {
            data.map((curElement) => {
              return (

                <tr>
                   <td>{curElement.id}</td>
                   <td>{curElement.name}</td>
                  <td><ChoosePhotoWidget
                    // title="Select profile photo"
                    photo={Profile3}
                  /></td>
                  <td><Button onClick={() => setShowDefault(true)}>Edit</Button></td>
                  <td><BootstrapSwitchButton checked={true} onlabel="Activate" offlabel="Deactivate" onstyle="success" offstyle="danger" width='120' /></td>
                </tr>
              );
            })
          } */}
                </tbody>
              </Table>
            </div>

            <div className="mt-3">
              <Button variant="primary" type="submit" onClick={Register} >Save All</Button>
            </div>
          </Form>
        </Card.Body>
      </Card >
    </div >
  );
};
