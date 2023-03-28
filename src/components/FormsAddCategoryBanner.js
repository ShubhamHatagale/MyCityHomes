
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';

export const GeneralInfoForm = () => {

  const [category, setcategory] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  const [longdesc, setlongdesc] = useState('')
  const [shortdesc, setshortdesc] = useState('')
  const [img, setImg] = useState('')

  const selectMainImage = (event) => {
    setImg(event.target.files[0])
    console.log(event.target.files[0])
  }

  const Register = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("reward", img);
    formData.append("name", name)
    formData.append("category", category)


    fetch("http://localhost:3002/addCategoryBanners", {
      method: "post",
      body: formData,
    })
      .then((res) => res.text())
      .then((resBody) => {
        console.log(resBody)
      })

  }


  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Category Banners</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Select Category {category} </Form.Label>
                  <Form.Select onChange={(e) => setcategory(e.target.value)} >
                    <option defaultValue>Open this select menu</option>
                    <option value='One'>One</option>
                    <option value='Two'>Two</option>
                    <option value='Three'>Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Enter your name" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Add Image</Form.Label>
                <input type="file" src={img} onChange={selectMainImage} />
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
