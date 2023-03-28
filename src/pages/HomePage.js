import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
// import Protected from './Protected';
import Protected from './Protected';
import RegisteredAdmin from './RegisteredAdmin';
import SettingsFormsAddPrime from './SettingsFormsAddPrime';
import PCRegister from './PCRegister';
import SettingsUpdate from './SettingsUpdate'
import AddEmployee from './AddEmployee';
import RegisteredEmployee from './RegisteredEmployee';
import PrimeCateReg from './RegSubCate';
import SubCate from './RegSubCate';
import RegSubCate from './RegSubCate';
import AddSubCate from './AddSubCate';
import AddBrand from './AddBrand';
import AddUnit from './AddUnit';
import AddProduct from './AddProduct';
import AddService from './AddService';
import RegisteredBrands from './RegisteredBrands';
import RegUnit from './RegUnit';
import RegProduct from './RegProduct';
import RegService from './RegService';
import AddVendor from './AddVendor';
import RegVendors from './RegVendors';
import AddCustNumber from './AddCustNumber';
import RegCustNum from './RegCustNum';
import AddReward from './AddReward';
import RegAddReward from './RegAddReward';
import AddHomeScreenBanner from './AddHomeScreenBanner';
import RegHomeScreenBanner from './RegHomeScreenBanner';
import AddCategoryBanner from './AddCategoryBanner';
import RegCateBanner from './RegCateBanner';
import AboutUs from './AboutUs';
import ContacUs from './ContacUs';
import PendiVeriCust from './PendiVeriCust';
import VerifiedCustomers from './VerifiedCustomers';
import RejectedCustomers from './RejectedCustomers';
import Orders from './Orders';
import AsPayDelOrd from './AsPayDelOrd';
import ClosedDeals from './ClosedDeals';
import ServiceRequest from './ServiceRequest';
import DemoRequest from './DemoRequest';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  // const [loaded, setLoaded] = useState(false);
  
  // useEffect(() => {
  //   const timer = setTimeout(() => setLoaded(true), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // const localStorageIsSettingsVisible = () => {
  //   return localStorage.getItem('settingsVisible') === 'false' ? false : true
  // }

  // const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  // const toggleSettings = () => {
    
  //   setShowSettings(!showSettings);
  //   localStorage.setItem('settingsVisible', !showSettings);
  // }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader  />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer  />
        </main>
      </>
    )}
    />
  );
};
// let showdash=true;

export default () => (

  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    {/* {showdash ? */}
    {/* <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} /> */}
    <Protected exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    {/* :null} */}
    {/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}

    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.PCRegister.path} component={PCRegister} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.SettingsFormsAddPrime.path} component={SettingsFormsAddPrime} />
    <RouteWithSidebar exact path={Routes.SettingsUpdate.path} component={SettingsUpdate} />
    <RouteWithSidebar exact path={Routes.AddEmployee.path} component={AddEmployee} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
    <RouteWithSidebar exact path={Routes.RegisteredAdmin.path} component={RegisteredAdmin} />
    <RouteWithSidebar exact path={Routes.RegisteredEmployee.path} component={RegisteredEmployee} />
    <RouteWithSidebar exact path={Routes.RegSubCate.path} component={RegSubCate} />
    <RouteWithSidebar exact path={Routes.AddSubCate.path} component={AddSubCate} />
    <RouteWithSidebar exact path={Routes.AddBrand.path} component={AddBrand} />
    <RouteWithSidebar exact path={Routes.AddUnit.path} component={AddUnit} />
    <RouteWithSidebar exact path={Routes.AddProduct.path} component={AddProduct} />
    <RouteWithSidebar exact path={Routes.AddService.path} component={AddService} />
    <RouteWithSidebar exact path={Routes.RegisteredBrands.path} component={RegisteredBrands} />
    <RouteWithSidebar exact path={Routes.RegUnit.path} component={RegUnit} />
    <RouteWithSidebar exact path={Routes.RegProduct.path} component={RegProduct} />
    <RouteWithSidebar exact path={Routes.RegService.path} component={RegService} />
    <RouteWithSidebar exact path={Routes.AddVendor.path} component={AddVendor} />
    <RouteWithSidebar exact path={Routes.RegVendors.path} component={RegVendors} />
    <RouteWithSidebar exact path={Routes.AddCustNumber.path} component={AddCustNumber} />
    <RouteWithSidebar exact path={Routes.RegCustNum.path} component={RegCustNum} />
    <RouteWithSidebar exact path={Routes.AddReward.path} component={AddReward} />
    <RouteWithSidebar exact path={Routes.RegAddReward.path} component={RegAddReward} />
    <RouteWithSidebar exact path={Routes.AddHomeScreenBanner.path} component={AddHomeScreenBanner} />
    <RouteWithSidebar exact path={Routes.RegHomeScreenBanner.path} component={RegHomeScreenBanner} />
    <RouteWithSidebar exact path={Routes.AddCategoryBanner.path} component={AddCategoryBanner} />
    <RouteWithSidebar exact path={Routes.RegCateBanner.path} component={RegCateBanner} />
    <RouteWithSidebar exact path={Routes.AboutUs.path} component={AboutUs} />
    <RouteWithSidebar exact path={Routes.ContacUs.path} component={ContacUs} />
    <RouteWithSidebar exact path={Routes.PendiVeriCust.path} component={PendiVeriCust} />
    <RouteWithSidebar exact path={Routes.VerifiedCustomers.path} component={VerifiedCustomers} />
    <RouteWithSidebar exact path={Routes.RejectedCustomers.path} component={RejectedCustomers} />
    <RouteWithSidebar exact path={Routes.Orders.path} component={Orders} />
    <RouteWithSidebar exact path={Routes.AsPayDelOrd.path} component={AsPayDelOrd} />
    <RouteWithSidebar exact path={Routes.ClosedDeals.path} component={ClosedDeals} />
    <RouteWithSidebar exact path={Routes.ServiceRequest.path} component={ServiceRequest} />
    <RouteWithSidebar exact path={Routes.DemoRequest.path} component={DemoRequest} />
    
    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

    <Redirect to={Routes.NotFound.path} />

  </Switch>
);
