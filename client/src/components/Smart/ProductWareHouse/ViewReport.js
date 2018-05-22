import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from '../../../hoc';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import ProductWareHouseAvatar from '../../../assets/images/dept/Warehouse.jpg';

class ViewReport extends Component {
    render(){        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Product Warehouse Report</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <DeptInfo
                            avatar = {ProductWareHouseAvatar}
                            title="Product Warehouse"
                            head = "Mr. Nguyen Lam"
                            email = "thanhnguyen@ducthanh3.com.vn"
                            mobile = "01639883217"
                        />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default ViewReport;