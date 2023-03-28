
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal, InputGroup, Form } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { useState } from "react";
import { useEffect } from "react";
import Axios from 'axios';
import Settings from '../pages/Settings';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const ValueChange = ({ value, suffix }) => {

  //   const [info, setInfo] = useState("yoyoo")

  //     useEffect(() => {
  //         Axios.get("http://localhost:3002/adminReg/get").then((response) => {
  //             console.log(response)
  //             // setInfo(response.data[0].id)
  //         });

  // }, [])

  // const [id, setId] = useState(
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
  const [id, setid] = useState(null)

  const Edit = (id) => {
    setName(data[id - 1].name)
    setImage(data[id - 1].image)
    setid(data[id - 1].id)
    setShowDefault(true)

  }
  const update = () => {
    Axios.put("http://localhost:3002/addPrimeCategory/update", {
      id: id,
      name: name,
      image: image,
    });
  }

  const selectImage = (e) => {
    setImage(e.target.files[0].filename)
  }

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const totalTransactions = transactions.length;
  const [data, setData] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3002/addPrimeCategory/get").then((response) => {
      console.log(response.data)
      setData(response.data)
      setName(response.data[0].name)
      setImage(response.data[0].image)
      setid(response.data[0].id)

    });

  }, [])

  return (
    <>
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
                <h5 className="mb-4">Edit Prime Caategory </h5>
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="firstName">
                        <Form.Label>Prime category name </Form.Label>
                        <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder='enter name' />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <input type="file" multiple maxLength={5} onChange={selectImage} />
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

      <Table striped bordered hover>
        <thead>
          {/*  
 
 
o Prime category name
o Image
 (checkbox) condition – anyone
 Show on home screen
  button */}
          <th>Sr.No</th>
          <th>Prime category name</th>
          <th>Image</th>
          <th>Show on home screen Y/N </th>
          <th>Show on home screen</th>
          <th>Edit</th>
          <th>Activate/Deactivate</th>
          <th></th>
        </thead>
        <tbody>

          {
            data.map((curElement) => {
              return (
                <tr>
                  <td>{curElement.id}</td>
                  <td>{curElement.name}</td>
                  <td>{curElement.image}</td>
                  <td> <Form.Group controlId="formBasicCheckbox">
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Check type="checkbox" label="Yes" />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Check type="checkbox" label="No" />
                      </Col>
                    </Row>
                  </Form.Group></td>

                  <td> <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Show on Home Screen" />
                  </Form.Group></td>
                  <td><Button onClick={() => Edit(curElement.id)}>Edit</Button></td>
                  <td><BootstrapSwitchButton checked={true} onlabel="Activate" offlabel="Deactivate" onstyle="success" offstyle="danger" width='120' /></td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
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

// Sr. No
//  Name
//  Email
//  Contact no
//  Address
//  Username
//  Edit option