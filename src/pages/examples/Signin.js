
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { useState } from "react";
import { useHistory } from "react-router-dom";

// var a=window.location.host;
// alert(a)
// sessionStorage.clear();

export default () => {
  // sessionStorage.clear();

  const [loginstatus, setloginstatus] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [state, setstate] = useState('11')
  const [id, setid] = useState('')
  const history = useHistory();

  const Login = () => {
    Axios.post("http://localhost:3002/adminLogin", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setloginstatus(response.data.message);
        sessionStorage.clear();

      } else {
        setloginstatus("Login Successfully")
        window.location.href='#/settings'
        sessionStorage.setItem('id', response.data[0].id.toString());
        setid(response.data[0].id.toString())
        console.log(response)
      }
     
    });

  }


  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            {/* to={Routes.DashboardOverview.path}  */}
            <Card.Link as={Link} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> {loginstatus} {id}
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email"
                        onChange={event => setUserName(event.target.value)}
                        value={username}
                        placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password"
                          onChange={event => setPassword(event.target.value)}
                          value={password}
                          placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>

                  {/* event =>  window.location.href='#/dashboard/overview' */}
                  <Button variant="primary" onClick={Login} type="submit" className="w-100">
                    Sign in
                  </Button>

                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
