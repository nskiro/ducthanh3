import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Alert } from 'antd';

import AvatarPlaceHolder from '../../../assets/images/avatar-placeholder.png';

const DeptInfo = (props) => {
    const stringMail = `mailto:${props.email}`;
    console.log(props.avatar);
    return(
        <Row className="show-grid">
            <Col xs={12} sm={2}>
                <img src={props.avatar ? props.avatar : AvatarPlaceHolder} alt="Avatar" style={{maxWidth: "100%"}} />
            </Col>
            <Col xs={12} sm={4}>
                <Alert
                    message={`${props.title} Contact Info`}
                    description={
                        <span>
                            <Row className="show-grid"><Col xs={12} sm={12}>Head of department: <b>{props.head}</b></Col></Row>
                            <Row className="show-grid"><Col xs={12} sm={12}>Email: <a href={stringMail}>{props.email}</a></Col></Row>
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
