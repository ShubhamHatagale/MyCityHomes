
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Image, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";

export const FormsAddPrime = () => {

    const [name, setName] = useState('')
    const [image, setImage] = useState([])
    const [showon, setShowon] = useState(false)

    const selectImage = (e) => {
        setImage(e.target.files[0].name)
        const newfd = new FormData()
        newfd.append('file', image)
        console.log(e.target.files[0])
    }

    const Register = () => {
        alert(image)
        // console.log(salecheck,collecheck,showon);
        Axios.post("http://localhost:3002/addPrimeCategory", {
            name: name,
            image: image,
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
                <h5 className="mb-4">Add prime category</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Enter your name" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Card border="light" className="bg-white shadow-sm mb-4">
                                <Card.Body>
                                    {/* <h5 className="mb-4">{title}</h5> */}
                                    <div className="d-xl-flex align-items-center">
                                        <div className="user-avatar xl-avatar">
                                            <Image fluid rounded src={image} />
                                        </div>
                                        <div className="file-field">
                                            <div className="d-flex justify-content-xl-center ms-xl-3">
                                                <div className="d-flex">
                                                    <span className="icon icon-md">
                                                        <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                                                    </span>
                                                    <input type="file" name="file" single onChange={selectImage} />
                                                    <div className="d-md-block text-start">
                                                        <div className="fw-normal text-dark mb-1">Choose Image</div>
                                                        <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" onChange={(e) => setShowon(e.target.checked)} label="Show on Home Screen" />
                        </Form.Group>
                    </Row>
                    <Row className="align-items-center">
                    </Row>
                    <div className="mt-3">
                        <Button variant="primary" type="submit" onClick={Register} >Save</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
