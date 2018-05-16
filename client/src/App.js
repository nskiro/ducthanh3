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
//QA
import UploadQaPage from './components/Smart/Qa/UploadFile';
import ViewQaReport from './components/Smart/Qa/ViewReport';
// Marker
import UploadMarkerPage from './components/Smart/Marker/UploadFile';
import ViewMarkerReport from './components/Smart/Marker/ViewReport';
// Sample
import UploadSamplePage from './components/Smart/Sample/UploadFile';
import ViewSampleReport from './components/Smart/Sample/ViewReport';
// Production
import UploadProductionPage from './components/Smart/Production/UploadFile';
import ViewProductionReport from './components/Smart/Production/ViewReport';
// Packaging
import UploadPackagingPage from './components/Smart/Packaging/UploadFile';
import ViewPackagingReport from './components/Smart/Packaging/ViewReport';
// Embroidery
import UploadEmbroideryPage from './components/Smart/Embroidery/UploadFile';
import ViewEmbroideryReport from './components/Smart/Embroidery/ViewReport';

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
                <Route path='/marker/viewreport' component={ViewMarkerReport} exact />
                <Route path='/marker/upload' component={UploadMarkerPage} exact />
                <Route path='/qaqc/viewreport' component={ViewQaReport} exact />
                <Route path='/qaqc/upload' component={UploadQaPage} exact />
                <Route path='/planning/upload' component={UploadPlanningPage} exact />
                <Route path='/planning/production' component={ProductionPlanningPage} exact />
                <Route path='/logout' component={Logout} exact />
                <Route path='/404' component={ComingSoon} exact />
                <Route path='/' component={HomePage} exact />
                <Redirect to='/404' />
              </Switch>
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
