import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Select, message, Form, Checkbox,Collapse } from 'antd';
import DataGrid from 'react-data-grid';

import Aux from '../../../hoc';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import PlanningAvatar from '../../../assets/images/dept/kehoach.png';

const Option = Select.Option;
const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Production extends Component {
    state = {
        dataSource: [],
        files: [],
        columns: [
            {key: 'poIssued', name: 'PO Issued', resizable: true, visible: false},
            {key: 'shipBy', name: 'Ship By', resizable: true, visible: false},
            {key: 'order', name: 'Order', resizable: true, visible: true,width: 150},
            {key: 'po', name: 'PO', resizable: true, visible: true},
            {key: 'line', name: 'Line', resizable: true, visible: true},
            {key: 'destination', name: 'Destination', resizable: true, visible: false},
            {key: 'sku', name: 'SKU', resizable: true, visible: false},
            {key: 'description', name: 'Description', resizable: true, visible: true},
            {key: 'hangTheu', name: 'Hang Theu', resizable: true, visible: false},
            {key: 'orderQty', name: 'Order Qty', resizable: true, visible: false},
            {key: 'factoryQty', name: 'Factory Qty', resizable: true, visible: false},
            {key: 'ebFactoryQty', name: 'Eb Factory Qty', resizable: true, visible: false},
            {key: 'originalDueDate', name: 'Original Due Date', resizable: true, visible: false},
            {key: 'exFtyDate', name: 'Ex FTY Date', resizable: true, visible: false},
            {key: 'ebExFtyDate', name: 'Eb Ex FTY Date', resizable: true, visible: false},
            {key: 'letterReleaseDate', name: 'Letter Release Date', resizable: true, visible: false},
            {key: 'bookingSentDate', name: 'Booking Sent Date', resizable: true, visible: false},
            {key: 'bookingConfirmationDate', name: 'Booking Confirmation Date', resizable: true, visible: false},
            {key: 'etdFactory', name: 'ETD Factory', resizable: true, visible: false},
            {key: 'etdVietNam', name: 'ETD Viet Nam', resizable: true, visible: false},
            {key: 'bolDate', name: 'BOL Date', resizable: true, visible: false},
            {key: 'etaDate', name: 'ETA Date', resizable: true, visible: false},
            {key: 'xContainer', name: 'X Container', resizable: true, visible: false},
            {key: 'containerNum', name: 'Container Num', resizable: true, visible: false},
            {key: 'vnInvoice', name: 'Vn Invoice', resizable: true, visible: false},
            {key: 'serialnumber', name: 'SERIALNUMBER', resizable: true, visible: false},
            {key: 'cartons', name: 'CARTONS', resizable: true, visible: false},
            {key: 'factoryNotes', name: 'Factory Notes', resizable: true, visible: false},
            {key: 'ergobabyNotes', name: 'Ergobaby Notes', resizable: true, visible: false},
            {key: 'productGroup', name: 'Product Group', resizable: true, visible: false},
            {key: 'type', name: 'TYPE', resizable: true, visible: false},
            {key: 'country', name: 'Country', resizable: true, visible: true},
            {key: 'factory', name: 'Factory', resizable: true, visible: false},
            {key: 'packingInstruction', name: 'Packing Instruction', resizable: true, visible: false},
            {key: 'totalFabricStatus', name: 'Total Fabric Status', resizable: true, visible: false},
            {key: 'vaiChinh', name: 'Vai Chinh', resizable: true, visible: false},
            {key: 'dmVaiChinh', name: 'DM Vai Chinh', resizable: true, visible: false},
            {key: 'slVaiChinh', name: 'SL Vai Chinh', resizable: true, visible: false},
            {key: 'ttVaiChinh', name: 'TT Vai Chinh', resizable: true, visible: false},
            {key: 'vaiVien', name: 'Vai Vien', resizable: true, visible: false},
            {key: 'dmVaiVien', name: 'DM Vai Vien', resizable: true, visible: false},
            {key: 'slVaiVien', name: 'SL Vai Vien', resizable: true, visible: false},
            {key: 'ttVaiVien', name: 'TT Vai Vien', resizable: true, visible: false},
            {key: 'luoiNho', name: 'Luoi Nho', resizable: true, visible: false},
            {key: 'dmLuoiNho', name: 'DM Luoi Nho', resizable: true, visible: false},
            {key: 'slLuoiNho', name: 'SL Luoi Nho', resizable: true, visible: false},
            {key: 'ttLuoiNho', name: 'TT Luoi Nho', resizable: true, visible: false},
            {key: 'luoiLon', name: 'Luoi Lon', resizable: true, visible: false},
            {key: 'dmLuoiLon', name: 'DM Luoi Lon', resizable: true, visible: false},
            {key: 'slLuoiLon', name: 'SL Luoi Lon', resizable: true, visible: false},
            {key: 'ttLuoiLon', name: 'TT Luoi Lon', resizable: true, visible: false},
            {key: 'vaiLot1', name: 'Vai Lot 1', resizable: true, visible: false},
            {key: 'dmVaiLot1', name: 'DM Vai Lot 1', resizable: true, visible: false},
            {key: 'slVaiLot1', name: 'SL Vai Lot 1', resizable: true, visible: false},
            {key: 'ttVaiLot1', name: 'TT Vai Lot 1', resizable: true, visible: false},
            {key: 'vaiLot2', name: 'Vai Lot 2', resizable: true, visible: false},
            {key: 'dmVaiLot2', name: 'DM Vai Lot 2', resizable: true, visible: false},
            {key: 'slVaiLot2', name: 'SL Vai Lot 2', resizable: true, visible: false},
            {key: 'ttVaiLot2', name: 'TT Vai Lot 2', resizable: true, visible: false},
            {key: 'vaiLot3', name: 'Vai Lot 3', resizable: true, visible: false},
            {key: 'dmVaiLot3', name: 'DM Vai Lot 3', resizable: true, visible: false},
            {key: 'slVaiLot3', name: 'SL Vai Lot 3', resizable: true, visible: false},
            {key: 'ttVaiLot3', name: 'TT Vai Lot 3', resizable: true, visible: false},
            {key: 'vaiLot4', name: 'Vai Lot 4', resizable: true, visible: false},
            {key: 'dmVaiLot4', name: 'DM Vai Lot 4', resizable: true, visible: false},
            {key: 'slVaiLot4', name: 'SL Vai Lot 4', resizable: true, visible: false},
            {key: 'ttVaiLot4', name: 'TT Vai Lot 4', resizable: true, visible: false},
            {key: 'vaiLot5', name: 'Vai Lot 5', resizable: true, visible: false},
            {key: 'dmVaiLot5', name: 'DM Vai Lot 5', resizable: true, visible: false},
            {key: 'slVaiLot5', name: 'SL Vai Lot 5', resizable: true, visible: false},
            {key: 'ttVaiLot5', name: 'TT Vai Lot 5', resizable: true, visible: false},
            {key: 'vaiLot6', name: 'Vai Lot 6', resizable: true, visible: false},
            {key: 'dmVaiLot6', name: 'DM Vai Lot 6', resizable: true, visible: false},
            {key: 'slVaiLot6', name: 'SL Vai Lot 6', resizable: true, visible: false},
            {key: 'ttVaiLot6', name: 'TT Vai Lot 6', resizable: true, visible: false},
            {key: 'buckle', name: 'Buckle', resizable: true, visible: false},
            {key: 'nhan', name: 'Nhan', resizable: true, visible: false},
            {key: 'hop', name: 'Hop', resizable: true, visible: false},
            {key: 'nut', name: 'Nut', resizable: true, visible: false},
            {key: 'phuLieuKhac', name: 'Phu Lieu Khac', resizable: true, visible: false}
        ]
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

    onCheckedChange = (e) => {
        const value = e.target.value;
        let temp = [...this.state.columns];
        _.forEach(temp, (obj) => {
            if(_.lowerCase(obj.key).includes(_.lowerCase(value)))
                obj.visible = e.target.checked;
        });
        this.setState({columns: temp});
    }

    rowGetter = (i) => {
        return this.state.dataSource[i];
    };

    render(){
        const {dataSource, columns} = this.state;
        const visibleColumns = _.filter(columns, (o)=>{
            return o.visible;
        });

        const arrCol = _.compact(['POIssued','ShipBy','Order','PO','Line','Destination','SKU','Description','Hang Theu','Qty','','','OriginalDueDate','ExFTYDate','','LetterReleaseDate','BookingSentDate','BookingConfirmationDate','ETDFactory','ETDVietNam','BOLDate','ETADate','XContainer','ContainerNum','VnInvoice','SERIALNUMBER','CARTONS','Notes','','ProductGroup','TYPE','Country','Factory','PackingInstruction','TotalFabricStatus','VaiChinh','DMVaiChinh','SLVaiChinh','TTVaiChinh','VaiVien','DMVaiVien','SLVaiVien','TTVaiVien','LuoiNho','DMLuoiNho','SLLuoiNho','TTLuoiNho','LuoiLon','DMLuoiLon','SLLuoiLon','TTLuoiLon','VaiLot1','DMVaiLot1','SLVaiLot1','TTVaiLot1','VaiLot2','DMVaiLot2','SLVaiLot2','TTVaiLot2','VaiLot3','DMVaiLot3','SLVaiLot3','TTVaiLot3','VaiLot4','DMVaiLot4','SLVaiLot4','TTVaiLot4','VaiLot5','DMVaiLot5','SLVaiLot5','TTVaiLot5','VaiLot6','DMVaiLot6','SLVaiLot6','TTVaiLot6','Buckle','Nhan','Hop','Nut','PhuLieuKhac']);
        const newArrCol = arrCol.map((rec) => {
            return <Col xs={6} sm={3}><Checkbox value={_.camelCase(rec)} onChange={this.onCheckedChange}>{_.startCase(rec)}</Checkbox></Col>;
        });

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
                <Form layout="inline">
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
                        <Collapse defaultActiveKey={['1']}>
                            <Panel header="Select column(s) to show" key="1">
                                <Row>
                                    {newArrCol}
                                </Row>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
                <Row style={{marginTop: '5px'}}>
                    <Col xs={12} sm={12}>
                        <DataGrid
                            columns={visibleColumns}
                            rowGetter={this.rowGetter}
                            rowsCount={dataSource.length}
                            minHeight={500}
                            resizeable />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Production;