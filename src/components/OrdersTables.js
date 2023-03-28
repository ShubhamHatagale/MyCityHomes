import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faUnlockAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
  Modal,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import Settings from "../pages/Settings";

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

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
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
          <FontAwesomeIcon
            icon={bounceIcon}
            className={`${bounceTxtColor} me-3`}
          />
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
            <Button variant="secondary" size="sm">
              See all
            </Button>
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
          {pageVisits.map((pv) => (
            <TableRow key={`page-visit-${pv.id}`} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
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
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
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
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
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
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

const pageView = () => {
  return <Settings />;
};
export const TransactionsTable = () => {
  var addedBy = sessionStorage.getItem("id");
  // alert(addedBy)
  const [id, setid] = useState("");
  const [order_id, setorder_id] = useState("");
  const [order_date, setorder_date] = useState("");
  const [order_time, setorder_time] = useState("");
  const [cust_id, setcust_id] = useState("");
  const [contac, setcontac] = useState("");
  const [order_total, setorder_total] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [prod_id, setprod_id] = useState("");
  const [price, setprice] = useState("");
  const [veriant, setveriant] = useState("");
  const [order_quantity, setorder_quantity] = useState("");
  const [allowance, setallowance] = useState("");
  const [product_amt, setproduct_amt] = useState("");

  const [name, setName] = useState("ssdsd");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const Register = () => {
    if (
      name == "" ||
      username == "" ||
      email == "" ||
      mobile == "" ||
      password == "" ||
      address == ""
    ) {
      alert("plese fill out the fields");
    } else {
      Axios.post("http://localhost:3002/adminReg", {
        name: name,
        username: username,
        email: email,
        mobile: mobile,
        password: password,
        address: address,
      }).then((response) => {});
      alert("Registered Successfully");
    }
  };

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const [show, setshow] = useState(false);
  const confirmation = () => setshow(false);

  
  const totalTransactions = transactions.length;
  const [data, setData] = useState([]);

  const getOrderData = () => {
    Axios.get("http://localhost:3002/orderDetails/get").then((response) => {
      // console.log(response.data);
      setData(response.data);
      setorder_id(response.data[0].order_id);
      setorder_date(response.data[0].order_date);
      setorder_time(response.data[0].order_time);
      setcust_id(response.data[0].cust_id);
      setcontac(response.data[0].order_id);
      setorder_total(response.data[0].order_total);
      setvendor_id(response.data[0].vendor_id);
      setprod_id(response.data[0].prod_id);
      setprice(response.data[0].price);
      setveriant(response.data[0].veriant);
      setorder_quantity(response.data[0].order_quantity);
      setallowance(response.data[0].allowance);
      setproduct_amt(response.data[0].product_amt);
      setid(response.data[0].id);
    });
  };
  useEffect(() => {
    getOrderData();
  }, []);

  const view = (id) => {
    setShowDefault(true);

    setorder_id(data[id - 1].order_id);
    setorder_date(data[id - 1].order_date);
    setorder_time(data[id - 1].order_time);
    setcust_id(data[id - 1].cust_id);
    setcontac(data[id - 1].order_id);
    setorder_total(data[id - 1].order_total);
    setvendor_id(data[id - 1].vendor_id);
    setprod_id(data[id - 1].prod_id);
    setprice(data[id - 1].price);
    setveriant(data[id - 1].veriant);
    setorder_quantity(data[id - 1].order_quantity);
    setallowance(data[id - 1].allowance);
    setproduct_amt(data[id - 1].product_amt);
    setid(data[id - 1].id);
  };

  const assign_pay_del = 1;
  const confirm = (id) => {
    
    setshow(true)
    Axios.put("http://localhost:3002/assign_pay_del/update", {
      id: id,
      assign_pay_del: assign_pay_del,
    }).then((response) => {});
    alert("Confirmed Successfully");

    // Axios.put("http://localhost:3002/Rejectedcustomers/Delete", {
    //   id: id,
    //   rejected: rejected,
    // }).then((response) => {});
    // alert("rejected Successfully");
  };
  return (
    <>
      <React.Fragment>
        {/* <Button variant="primary" className="my-3" onClick={() => setShowDefault(true)}>Default</Button> */}

        <Modal
          as={Modal.Dialog}
          size="xl"
          centered
          show={showDefault}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title className="h6">Order Details</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                {/* <h5 className="mb-4">Order Details</h5> */}
                <Form>
                  <Row>
                    <Col md={3} className="mb-3">
                      <Form.Group>
                        <Form.Label>Order ID :- {order_id}</Form.Label>
                      </Form.Group>
                    </Col>
                    <Col md={3} className="mb-3">
                      <Form.Group id="lastName">
                        <Form.Label>Order Date :- {order_date}</Form.Label>
                      </Form.Group>
                    </Col>

                    <Col md={3} className="mb-3">
                      <Form.Group id="lastName">
                        <Form.Label>Order Time :- {order_time}</Form.Label>
                      </Form.Group>
                    </Col>

                    <Col md={3} className="mb-3">
                      <Form.Group id="lastName">
                        <Form.Label>Order Total :- {order_total}</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
                <div style={{ overflow: "scroll" }}>
                  <Table striped bordered hover>
                    <thead>
                      <th>Sr.No</th>
                      <th>Vendor Name</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Selected Veriant</th>
                      <th>Order quantity</th>
                      <th>Allowance</th>
                      <th>Product amount</th>
                      <th>Order Total</th>
                      <th>Confirmation</th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{id}</td>
                        <td>{vendor_id}</td>
                        <td>{prod_id}</td>
                        <td>{price}</td>
                        <td>{veriant}</td>
                        <td>{order_quantity}</td>
                        <td>{allowance}</td>
                        <td>{product_amt}</td>
                        <td>{order_total}</td>
                        <td>
                          <Button onClick={() => setShowDefault(true)}>
                            Confirm
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              I Got It
            </Button> */}
            <Button
              variant="link"
              className="text-gray ms-auto"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>


      <Table striped bordered hover>
        <thead>
          <th>Sr.No</th>
          <th>Order Id</th>
          <th>Order Date</th>
          <th>Order Time</th>
          <th>Customers</th>
          <th>Contacts</th>
          <th>View Orders</th>
          <th>Order Total</th>
          <th>Confirmation</th>
          <th></th>
        </thead>
        <tbody>
          {data.map((curElement) => {
            return (
              <>
              <>
{/* <Modal show={show} onHide={confirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={confirmation}>
            No
          </Button>
          <Button variant="primary" onClick={confirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}
</>
              <tr>
                <td>{curElement.id}</td>
                <td>{curElement.order_id}</td>
                <td>{curElement.order_date}</td>
                <td>{curElement.order_time}</td>
                <td>{curElement.cust_id}</td>
                <td>{curElement.contac}</td>
                <td>
                  <Button onClick={() => view(curElement.id)}>View</Button>
                </td>
                <td>{curElement.order_total}</td>
                {/* <td><Button onClick={() => setShowDefault(true)}>Edit</Button></td> */}
                <td>
                  {curElement.assign_pay_del == 0 ?<Button onClick={() => confirm(curElement.id)}>
                    Confirm
                  </Button>:<Button variant="success">Confirmed</Button>}
                </td>
              </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      
    </>
  );
  // };

  // return (
  //   <>
  //     <h1>..</h1>
  //   </>
  // )
  // return (
  //   <Card border="light" className="table-wrapper table-responsive shadow-sm">
  //     <Card.Body className="pt-0">
  //       <Table hover className="user-table align-items-center">
  //         <thead>
  //           <tr>
  //             <th className="border-bottom">Sr.no</th>
  //             <th className="border-bottom">Name</th>
  //             <th className="border-bottom">Contact no</th>
  //             <th className="border-bottom">Address</th>
  //             <th className="border-bottom">Username</th>
  //             <th className="border-bottom">Status</th>
  //             <th className="border-bottom">Action</th>
  //           </tr>
  //         </thead>
  //         {/* <tbody>
  //           {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
  //         </tbody> */}
  //       </Table>

  //       <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
  //         <Nav>
  //           <Pagination className="mb-2 mb-lg-0">
  //             <Pagination.Prev>
  //               Previous
  //             </Pagination.Prev>
  //             <Pagination.Item active>1</Pagination.Item>
  //             <Pagination.Item >2</Pagination.Item>
  //             <Pagination.Item>3</Pagination.Item>
  //             <Pagination.Item>4</Pagination.Item>
  //             <Pagination.Item>5</Pagination.Item>
  //             <Pagination.Next>
  //               Next
  //             </Pagination.Next>
  //           </Pagination>
  //         </Nav>
  //         <small className="fw-bold">
  //           Showing <b>{totalTransactions}</b> out of <b>25</b> entries
  //         </small>
  //       </Card.Footer>
  //     </Card.Body>
  //   </Card>
  // );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
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
