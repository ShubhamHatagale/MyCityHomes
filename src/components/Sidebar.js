
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Admin" image={ReactHero} />
              {/* link={Routes.DashboardOverview.path} */}
              <CollapsableNavItem eventKey="Human Resource" title="Human Resource" icon={faChartPie} >
                <CollapsableNavItem eventKey="Admin Panel Users" title="Admin Panel Users" >
                  <NavItem title="Register New User" link={Routes.Settings.path} />
                  <NavItem title="Registered Users List" link={Routes.RegisteredAdmin.path} />
                </CollapsableNavItem>
                <CollapsableNavItem eventKey="Add employees" title="Add employees" >
                  <NavItem title="Add employee" link={Routes.AddEmployee.path} />
                  <NavItem title="Registered Users List" link={Routes.RegisteredEmployee.path} />
                </CollapsableNavItem>
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="Products and Services" title="Products and Services" icon={faChartPie} >
                <CollapsableNavItem eventKey="Prime category" title="Prime category" >
                  <NavItem title="Add prime category" link={Routes.SettingsFormsAddPrime.path} />
                  <NavItem title="Prime Category Register" link={Routes.PCRegister.path} />
                </CollapsableNavItem>
                <CollapsableNavItem eventKey="Sub Category" title="Sub Category" >
                  <NavItem title="Add sub category" link={Routes.AddSubCate.path} />
                  <NavItem title="Sub Category Register" link={Routes.RegSubCate.path} />
                </CollapsableNavItem>

                <CollapsableNavItem eventKey="Brand" title="Brand" >
                  <NavItem title="Add Brand" link={Routes.AddBrand.path} />
                  <NavItem title="Brand Register" link={Routes.RegisteredBrands.path} />
                </CollapsableNavItem>

                <CollapsableNavItem eventKey="Unit" title="Unit" >
                  <NavItem title="Add unit" link={Routes.AddUnit.path} />
                  <NavItem title="Unit register" link={Routes.RegUnit.path} />
                </CollapsableNavItem>
                <CollapsableNavItem eventKey="Product" title="Product" >
                  <NavItem title="Add Product" link={Routes.AddProduct.path} />
                  <NavItem title="Product Register" link={Routes.RegProduct.path} />
                </CollapsableNavItem>
                <CollapsableNavItem eventKey="Service" title="Service" >
                  <NavItem title="Add Service" link={Routes.AddService.path} />
                  <NavItem title="Service Register" link={Routes.RegService.path} />
                </CollapsableNavItem>
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="Vendors" title="Vendors" icon={faChartPie}>
                <NavItem title="Add Vendor" link={Routes.AddVendor.path} />
                <NavItem title="Vendor Register" link={Routes.RegVendors.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="Customer App Management" title="Customer App Management" icon={faChartPie}>
                <CollapsableNavItem eventKey="Customer Care Number" title="Customer Care Number">
                  <NavItem title="Add Number" link={Routes.AddCustNumber.path} />
                  <NavItem title="Customer Care Number Register" link={Routes.RegCustNum.path} />
                </CollapsableNavItem>

                <CollapsableNavItem eventKey="Reward" title="Reward">
                  <NavItem title="Add Reward" link={Routes.AddReward.path} />
                  <NavItem title="Reward Register" link={Routes.RegAddReward.path} />
                </CollapsableNavItem>

                <CollapsableNavItem eventKey="Home screen Banners" title="Home screen Banners">
                  <NavItem title="Add Banners" link={Routes.AddHomeScreenBanner.path} />
                  <NavItem title="Banners Register" link={Routes.RegHomeScreenBanner.path} />
                </CollapsableNavItem>

                <CollapsableNavItem eventKey="Category Banners" title="Category Banners">
                  <NavItem title="Add Banners" link={Routes.AddCategoryBanner.path} />
                  <NavItem title="Banners Register" link={Routes.RegCateBanner.path} />
                </CollapsableNavItem>
                <CollapsableNavItem eventKey="Promo Products" title="Promo Products">
                  <NavItem title="About Us" link={Routes.AboutUs.path} />
                  <NavItem title="Contact Us" link={Routes.ContacUs.path} />
                </CollapsableNavItem>
              </CollapsableNavItem>

              {/* Customers  Main*/}
              <CollapsableNavItem eventKey="Customers" title="Customers" icon={faChartPie}>
                <NavItem title="Pending Verification Customers" link={Routes.PendiVeriCust.path} />
                <NavItem title="Verified Customers" link={Routes.VerifiedCustomers.path} />
                <NavItem title="Rejected Customers" link={Routes.RejectedCustomers.path} />
              </CollapsableNavItem>

              {/* Sales Main */}
              <CollapsableNavItem eventKey="Sales" title="Sales" icon={faChartPie}>
                <NavItem title="Orders" link={Routes.Orders.path} />
                <NavItem title="Assign Payment and Delivery/confirmed orders" link={Routes.AsPayDelOrd.path} />
                <NavItem title="Closed Deals" link={Routes.ClosedDeals.path} />
                <NavItem title="Services Request" link={Routes.ServiceRequest.path} />
                <NavItem title="Demo Request" link={Routes.DemoRequest.path} />
              </CollapsableNavItem>

              <NavItem title="Transactions" icon={faHandHoldingUsd} link={Routes.Transactions.path} />
              <NavItem title="Settings" icon={faCog} link={Routes.Settings.path} />

              <CollapsableNavItem eventKey="tables/" title="Tables" icon={faTable}>
                <NavItem title="Bootstrap Table" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={faFileAlt}>
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem>

              <Dropdown.Divider className="my-3 border-indigo" />

              <CollapsableNavItem eventKey="documentation/" title="Getting Started" icon={faBook}>
                <NavItem title="Overview" link={Routes.DocsOverview.path} />
                <NavItem title="Download" link={Routes.DocsDownload.path} />
                <NavItem title="Quick Start" link={Routes.DocsQuickStart.path} />
                <NavItem title="License" link={Routes.DocsLicense.path} />
                <NavItem title="Folder Structure" link={Routes.DocsFolderStructure.path} />
                <NavItem title="Build Tools" link={Routes.DocsBuild.path} />
                <NavItem title="Changelog" link={Routes.DocsChangelog.path} />
              </CollapsableNavItem>
              <CollapsableNavItem eventKey="components/" title="Components" icon={faBoxOpen}>
                <NavItem title="Accordion" link={Routes.Accordions.path} />
                <NavItem title="Alerts" link={Routes.Alerts.path} />
                <NavItem title="Badges" link={Routes.Badges.path} />
                <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Routes.Buttons.path} />
                <NavItem title="Forms" link={Routes.Forms.path} />
                <NavItem title="Modals" link={Routes.Modals.path} />
                <NavItem title="Navbars" link={Routes.Navbars.path} />
                <NavItem title="Navs" link={Routes.Navs.path} />
                <NavItem title="Pagination" link={Routes.Pagination.path} />
                <NavItem title="Popovers" link={Routes.Popovers.path} />
                <NavItem title="Progress" link={Routes.Progress.path} />
                <NavItem title="Tables" link={Routes.Tables.path} />
                <NavItem title="Tabs" link={Routes.Tabs.path} />
                <NavItem title="Toasts" link={Routes.Toasts.path} />
                <NavItem title="Tooltips" link={Routes.Tooltips.path} />
              </CollapsableNavItem>
              <NavItem external title="Themesberg" link="https://themesberg.com" target="_blank" image={ThemesbergLogo} />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
