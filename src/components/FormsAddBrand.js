
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup,Image } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt,faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";

export const GeneralInfoForm = () => {

  const [drpdn, setDrpdn] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState([])
  const [showon, setShowon] = useState(false)
  const [data, setData] = useState([])
  const [demo, setDemo] = useState(false)

  const selectImage = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0].name)
  }

  const Register = () => {
    Axios.post("http://localhost:3002/addBrand", {
      name: name,
      image: image,

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
        <h5 className="mb-4">Add Brand</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" onChange={e => setName(e.target.value)}
                 value={name} 
                 placeholder="Enter Brand Name" />
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
          <Row className="align-items-center">
            
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              
            </Col>
            <Col md={6} className="mb-3">
              
            </Col>
          </Row>
          <Row>
            <Col sm={9} className="mb-3">
            </Col>
            {/* <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" onChange={handleInput} placeholder="No." />
              </Form.Group>
            </Col> */}
          </Row>
          {/* <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" onChange={handleInput} placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
              
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" onChange={handleInput} placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row> */}
          <div className="mt-3">
            <Button variant="primary" type="submit" onClick={Register} >Save</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
