
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { Image, Col, Row, Card, Form, Button, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';
import { useEffect } from "react";

export const GeneralInfoForm = () => {

  const [primeCatId, setprimeCatId] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState([])
  const [showon, setShowon] = useState(false)
  const [data, setData] = useState([])
  const [demo, setDemo] = useState(false)

  const selectImage = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0].name)
  }

  const getEmpData = () => {
    Axios.get("http://localhost:3002/addPrimeCategory/get").then((response) => {
      // console.log(response.data)
      setprimeCatId(response.data[0].id)
      console.log(response.data[0])
      setData(response.data)

    });
  }
  useEffect(() => {
    getEmpData()
  }, [])

  const Register = () => {

    Axios.post("http://localhost:3002/addSubCategory", {
      primeCatId: primeCatId,
      name: name,
      image: image,
      demo: demo,
      showon: showon,

    }).then((response) => {
      if (response.data.message) {
        console.log(response)
      } else {
        console.log("Employee Added Successfully")
      }

    });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Sub-Category</h5>
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

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" onChange={e => setName(e.target.value)}
                  placeholder="Enter your name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Card.Body>
                {/* <h5 className="mb-4">{title}</h5> */}
                <div className="d-xl-flex align-items-center">
                  <div className="user-avatar xl-avatar">
                    <Image fluid rounded src='{image}' />
                  </div>
                  <div className="file-field">
                    <div className="d-flex justify-content-xl-center ms-xl-3">
                      <div className="d-flex">
                        <span className="icon icon-md">
                          <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                        </span>
                        <input type="file" onChange={selectImage} />
                        <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">Choose Image</div>
                          <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formBasicCheckbox">
                <h5 className="mb-4">Demo Option</h5>
                <Row>
                  <Form.Check type="checkbox" onChange={(e) => setDemo(e.target.checked)} label="Click On If Yes" />
                </Row>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formBasicCheckbox">
                <h5 className="mb-4">Show on home screen</h5>
                <Form.Check type="checkbox" onChange={(e) => setShowon(e.target.checked)} label="Click On If Yes" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={9} className="mb-3">
            </Col>

          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit" onClick={Register} >Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card >
  );
};
