import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import Axios from 'axios';
import { TransactionsTable } from "../components/RegEmpTables";
import { useState } from "react";
import { useEffect } from "react";

export default () => {
    const [info, setInfo] = useState("")
    
    useEffect(() => {
        Axios.get("http://localhost:3002/adminReg/get").then((response) => {
            setInfo(response.data[0].id)
        });

}, [])

const [id, setid] = useState(
    sessionStorage.getItem('id')
);

return (
    <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block mb-4 mb-md-0">
                <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                    <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                    <Breadcrumb.Item>Humen Resource</Breadcrumb.Item>
                    <Breadcrumb.Item active>Registered Admins {info} </Breadcrumb.Item>
                </Breadcrumb>
                <h4>Registered Admin Users</h4>
                {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
            </div>
            {/* <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div> */}
        </div>

        <div className="table-settings mb-4">
            <Row className="justify-content-between align-items-center">
            </Row>
        </div>

        <TransactionsTable />
    </>
);
};
