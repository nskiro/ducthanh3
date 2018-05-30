import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-bootstrap';

import cmConfig from '../../../CommonConfig';
import Aux from '../../../hoc';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import PlanningAvatar from '../../../assets/images/dept/kehoach.png';

class Production extends Component {
    state = {
        dataSource: []
    }
    componentDidMount(){
        axios.get('/api/planning/production')
        .then((res) => {
            console.log(res.data);
            this.setState({dataSource: res.data});
        })
        .catch((err)=> {
            console.log(err);
        });
    }

    render(){
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Production Planning</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <DeptInfo 
                            title="Planning"
                            avatar={PlanningAvatar}
                            head = "Ms Thanh"
                            email = "nguyenthanh@ducthanh3.com.vn"
                            mobile = "01.208.308.959"
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        
                    </Col>
                </Row>
                <Row style={{marginTop: '5px'}}>
                    <Col xs={12} sm={12}>
                        
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Production;