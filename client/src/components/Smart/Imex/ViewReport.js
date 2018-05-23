import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from '../../../hoc';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import ImexAvatar from '../../../assets/images/dept/imex.jpg';

class ViewReport extends Component {
    render(){        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Import - Export Report</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <DeptInfo
                            avatar = {ImexAvatar}
                            title="Import - Export"
                            head = "Mr. Thanh Huynh"
                            email = "phuocthanh@ducthanh3.com.vn"
                            mobile = "01299019179"
                        />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default ViewReport;