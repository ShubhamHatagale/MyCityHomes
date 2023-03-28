
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';

export const GeneralInfoForm = () => {

  const [longdesc, setlongdesc] = useState('')
  const [shortdesc, setshortdesc] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [img, setImg] = useState('')
  
  const selectMainImage = (event) => {
    setImg(event.target.files[0])
    console.log(event.target.files[0])
  }
  const selMulImg = (event) => {
    // setImg(event.target.files[0])
    // console.log(event.target.files[0])
  }

  const Register = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("avatar", img);
    formData.append("name", name)
    formData.append("shortdesc", shortdesc)
    formData.append("longdesc", longdesc)

    fetch("http://localhost:3002/addServices", {
      method: "post",
      body: formData,
    })
      .then((res) => res.text())
      .then((resBody) => {
        console.log(resBody)
      })

    //   Axios.post("http://localhost:3002/addServices",img, {
    //     name: name,

    //     // id:Id,
    //   }).then((response) => {

    //     if (response.data.message) {
    //       console.log(response)
    //     } else {
    //       console.log("Registered Successfully")
    //       // window.location.href='#/dashboard/overview'
    //       // sessionStorage.setItem('id', response.data[0].id.toString());
    //       // console.log(response.data[0].id.toString())
    //       console.log(response)
    //     }

    //   });
  }



  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Service</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Service Name</Form.Label>
                <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Enter your name" />
              </Form.Group>
            </Col>
            <Form.Label>Select Main Image</Form.Label>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <input type="file" multiple maxLength={5} onChange={selectMainImage} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">

          </Row>
          <Form.Label>Select 5 images</Form.Label>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <input type="file" multiple maxLength={5} onChange={selMulImg} />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <InputGroup>
                <Form.Control type="text" 
                 onChange={e => setshortdesc(e.target.value)} value={shortdesc}
                 placeholder="Short Descreption" />
              </InputGroup>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>Long descreption</Form.Label>
                <Form.Control as="textarea" rows="4" 
                 onChange={e => setlongdesc(e.target.value)} value={longdesc}
                placeholder="Long descreption" />
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
