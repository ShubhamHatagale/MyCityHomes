
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, InputGroup, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal, Container } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { useState } from "react";
import { useEffect } from "react";
import Axios from 'axios';
import Settings from '../pages/Settings';
// import BgImage from "../../assets/img/illustrations/signin.svg";

const ValueChange = ({ value, suffix }) => {

  //   const [info, setInfo] = useState("yoyoo")

  //     useEffect(() => {
  //         Axios.get("http://localhost:3002/adminReg/get").then((response) => {
  //             console.log(response)
  //             // setInfo(response.data[0].id)
  //         });

  // }, [])

  // const [id, setid] = useState(
  //     sessionStorage.getItem('id')
  // );

  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const [sales, setsales] = useState(false)
  const [collection, setcollection] = useState(false)
  const [delivery, setdelivery] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [id, setid] = useState(null)


  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const totalTransactions = transactions.length;
  const [data, setData] = useState([])

  const getEmpData = () => {
    Axios.get("http://localhost:3002/addEmployee/get").then((response) => {
      // console.log(response.data)
      setData(response.data)
      setName(response.data[0].name)
      setUsername(response.data[0].username)
      setEmail(response.data[0].email)
      setMobile(response.data[0].mobile)
      setPassword(response.data[0].password)
      setAddress(response.data[0].address)

      setsales(response.data[0].sales)
      setcollection(response.data[0].collection)
      setdelivery(response.data[0].delivery)
      setid(response.data[0].id)
      // alert(response.data[0].id)

    });
  }
  useEffect(() => {
    getEmpData()
  }, [])


  // const Register = () => {
  //   // console.log(sales,collection,delivery);
  //   Axios.post("http://localhost:3002/addEmployee", {
  //     name: name,
  //     username: username,
  //     email: email,
  //     mobile: mobile,
  //     password: password,
  //     address: address,
  //     sales:sales,
  //     collection:collection,
  //     delivery:delivery,
  //   }).then((response) => {
  //     if (response.data.message) {
  //       console.log(response)
  //     } else {
  //       console.log("Employee Added Successfully")
  //     }

  //   });
  // }

  const update = () => {
    console.log(id)
    // console.log(id,name,username,email,mobile)
    Axios.put("http://localhost:3002/addEmployee/update", {
      id: id,
      name: name,
      username: username,
      email: email,
      mobile: mobile,
      password: password,
      address: address,
      sales: sales,
      collection: collection,
      delivery: delivery,
    });
  }
  const Edit = (id) => {
    // console.log(data[id - 1])
    setName(data[id - 1].name)
    setUsername(data[id - 1].username)
    setEmail(data[id - 1].email)
    setMobile(data[id - 1].mobile)
    setPassword(data[id - 1].password)
    setAddress(data[id - 1].address)

    setsales(data[id - 1].sales)
    setcollection(data[id - 1].collection)
    setdelivery(data[id - 1].delivery)
    setid(data[id - 1].id)

    setShowDefault(true)
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center form-bg-image" >
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <React.Fragment>
              {/* <Button variant="primary" className="my-3" onClick={() => setShowDefault(true)}>Default</Button> */}

              <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title className="h6">Edit</Modal.Title>
                  <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                  <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-4">Edit Employee </h5>
                      <Form>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                              <Form.Label>Full Name </Form.Label>
                              <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder='enter name' />
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                              <Form.Label>User Name</Form.Label>
                              <Form.Control required type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="enter username" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="align-items-center">

                        </Row>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                              <Form.Label>Email</Form.Label>
                              <Form.Control required type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="name@company.com" />
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control required type="number" onChange={e => setMobile(e.target.value)} value={mobile} placeholder="+12-345 678 910" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group id="password" className="mb-4">
                          <Form.Label>Enter Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control required type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" />
                          </InputGroup>
                        </Form.Group>

                        <h5 className="my-4">Address</h5>
                        <Row>
                          <Col sm={9} className="mb-3">
                            <Form.Group id="address">
                              <Form.Label>Address</Form.Label>
                              <Form.Control required type="text" onChange={e => setAddress(e.target.value)} value={address} placeholder="Enter your home address" />
                            </Form.Group>
                          </Col>

                        </Row>
                        <Row>
                          <Form.Label>Select Role</Form.Label>
                          <Col sm={4} className="mb-3">
                            <Form.Check type="checkbox" value={sales} checked={sales} onChange={(e) => setsales(e.target.checked)} label="Sales Executive" />
                          </Col>

                          <Col sm={4} className="mb-3">
                            <Form.Check type="checkbox" value={collection} checked={collection} onChange={(e) => setcollection(e.target.checked)} label="Payment Executive" />
                          </Col>
                          <Col sm={4}>
                            <Form.Check type="checkbox" value={delivery} checked={delivery} onChange={(e) => setdelivery(e.target.checked)} label="Delivery Executive" />
                          </Col>
                        </Row>
                        <div className="mt-3">
                          <Button variant="primary" type="submit" onClick={() => update()} >Update</Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                  {/* <Settings /> */}
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleClose}>
              Go
    </Button> */}
                  <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                    Close
    </Button>
                </Modal.Footer>
              </Modal>
            </React.Fragment>


            <Table className="table-hover table-bordered">
              <thead>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact no</th>
                <th>Address</th>
                <th>Username</th>
                <th>Sales</th>
                <th>Collection</th>
                <th>Delivery</th>
                <th>Edit</th>
              </thead>
              <tbody>

                {
                  data.map((curElement) => {
                    return (
                      <tr>
                        <td>{curElement.id}</td>
                        <td>{curElement.name}</td>
                        <td>{curElement.email}</td>
                        <td>{curElement.mobile}</td>
                        <td>{curElement.address}</td>
                        <td>{curElement.username}</td>
                        <td>{curElement.sales}</td>
                        <td>{curElement.collection}</td>
                        <td>{curElement.delivery}</td>
                        <td><Button onClick={() => Edit(curElement.id)}>Edit</Button></td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );

};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

