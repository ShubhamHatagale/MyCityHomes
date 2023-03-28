
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';

export const GeneralInfoForm = () => {

  const [addr, setaddr] = useState('')
  const [gst, setgst] = useState('')
  const [descr, setdescr] = useState('')
  const [contac, setcontac] = useState('')
  const [cont, setcont] = useState('')

  const [name, setName] = useState('')
  const [bname, setbname] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const Register = () => {
    Axios.post("http://localhost:3002/Addvendors", {
      name: name,
      bname: bname,
      addr: addr,
      gst: gst,
      descr: descr,
      cont: cont,
      contac: contac,

      // id:Id,
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
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Vendors</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Personal Name</Form.Label>
                <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Enter your name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Buiseness Name</Form.Label>
                <Form.Control required type="text" onChange={e => setbname(e.target.value)} value={bname} placeholder="enter Buiseness Name" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>addr</Form.Label>
                <Form.Control required type="text" onChange={e => setaddr(e.target.value)} value={addr} placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>GST No.</Form.Label>
                <Form.Control required type="GST No." onChange={e => setgst(e.target.value)} value={gst} placeholder="enter GST no." />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Descrription</Form.Label>
                <Form.Control required type="text" onChange={e => setdescr(e.target.value)} value={descr} placeholder="enter descrription" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Contact - 1</Form.Label>
                <Form.Control required type="text" onChange={e => setcont(e.target.value)} value={cont} placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Contact - 2</Form.Label>
                <Form.Control required type="GST No." onChange={e => setcontac(e.target.value)} value={contac} placeholder="+12-345 678 910" />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit" onClick={Register} >Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
