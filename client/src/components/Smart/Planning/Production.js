import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Select, message, Form, Checkbox,Collapse } from 'antd';
import DataGrid from 'react-data-grid';
import { Toolbar, Data, Filters } from 'react-data-grid-addons';

import Aux from '../../../hoc';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import PlanningAvatar from '../../../assets/images/dept/kehoach.png';

const Option = Select.Option;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Selectors = Data.Selectors;
const MultiSelectFilter = Filters.MultiSelectFilter;
const AutoCompleteFilter = Filters.AutoCompleteFilter;

class Production extends Component {
    state = {
        rows: [],
        filters: {},
        files: [],
        columns: [
            {key: 'poIssued', name: 'PO Issued', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'shipBy', name: 'Ship By', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'order', name: 'Order', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true,width: 150},
            {key: 'po', name: 'PO', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true},
            {key: 'line', name: 'Line', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true},
            {key: 'destination', name: 'Destination', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'sku', name: 'SKU', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'description', name: 'Description', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true},
            {key: 'hangTheu', name: 'Hang Theu', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'originalQty', name: 'Original Qty', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true},
            {key: 'factoryQty', name: 'Factory Qty', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true},
            {key: 'ebFactoryQty', name: 'Eb Factory Qty', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true},
            {key: 'originalDueDate', name: 'Original Due Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'exFtyDate', name: 'Ex FTY Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'ebExFtyDate', name: 'Eb Ex FTY Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'letterReleaseDate', name: 'Letter Release Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'bookingSentDate', name: 'Booking Sent Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'bookingConfirmationDate', name: 'Booking Confirmation Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'etdFactory', name: 'ETD Factory', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'etdVietNam', name: 'ETD Viet Nam', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'bolDate', name: 'BOL Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'etaDate', name: 'ETA Date', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'xContainer', name: 'X Container', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'containerNum', name: 'Container Num', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'vnInvoice', name: 'Vn Invoice', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'serialnumber', name: 'SERIALNUMBER', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'cartons', name: 'CARTONS', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'productGroup', name: 'Product Group', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'type', name: 'TYPE', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'country', name: 'Country', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: true},
            {key: 'factory', name: 'Factory', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'packingInstruction', name: 'Packing Instruction', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'totalFabricStatus', name: 'Total Fabric Status', filterable: true, filterRenderer: MultiSelectFilter,  resizable: true, visible: false},
            {key: 'vaiChinh', name: 'Vai Chinh', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiChinh', name: 'DM Vai Chinh', filterable: true, resizable: true, visible: false},
            {key: 'slVaiChinh', name: 'SL Vai Chinh', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiChinh', name: 'TT Vai Chinh', filterable: true, resizable: true, visible: false},
            {key: 'vaiVien', name: 'Vai Vien', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiVien', name: 'DM Vai Vien', filterable: true, resizable: true, visible: false},
            {key: 'slVaiVien', name: 'SL Vai Vien', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiVien', name: 'TT Vai Vien', filterable: true, resizable: true, visible: false},
            {key: 'luoiNho', name: 'Luoi Nho', filterable: true, resizable: true, visible: false},
            {key: 'dmLuoiNho', name: 'DM Luoi Nho', filterable: true, resizable: true, visible: false},
            {key: 'slLuoiNho', name: 'SL Luoi Nho', filterable: true, resizable: true, visible: false},
            {key: 'ttLuoiNho', name: 'TT Luoi Nho', filterable: true, resizable: true, visible: false},
            {key: 'luoiLon', name: 'Luoi Lon', filterable: true, resizable: true, visible: false},
            {key: 'dmLuoiLon', name: 'DM Luoi Lon', filterable: true, resizable: true, visible: false},
            {key: 'slLuoiLon', name: 'SL Luoi Lon', filterable: true, resizable: true, visible: false},
            {key: 'ttLuoiLon', name: 'TT Luoi Lon', filterable: true, resizable: true, visible: false},
            {key: 'vaiLot1', name: 'Vai Lot 1', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiLot1', name: 'DM Vai Lot 1', filterable: true, resizable: true, visible: false},
            {key: 'slVaiLot1', name: 'SL Vai Lot 1', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiLot1', name: 'TT Vai Lot 1', filterable: true, resizable: true, visible: false},
            {key: 'vaiLot2', name: 'Vai Lot 2', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiLot2', name: 'DM Vai Lot 2', filterable: true, resizable: true, visible: false},
            {key: 'slVaiLot2', name: 'SL Vai Lot 2', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiLot2', name: 'TT Vai Lot 2', filterable: true, resizable: true, visible: false},
            {key: 'vaiLot3', name: 'Vai Lot 3', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiLot3', name: 'DM Vai Lot 3', filterable: true, resizable: true, visible: false},
            {key: 'slVaiLot3', name: 'SL Vai Lot 3', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiLot3', name: 'TT Vai Lot 3', filterable: true, resizable: true, visible: false},
            {key: 'vaiLot4', name: 'Vai Lot 4', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiLot4', name: 'DM Vai Lot 4', filterable: true, resizable: true, visible: false},
            {key: 'slVaiLot4', name: 'SL Vai Lot 4', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiLot4', name: 'TT Vai Lot 4', filterable: true, resizable: true, visible: false},
            {key: 'vaiLot5', name: 'Vai Lot 5', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiLot5', name: 'DM Vai Lot 5', filterable: true, resizable: true, visible: false},
            {key: 'slVaiLot5', name: 'SL Vai Lot 5', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiLot5', name: 'TT Vai Lot 5', filterable: true, resizable: true, visible: false},
            {key: 'vaiLot6', name: 'Vai Lot 6', filterable: true, resizable: true, visible: false},
            {key: 'dmVaiLot6', name: 'DM Vai Lot 6', filterable: true, resizable: true, visible: false},
            {key: 'slVaiLot6', name: 'SL Vai Lot 6', filterable: true, resizable: true, visible: false},
            {key: 'ttVaiLot6', name: 'TT Vai Lot 6', filterable: true, resizable: true, visible: false},
            {key: 'buckle', name: 'Buckle', filterable: true, resizable: true, visible: false},
            {key: 'nhan', name: 'Nhan', filterable: true, resizable: true, visible: false},
            {key: 'hop', name: 'Hop', filterable: true, resizable: true, visible: false},
            {key: 'nut', name: 'Nut', filterable: true, resizable: true, visible: false},
            {key: 'phuLieuKhac', name: 'Phu Lieu Khac', filterable: true, resizable: true, visible: false},
            {key: 'factoryNotes', name: 'Factory Notes', filterable: true, resizable: true, visible: false},
            {key: 'ergobabyNotes', name: 'Ergobaby Notes', filterable: true, resizable: true, visible: false}
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
            this.setState({rows: res.data});
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

    rowGetter = (index) => {
        return Selectors.getRows(this.state)[index];
    };
    
    rowsCount = () => {
        return Selectors.getRows(this.state).length;
    };
    
    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
          newFilters[filter.column.key] = filter;
        } else {
          delete newFilters[filter.column.key];
        }
        this.setState({ filters: newFilters });
    };
    
    getValidFilterValues = (columnId) => {
        let values = this.state.rows.map(r => r[columnId]);
        return values.filter((item, i, a) => { return i === a.indexOf(item); });
    };
    
    handleOnClearFilters = () => {
        this.setState({ filters: {} });
    };

    render(){
        const {rows, columns} = this.state;

        const visibleColumns = _.filter(columns, (o)=>{
            return o.visible;
        });

        const arrCol = [{
            key: 'POIssued',
            type: 'general'
          },{
            key: 'ShipBy',
            type: 'general'
          },{
            key: 'Destination',
            type: 'general'
          },{
            key: 'SKU',
            type: 'general'
          },{
            key: 'Hang Theu',
            type: 'general'
          },{
            key: 'OriginalDueDate',
            type: 'general'
          },{
            key: 'ExFTYDate',
            type: 'general'
          },{
            key: 'Notes',
            type: 'general'
          },{
            key: 'ProductGroup',
            type: 'general'
          },{
            key: 'TYPE',
            type: 'general'
          },{
            key: 'Factory',
            type: 'general'
          },{
            key: 'PackingInstruction',
            type: 'general'
          },{
            key: 'LetterReleaseDate',
            type: 'shippingStatus'
          },{
            key: 'BookingSentDate',
            type: 'shippingStatus'
          },{
            key: 'BookingConfirmationDate',
            type: 'shippingStatus'
          },{
            key: 'ETDFactory',
            type: 'shippingStatus'
          },{
            key: 'ETDVietNam',
            type: 'shippingStatus'
          },{
            key: 'BOLDate',
            type: 'shippingStatus'
          },{
            key: 'ETADate',
            type: 'shippingStatus'
          },{
            key: 'XContainer',
            type: 'shippingStatus'
          },{
            key: 'ContainerNum',
            type: 'shippingStatus'
          },{
            key: 'VnInvoice',
            type: 'shippingStatus'
          },{
            key: 'SERIALNUMBER',
            type: 'shippingStatus'
          },{
            key: 'CARTONS',
            type: 'shippingStatus'
          },{
            key: 'TotalFabricStatus',
            type: 'fabric'
          },{
            key: 'VaiChinh',
            type: 'fabric'
          },{
            key: 'VaiVien',
            type: 'fabric'
          },{
            key: 'LuoiNho',
            type: 'fabric'
          },{
            key: 'LuoiLon',
            type: 'fabric'
          },{
            key: 'VaiLot1',
            type: 'fabric'
          },{
            key: 'VaiLot2',
            type: 'fabric'
          },{
            key: 'VaiLot3',
            type: 'fabric'
          },{
            key: 'VaiLot4',
            type: 'fabric'
          },{
            key: 'VaiLot5',
            type: 'fabric'
          },{
            key: 'VaiLot6',
            type: 'fabric'
          },{
            key: 'Buckle',
            type: 'trim'
          },{
            key: 'Nhan',
            type: 'trim'
          },{
            key: 'Hop',
            type: 'trim'
          },{
            key: 'Nut',
            type: 'trim'
          },{
            key: 'PhuLieuKhac',
            type: 'trim'
          }];
        const arrCheckbox = arrCol.map((rec) => {
            let textColor = '';
            switch(rec.type){
                case 'shippingStatus':
                    textColor = 'blue';
                    break;
                case 'fabric':
                    textColor = 'red';
                    break;
                case 'trim':
                    textColor = 'green';
                    break;
                default:
                    textColor = 'black';
            }
            return <Col xs={6} sm={3}><Checkbox value={_.camelCase(rec.key)} onChange={this.onCheckedChange}><span style={{color: textColor}}>{_.startCase(rec.key)}</span></Checkbox></Col>;
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
                                    {arrCheckbox}
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
                            enableCellSelect={true}
                            rowsCount={this.rowsCount()}
                            minHeight={600}
                            toolbar={<Toolbar enableFilter={true}/>}
                            onAddFilter={this.handleFilterChange}
                            getValidFilterValues={this.getValidFilterValues}
                            onClearFilters={this.handleOnClearFilters}
                            resizeable />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Production;