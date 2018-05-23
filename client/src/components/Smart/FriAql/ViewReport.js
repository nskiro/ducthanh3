import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from '../../../hoc';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';
import QaAvatar from '../../../assets/images/dept/QC QA.jpg';

class ViewReport extends Component {
    render(){        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>FRI-AQL Report</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                    <DeptInfo 
                            title="FRI - AQL"
                            avatar={QaAvatar}
                            head = "Mr. Phong Phan"
                            email = "phanphong@ducthanh3.com.vn"
                            mobile = "0974986555"
                        />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default ViewReport;