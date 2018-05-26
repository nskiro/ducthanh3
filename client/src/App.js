import React, { Component } from 'react';
import { Route, Switch,withRouter, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import cmConfig from './CommonConfig';

import LoginPage from './components/Smart/Login/Login';
import Logout from './components/Smart/Logout/Logout';
import HomePage from './components/Dumb/Home/Home';
import Header from './components/Dumb/Header';
import ComingSoon from './components/Dumb/ComingSoon';

// Planning
import UploadPlanningPage from './components/Smart/Planning/UploadFile';
import ProductionPlanningPage from './components/Smart/Planning/Production';
import BookingChartPage from './components/Smart/Planning/Booking';
import ShippingSchedulePage from './components/Smart/Planning/Shipping';
import EmbroideryPlanningPage from './components/Smart/Planning/EmbroideryPlanning';
// Factory Operation
import ViewFOReport from './components/Smart/FactoryOperation/ViewReport';
// Im -Ex
import ViewImexReport from './components/Smart/Imex/ViewReport';

//Product Warehouse
import ViewProductWarehouseReport from './components/Smart/ProductWareHouse/ViewReport';

//Accounting
import ViewAccountingReport from './components/Smart/Accounting/ViewReport';

// Compliance
import UploadCompliancePage from './components/Smart/Compliance/UploadFile';
import GeneralCompliancePage from './components/Smart/Compliance/General';
import HumidityPage from './components/Smart/Compliance/Humidity';
import MetalPage from './components/Smart/Compliance/Metal';

//Fabric QC
import UploadFabricQCPage from './components/Smart/FabricQC/UploadFile';
import ViewFabricQcReport from './components/Smart/FabricQC/ViewReport';

//QA
import UploadQaPage from './components/Smart/Qa/UploadFile';
import ViewQaReport from './components/Smart/Qa/ViewReport';
// Marker
import UploadMarkerPage from './components/Smart/Marker/UploadFile';
import ViewMarkerReport from './components/Smart/Marker/ViewReport';
// Sample
import UploadSamplePage from './components/Smart/Sample/UploadFile';
import ViewSampleReport from './components/Smart/Sample/ViewReport';
// Cutting
import UploadCuttingPage from './components/Smart/Cutting/UploadFile';
import ViewCuttingReport from './components/Smart/Cutting/ViewReport';
// Numbering
import UploadNumberingPage from './components/Smart/Numbering/UploadFile';
import ViewNumberingReport from './components/Smart/Numbering/ViewReport';
// Production
import UploadProductionPage from './components/Smart/Production/UploadFile';
import ViewProductionReport from './components/Smart/Production/ViewReport';
// Packaging
import UploadPackagingPage from './components/Smart/Packaging/UploadFile';
import ViewPackagingReport from './components/Smart/Packaging/ViewReport';
// Embroidery
import UploadEmbroideryPage from './components/Smart/Embroidery/UploadFile';
import ViewEmbroideryReport from './components/Smart/Embroidery/ViewReport';

//Trim
import UploadTrimPage from './components/Smart/Trim/UploadFile';
import TrimInputPage from './components/Smart/Trim/Input';
import TrimQaPage from './components/Smart/Trim/Qa';

//AQL
import UploadAqlPage from './components/Smart/Aql/UploadFile';
import ViewAqlReport from './components/Smart/Aql/ViewReport';

//Administration
import UploadAdministrationPage from './components/Smart/Administration/UploadFile';
import ViewAdministrationReport from './components/Smart/Administration/ViewReport';

//Sewing Plan
import UploadSewingPlanPage from './components/Smart/SewingPlan/UploadFile';
import ViewSewingPlanReport from './components/Smart/SewingPlan/ViewReport';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/' component={LoginPage} exact />
        <Redirect to='/' />
      </Switch>
    );
    const token = localStorage.getItem('token');
    if(token && cmConfig.verifyToken(token)){
      routes = (
        <Grid fluid={true}>
          <Row className="show-grid" style={{marginBottom: '5px'}}>
              <Route path='/' component={Header} />
          </Row>
          <Row className="show-grid" style={{padding: "15px", background: "#f8f8f8"}}>
            <Col sm={12} md={12}>
              <Switch>
                <Route path='/production/viewreport' component={ViewProductionReport} exact />
                <Route path='/production/upload' component={UploadProductionPage} exact />
                <Route path='/packaging/viewreport' component={ViewPackagingReport} exact />
                <Route path='/packaging/upload' component={UploadPackagingPage} exact />
                <Route path='/embroidery/viewreport' component={ViewEmbroideryReport} exact />
                <Route path='/embroidery/upload' component={UploadEmbroideryPage} exact />
                <Route path='/sample/viewreport' component={ViewSampleReport} exact />
                <Route path='/sample/upload' component={UploadSamplePage} exact />
                <Route path='/fabricQc/upload' component={UploadFabricQCPage} exact />
                <Route path='/fabricQc/viewreport' component={ViewFabricQcReport} exact />
                <Route path='/cutting/viewreport' component={ViewCuttingReport} exact />
                <Route path='/cutting/upload' component={UploadCuttingPage} exact />
                <Route path='/numbering/viewreport' component={ViewNumberingReport} exact />
                <Route path='/numbering/upload' component={UploadNumberingPage} exact />
                <Route path='/marker/viewreport' component={ViewMarkerReport} exact />
                <Route path='/marker/upload' component={UploadMarkerPage} exact />
                <Route path='/qaqc/viewreport' component={ViewQaReport} exact />
                <Route path='/qaqc/upload' component={UploadQaPage} exact />
                <Route path='/aql/upload' component={UploadAqlPage} exact />
                <Route path='/aql/viewreport' component={ViewAqlReport} exact />
                <Route path='/planning/upload' component={UploadPlanningPage} exact />
                <Route path='/planning/production' component={ProductionPlanningPage} exact />
                <Route path='/planning/booking' component={BookingChartPage} exact />
                <Route path='/planning/shipping' component={ShippingSchedulePage} exact />
                <Route path='/planning/embroidery' component={EmbroideryPlanningPage} exact />
                <Route path='/compliance/upload' component={UploadCompliancePage} exact />
                <Route path='/compliance/general' component={GeneralCompliancePage} exact />
                <Route path='/compliance/humidity' component={HumidityPage} exact />
                <Route path='/compliance/metal' component={MetalPage} exact />
                <Route path='/trim/upload' component={UploadTrimPage} exact />
                <Route path='/trim/input' component={TrimInputPage} exact />
                <Route path='/trim/qa' component={TrimQaPage} exact />
                <Route path='/sewingplan/upload' component={UploadSewingPlanPage} exact />
                <Route path='/sewingplan/viewreport' component={ViewSewingPlanReport} exact />
                <Route path='/administration/upload' component={UploadAdministrationPage} exact />
                <Route path='/administration/viewreport' component={ViewAdministrationReport} exact />
                <Route path='/imex/viewreport' component={ViewImexReport} exact />
                <Route path='/productWarehouse' component={ViewProductWarehouseReport} exact />
                <Route path='/accounting' component={ViewAccountingReport} exact />
                <Route path='/factoryOperation' component={ViewFOReport} exact />
                <Route path='/logout' component={Logout} exact />
                <Route path='/404' component={ComingSoon} exact />
                <Route path='/' component={HomePage} exact />
                <Redirect to='/404' />
              </Switch>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <footer style={{textAlign: 'center', color: '#767676'}}>Copyright © Duc Thanh Garment Import - Export Co., LTD 2018</footer>
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
