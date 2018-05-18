import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-bootstrap';
import { Select, message, Form } from 'antd';

import cmConfig from '../../../CommonConfig';
import Aux from '../../../hoc';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import PlanningAvatar from '../../../assets/images/dept/kehoach.png';

const Option = Select.Option;
const FormItem = Form.Item;

class Production extends Component {
    state = {
        dataSource: [],
        files: []
    }
    componentDidMount(){
        axios.get('/api/planning/production')
        .then((res) => {
            if(res.data.length > 0){
                message.success('Files found. Please select report file');
                this.setState({files: res.data});
            }
            else{
                message.warning('No files found');
            }
        })
        .catch((err)=> {

        });
    }

    handleFileChange = (value) => {
        axios.get(`/api/planning/production/${value}`)
        .then((res) => {
            this.setState({dataSource: res.data});
        })
        .catch((err)=> {

        });
    }

    render(){
        let optionProductionFile = null;
        if(this.state.files.length > 0){
            optionProductionFile = this.state.files.map((rec) => {
                return <Option value={rec.name} key={rec.name}>{rec.name}</Option>;
            });
        }

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
                <Form>
                    <FormItem label="Choose file">
                        <Select
                            showSearch
                            style={{ width: 650 }}
                            placeholder = "Select production planning file"
                            RadioFilterProp = "children"
                            onSelect = {this.handleFileChange}
                            filterRadio = {(input, Radio) => Radio.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {optionProductionFile}
                        </Select>
                    </FormItem>
                </Form>
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