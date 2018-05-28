import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Select, message, Form, Checkbox,Collapse, Alert } from 'antd';
import DataGrid from 'react-data-grid';
import { Toolbar, Data, Filters } from 'react-data-grid-addons';

import Aux from '../../../hoc';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import CuttingAvatar from '../../../assets/images/dept/tocat.jpg';

const Option = Select.Option;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Selectors = Data.Selectors;
const MultiSelectFilter = Filters.MultiSelectFilter;

class CuttingProgress extends Component {
    state = {
        rows: [],
        filters: {},
        files: [],
        columns: [
            {key: 'order', name: 'Order',filterable: true, width:95, visible: true},
            {key: 'po', name: 'Po',filterable: true, width: 60, visible: true},
            {key: 'line', name: 'Line',filterable: true, width: 45, visible: true},
            {key: 'sku', name: 'Sku',filterable: true, width: 120, visible: true},
            {key: 'description', name: 'Description',filterable: true, width: 350, visible: true},
            {key: 'originalQty', name: 'Original qty',filterable: true, width: 91, visible: true},
            {key: 'vaiChinh', name: 'Vai chinh',filterable: true, width: 270, visible: true, resizable: true},
            {key: 'vaiLot', name: 'Vai lot',filterable: true, width: 270, visible: true, resizable: true},
            {key: 'notes', name: 'Notes',filterable: true, width:95, visible: true, resizable: true},
            {key: 'factoryQty', name: 'Factory qty',filterable: true, width:95, visible: true},
            {key: 'cuttingDate', name: 'Cutting date',filterable: true, width:95, visible: true},
            {key: 'ngayCatVc', name: 'Ngay cat vc',filterable: true, width:95, visible: true},
            {key: 'ngayCatVl', name: 'Ngay cat vl',filterable: true, width:95, visible: true},
            {key: 'anNote', name: 'An note',filterable: true, width:95, visible: true, resizable: true},
            {key: 'cuttingProgress', name: 'Cutting progress',filterable: true, width:95, visible: true, resizable: true},
            {key: 'productGroup', name: 'Product group',filterable: true, width:95, visible: true},
            {key: 'type', name: 'Type',filterable: true, width:95, visible: true},
            {key: 'country', name: 'Country',filterable: true, width:95, visible: true},
            {key: 'factory', name: 'Factory',filterable: true, width:95, visible: true},
            {key: 'cuttingNote', name: 'Cutting note',filterable: true, width:220, visible: true, resizable: true},
            {key: 'sendDate', name: 'Send date',filterable: true, width:95, visible: true},
            {key: 'priority', name: 'Priority',filterable: true, width:230, visible: true},
            {key: 'thongTinVai', name: 'Thong tin vai',filterable: true, width:300, visible: true, resizable: true}
        ]
    }
    componentDidMount(){
        axios.get('/api/cutting/listfolder')
        .then((res) => {
            if(res.data.length > 0){
                message.success('Files found. Please select report file');
            }
            else{
                message.warning('No files found');
            }
            this.setState({files: res.data});
        })
        .catch((err)=> {

        });
    }

    handleFileChange = (value) => {
        axios.get(`/api/cutting/${value}`)
        .then((res) => {
            this.setState({rows: res.data});
        })
        .catch((err)=> {

        });
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
        const {columns} = this.state;

        const visibleColumns = _.filter(columns, (o)=>{
            return o.visible;
        });

        let optionCuttingFile = null;
        if(this.state.files.length > 0){
            optionCuttingFile = this.state.files.map((rec) => {
                return <Option value={rec.name} key={rec.name}>{rec.name}</Option>;
            });
        }

        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Cutting Progress</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Row className="show-grid">
                            <Col xs={12} sm={2}>
                                <img src={CuttingAvatar} alt="Avatar" style={{maxWidth: "100%"}} />
                            </Col>
                            <Col xs={12} sm={4}>
                                <Row className="show-grid">
                                    <Col xs={12} sm={12}>
                                        <Alert
                                            message={`Cutting Contact Info`}
                                            description={
                                                <span>
                                                    <Row className="show-grid"><Col xs={12} sm={12}>Head of department: <b>Mr Phuong</b></Col></Row>
                                                    <Row className="show-grid"><Col xs={12} sm={12}>Email: <a href="mailto:vanphuong@ducthanh3.com.vn">vanphuong@ducthanh3.com.vn</a></Col></Row>
                                                    <Row className="show-grid"><Col xs={12} sm={12}>Mobile: 0123954756</Col></Row>
                                                </span>
                                            }
                                            type="info"
                                            showIcon
                                        />
                                    </Col>
                                </Row>
                                <Row className="show-grid" style={{marginTop: '5px'}}>
                                    <Col xs={12} sm={12}>
                                        <Alert
                                            description={
                                                <span>
                                                    <Row className="show-grid"><Col xs={12} sm={12}>Vice Head of department: <b>Ms Thuy An</b></Col></Row>
                                                    <Row className="show-grid"><Col xs={12} sm={12}>Email: <a href="mailto:thuyan@ducthanh3.com.vn">thuyan@ducthanh3.com.vn</a></Col></Row>
                                                    <Row className="show-grid"><Col xs={12} sm={12}>Mobile: 0978576982</Col></Row>
                                                </span>
                                            }
                                            type="info"
                                            showIcon
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Form layout="inline">
                            <FormItem label="Choose report file">
                                <Select
                                    showSearch
                                    style={{ width: 350 }}
                                    placeholder = "Select report file"
                                    optionFilterProp = "children"
                                    onFocus = {this.handleFileFocus}
                                    onSelect = {this.handleFileChange}
                                    filterOption = {(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {optionCuttingFile}
                                </Select>
                            </FormItem>
                        </Form>
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
                            rowHeight={50}
                            toolbar={<Toolbar enableFilter={true}/>}
                            onAddFilter={this.handleFilterChange}
                            getValidFilterValues={this.getValidFilterValues}
                            onClearFilters={this.handleOnClearFilters}
                            resizeable
                            onColumnResize = {(colIdx,newWidth)=>{
                                console.log(colIdx,newWidth);
                            }} />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default CuttingProgress;