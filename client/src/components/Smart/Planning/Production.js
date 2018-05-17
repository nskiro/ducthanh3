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

let sources = {
    datatype: 'array',
    localdata: [],
    id: "_id",
    datafields: [
        {name: "_id", type: "string"},
        {format: "mm/dd/yyyy", name: "poIssued", type: "date"},
        {format: "mm/dd", name: "shipBy", type: "date"},
        {name: "order", type: "string"},
        {name: "po", type: "number"},
        {name: "line", type: "number"},
        {name: "destination", type: "string"},
        {name: "sku", type: "string"},
        {name: "description", type: "string"},
        {name: "hangTheu", type: "string"},
        {name: "originalQty", type: "number"},
        {name: "factoryQty", type: "number"},
        {format: "mm/dd", name: "originalDueDate", type: "date"},
        {format: "mm/dd", name: "exFtyDate", type: "date"},
        {format: "mm/dd", name: "ebExFtyDate", type: "date"},
        {name: "ebFactoryQty", type: "number"},
        {format: "mm/dd", name: "letterReleaseDate", type: "date"},
        {format: "mm/dd", name: "bookingSentDate", type: "date"},
        {format: "mm/dd", name: "bookingConfirmationDate", type: "date"},
        {format: "mm/dd", name: "etdFactory", type: "date"},
        {format: "mm/dd", name: "etdVietNam", type: "date"},
        {format: "mm/dd", name: "bolDate", type: "date"},
        {format: "mm/dd", name: "etaDate", type: "date"},
        {name: "xContainer", type: "number"},
        {name: "containerNum", type: "number"},
        {name: "vnInvoice", type: "number"},
        {name: "serialnumber", type: "number"},
        {name: "cartons", type: "number"},
        {name: "factoryNotes", type: "string"},
        {name: "ergobabyNotes", type: "string"},
        {name: "productGroup", type: "string"},
        {name: "type", type: "string"},
        {name: "country", type: "string"},
        {name: "factory", type: "string"},
        {name: "packingInstruction", type: "string"},
        {name: "totalFabricStatus", type: "string"},
        {name: "vaiChinh", type: "string"},
        {name: "dmVaiChinh", type: "float"},
        {name: "slVaiChinh", type: "float"},
        {name: "ttVaiChinh", type: "string"},
        {name: "vaiLot", type: "string"},
        {name: "dmVaiLot", type: "float"},
        {name: "slVaiLot", type: "float"},
        {name: "ttVaiLot", type: "string"},
        {name: "vaiVien", type: "string"},
        {name: "dmVaiVien", type: "float"},
        {name: "slVaiVien", type: "float"},
        {name: "ttVaiVien", type: "string"},
        {name: "luoiNho", type: "string"},
        {name: "dmLuoiNho", type: "float"},
        {name: "slLuoiNho", type: "float"},
        {name: "ttLuoiNho", type: "string"},
        {name: "luoiLon", type: "string"},
        {name: "dmLuoiLon", type: "float"},
        {name: "slLuoiLon", type: "float"},
        {name: "ttLuoiLon", type: "string"},
        {name: "vaiLot1", type: "string"},
        {name: "dmVaiLot1", type: "float"},
        {name: "slVaiLot1", type: "float"},
        {name: "ttVaiLot1", type: "string"},
        {name: "vaiLot2", type: "string"},
        {name: "dmVaiLot2", type: "float"},
        {name: "slVaiLot2", type: "float"},
        {name: "ttVaiLot2", type: "string"},
        {name: "vaiLot3", type: "string"},
        {name: "dmVaiLot3", type: "float"},
        {name: "slVaiLot3", type: "float"},
        {name: "ttVaiLot3", type: "string"},
        {name: "vaiLot4", type: "string"},
        {name: "dmVaiLot4", type: "float"},
        {name: "slVaiLot4", type: "float"},
        {name: "ttVaiLot4", type: "string"},
        {name: "vaiLot5", type: "string"},
        {name: "dmVaiLot5", type: "float"},
        {name: "slVaiLot5", type: "float"},
        {name: "ttVaiLot5", type: "string"},
        {name: "buckle", type: "string"},
        {name: "nhan", type: "string"},
        {name: "hop", type: "string"},
        {name: "nut", type: "string"},
        {name: "phuLieuKhac", type: "string"}
    ]
};

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
            sources.localdata = res.data;
            this.refs.gridProductionPlanning.updatebounddata('cells');
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