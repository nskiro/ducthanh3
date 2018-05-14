import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Alert } from 'antd';

import AvatarPlaceHolder from '../../../assets/images/avatar-placeholder.png';

const DeptInfo = (props) => {
    return(
        <Row className="show-grid">
            <Col xs={12} sm={2}>
                <img src={props.avatar !== null ? props.avatar : AvatarPlaceHolder} alt="Avatar" style={{maxWidth: "100%"}} />
            </Col>
            <Col xs={12} sm={4}>
                <Alert
                    message={`${props.title} Contact Info`}
                    description={
                        <span>
                            <Row className="show-grid"><Col xs={12} sm={12}>Head of department: <b>{props.head}</b></Col></Row>
                            <Row className="show-grid"><Col xs={12} sm={12}>Email: {props.email}</Col></Row>
                            <Row className="show-grid"><Col xs={12} sm={12}>Mobile: {props.mobile}</Col></Row>
                        </span>
                    }
                    type="info"
                    showIcon
                />
            </Col>
        </Row>
    );
}

export default DeptInfo;
