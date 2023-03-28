
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';

export const GeneralInfoForm = () => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  const Register = () =>{
    Axios.post("http://localhost:3002/AddCustNumbers", {
      name: name,
      username: username,
      
    }).then((response) => {
      
      if (response.data.message) {
        console.log(response)
      } else {
        console.log("Registered Successfully")
        // window.location.href='#/dashboard/overview'
        // sessionStorage.setItem('id', response.data[0].id.toString());
        // console.log(response.data[0].id.toString())
        console.log(response)
      }
     
    });
  }
  
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add customer numbers</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name}  placeholder="enter title" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="enter number" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit" onClick={Register} >Save</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
