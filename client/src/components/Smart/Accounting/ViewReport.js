import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from '../../../hoc';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import AccountantAvatar from '../../../assets/images/dept/acc.jpg';

class ViewReport extends Component {
    render(){        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Accountant Report</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <DeptInfo
                            avatar = {AccountantAvatar}
                            title="Accountant"
                            head = "Ms. Loi Huynh"
                            email = "huynhloi@ducthanh3.com.vn"
                            mobile = "0943996969"
                        />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default ViewReport;