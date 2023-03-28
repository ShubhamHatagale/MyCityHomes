import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import Axios from 'axios';

import { TransactionsTable } from "../components/SubCateTables";
import { useState } from "react";
import { useEffect } from "react";

export default () => {
    const [info, setInfo] = useState("")
    
    useEffect(() => {
        Axios.get("http://localhost:3002/adminReg/get").then((response) => {
            console.log(response)
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
            </div>
            
        </div>


        <TransactionsTable />
    </>
);
};
