import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { Select, AutoComplete, Input, Button, Form, Modal, Collapse, DatePicker } from 'antd';

import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

import RowRenderer from './rowrenderer';
import DateFormatter from './dateformatter';

import PropTypes from 'prop-types';
import moment from 'moment';

import axios from '../../../../../axiosInst';
//css
import './views.css';
//import { constants } from 'http2';

const { Editors } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor } = Editors;
const { DateLongFormatter, DateShortFormatter } = DateFormatter;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
//format
const dateFormat = 'MM/DD/YYYY';

const default_cols = [
    { key: 'orderid', name: 'ORDER #', editable: true, width: 100 },
    { key: 'fabric_type', name: 'TYPE', editable: true, resizable: true },
    { key: 'fabric_color', name: 'COLOR', editable: true, resizable: true },
    { key: 'met', name: 'MET', editable: true },
    { key: 'roll', name: 'ROLL', editable: true },
    { key: 'note', name: 'NOTE', editable: true }
]

class WarehouseImportForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            importdate: new Date(),
            provider_selected: 'default',
            rows: this.props.data.details,
            columns: []
        };
    }

    createNewRow = () => {
        return { orderid: '', fabric_type: '', fabric_color: '', met: '', roll: '', note: '' }
    }

    addNewRow = () => {
        let rows = this.state.rows;
        rows.push(this.createNewRow());
        this.setState({ rows: rows });
    }

    rowGetter = (i) => {
        if (i >= 0 && i < this.state.rows.length) {
            return this.state.rows[i];
        }
        return null;
    };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, { $merge: updated });
            rows[i] = updatedRow;
        }
        this.setState({ rows });
    };

    loadProviders = (v) => {
        axios.get('api/fabric/provider/get', { params: {} })
            .then((res) => {
                let data = res.data;
                let children = []
                let children_uni = []
                for (let i = 0; i < data.length; i++) {
                    if (data[i].provider_code && children_uni.indexOf(data[i].provider_code) === -1) {
                        children.push(<Option key={data[i].provider_code}>{data[i].provider_code}</Option>);
                        children_uni.push(data[i].provider_code);
                    }
                }
                this.setState({
                    data_providers: children,
                    provider_size: children.length
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ data_providers: [], provider_size: 0 });
            });
    }

    loadFabricTypes = () => {
        axios.get('api/fabric/type/get', { params: {} })
            .then((res) => {
                let data = res.data;
                let children_grid = []
                let data_uni = []
                for (let i = 0; i < data.length; i++) {
                    if (data_uni.indexOf(data[i].fabrictype_name) === -1) {
                        children_grid.push({ id: data[i].fabrictype_name, title: data[i].fabrictype_name });
                        data_uni.push(data[i].fabrictype_name);
                    }
                }
                this.loadFabricColors(children_grid);
            })
            .catch((err) => {
                console.log(err);
                this.setState({ columns: default_cols });
            });
    }

    loadFabricColors = (ftypes) => {
        axios.get('api/fabric/color/get', { params: {} })
            .then((res) => {
                let colors = res.data;
                let colors_grid = [];
                let data_uni = [];
                for (let i = 0; i < colors.length; i++) {
                    if (data_uni.indexOf(colors[i].fabriccolor_name) === -1) {
                        colors_grid.push({ id: colors[i].fabriccolor_name, title: colors[i].fabriccolor_name });
                        data_uni.push(colors[i].fabriccolor_name);
                    }
                }
                let cols = [
                    { key: 'orderid', name: 'ORDER #', editable: true, width: 100 },
                    { key: 'fabric_type', name: 'TYPE', editable: true, resizable: true, editor: <AutoCompleteEditor options={ftypes} /> },
                    { key: 'fabric_color', name: 'COLOR', editable: true, resizable: true, editor: <AutoCompleteEditor options={colors_grid} /> },
                    { key: 'met', name: 'MET', editable: true },
                    { key: 'roll', name: 'ROLL', editable: true },
                    { key: 'note', name: 'NOTE', editable: true }
                ]
                this.setState({ columns: cols });
            })
            .catch((err) => {
                this.setState({ columns: default_cols });
            });
    }
    componentDidMount = async () => {
        this.loadProviders();
        this.loadFabricTypes();
    }
    render() {

        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
        };

        const tailFormItemLayout = {
            wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, },
        };
        return (
            <Modal
                title={this.props.data.title}
                visible={visible}
                onOk={onCreate}
                maskClosable={false}
                onCancel={onCancel}
                width={900}
                style={{ top: 5 }}
            >
                <Form className="ant-advanced-search-panel" >
                    <Grid>
                        <Row className="show-grid">
                            <Col>
                                <FormItem>
                                    {getFieldDecorator('id', { initialValue: this.props.data._id })
                                        (<Input name='id' style={{ display: 'none', visible: false }} />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>
                                <FormItem   {...formItemLayout} label="IM DATE" >
                                    {getFieldDecorator('inputdate_no', { initialValue: moment(this.props.data.inputdate_no) }, { rules: [{ type: 'object', required: true, message: 'Vui lòng chọn thời gian nhập kho !' }], }, )
                                        (<DatePicker format={dateFormat} disabled/>)
                                    }
                                </FormItem>
                            </Col>
                            <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>
                                <FormItem   {...formItemLayout} label="SUPPLIER" >
                                    {getFieldDecorator('provider_name', { initialValue: this.props.data.provider_name }, {
                                        rules: [{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }],
                                    })(<Select size={this.state.provider_size} placeholder='nhà cung cấp.'>
                                        {this.state.data_providers}
                                    </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={4} >
                                <FormItem {...formItemLayout} label="STK">
                                    {getFieldDecorator('declare_no', { initialValue: this.props.data.declare_no }, { rules: [{ required: true, message: 'Vui lòng nhập số tờ khai.' }] })
                                        (<Input placeholder="số tờ khai" />)}
                                </FormItem>
                            </Col>
                            <Col md={4} sm={6} xs={4}>
                                <FormItem  {...formItemLayout} label="STK DATE">
                                    {getFieldDecorator('declare_date', { initialValue: moment(this.props.data.declare_date) }, { rules: [{ required: true, message: 'Vui lòng nhập ngày tờ khai!' }] })
                                        (<DatePicker format={dateFormat} />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={4}>
                                <FormItem  {...formItemLayout} label="INVOICE #">
                                    {getFieldDecorator('invoice_no', { initialValue: this.props.data.invoice_no }, { rules: [{ required: true, message: 'Vui lòng nhập số invoice!' }] })
                                        (<Input placeholder="số invoice" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={6}>
                                <Button onClick={this.addNewRow}>NEW ROW </Button>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={8} sm={12} xs={8}>
                                <ReactDataGrid
                                    enableCellSelect={true}
                                    resizable={true}
                                    columns={this.state.columns}
                                    rowGetter={this.rowGetter}
                                    rowsCount={this.state.rows.length}
                                    minHeight={200}
                                    onGridRowsUpdated={this.handleGridRowsUpdated}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Form >
            </Modal>
        );
    }
};

WarehouseImportForm.propTypes = {
    data: PropTypes.object
};
WarehouseImportForm.defaultProps = {

};

class WarehouseImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            current_date: new Date(),
            warehouse_import_rowcout: 0,
            warehouse_import_data: [],
            modalvisible: false,

            data_providers: [],
            data_providers_size: 'default',
            selected_warehouse_import: this.selectedWarehouseImportDefault(),
            mod: 'view'
        };

    }
    createNewRow = () => {
        return { orderid: '', fabric_type: '', fabric_color: '', met: '', roll: '', note: '' }
    }
    createRows = (numberOfRows) => {
        let rows = [];
        for (let i = 1; i < numberOfRows; i++) {
            rows.push(this.createNewRow());
        }
        return rows;
    };
    selectedWarehouseImportDefault = () => {
        return {
            title: 'IMPORT',
            provider_name: undefined,
            invoice_no: undefined,
            declare_no: undefined,
            declare_date: new Date(),
            details: this.createRows(5),
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log('Received values of form: ', values);
            if (values) {
                if (values.declare_dates && values.declare_dates.length === 2) {
                    let fromdate = values.declare_dates[0];
                    let todate = moment(values.declare_dates[1].format('YYYY-MM-DD'), 'YYYY-MM-DD');
                    let nexttodate = todate.add(1, 'days');
                    values.declare_dates = [fromdate.format('YYYY-MM-DD'), nexttodate.format('YYYY-MM-DD')];
                }
            }

            this.loadFabricWarehouses(values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ warehouse_import_data: [] });
        // this.loadFabricWarehouses({});
    }

    onRefeshGrid = () => {
        this.handleReset();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    //Modal
    showModal = (e) => {
        if (e) {
            let mod = e.target.value;
            if (mod === 'new') {
                this.setState({
                    selected_warehouse_import: this.selectedWarehouseImportDefault(),
                    modalvisible: true,
                    mod: mod
                });

            } else if (mod === 'edit') {
                let seleted = this.state.selected_warehouse_import;
                seleted.title = 'EDIT'
                if (seleted._id) {
                    this.setState({
                        modalvisible: true,
                        mod: mod,
                        selected_warehouse_import: seleted
                    });
                }
            } else if (mod === 'view') {
                let seleted = this.state.selected_warehouse_import;
                seleted.title = 'VIEW DETAIL';
                if (seleted._id) {
                    this.setState({
                        modalvisible: true,
                        mod: mod,
                        selected_warehouse_import: seleted
                    });
                }
            }
        }
    }
    handleCancel = (e) => {
        this.setState({
            modalvisible: false,
        });
    }

    isDataRowValid = (row) => {
        let c_size = 0;
        let check_keys = ["fabric_color", "orderid", "met", "roll", "fabric_type"];
        for (let i = 0; i < check_keys.length; i++) {
            if (row[check_keys[i]]) { c_size++; }
        }
        if (c_size === check_keys.length || c_size === 0) { return { valid: true, size: c_size }; }
        return { valid: false };
    }

    collectDataGrid = (rows) => {
        let data = [];
        for (let i = 0; i < rows.length; i++) {
            let valid_row = this.isDataRowValid(rows[i]);
            if (valid_row.valid) {
                if (valid_row.size > 0) { data.push(rows[i]); }
            } else {
                return { "isvalid": false };
            }
        }

        if (data.length === 0) { return { "isvalid": false }; }
        return { "isvalid": true, "data": data };

    }

    loadSearchProviders = () => {
        axios.get('api/fabric/provider/get', { params: {} })
            .then((res) => {
                let data = res.data;
                let children = []
                let children_uni = []
                children.push(<Option key='A'>{'ALL'}</Option>);

                for (let i = 0; i < data.length; i++) {
                    if (children_uni.indexOf(data[i].provider_name) === -1) {
                        children.push(<Option key={data[i].provider_code}>{data[i].provider_code}</Option>);
                        children_uni.push(data[i].provider_name);
                    }
                }
                this.setState({
                    data_providers: children,
                    provider_size: children.length
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ data_providers: [], data_providers_size: 0 });
            });

    }

    loadFabricWarehouses = (v) => {
        axios.get('api/fabric/import/get', { params: v })
            .then((res) => {
                let data = res.data;
                // update data
                this.setState({ warehouse_import_data: data });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ warehouse_import_data: [] });
            });
    }

    handleCreate = (e) => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            console.log(values);
            if (this.state.mod === 'view') {
                form.resetFields();
                this.setState({ modalvisible: false });
                return;
            }

            if (err) {
                return;
            }
            let data_collect = this.collectDataGrid(this.formRef.state.rows);
            if (!data_collect.isvalid) {
                alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
                return;
            }
            let data = {
                // _id: values.id,
                inputdate_no: values.inputdate_no,
                provider_name: values.provider_name,
                declare_no: values.declare_no,
                declare_date: values.declare_date,
                invoice_no: values.invoice_no
            }


            if (values.id) {
                console.log('call update ->' + this.state.mod);
                axios.post(`api/fabric/import/update/${values.id}`, { data: data, detail: data_collect.data })
                    .then((res) => {
                        console.log(res.data);
                        if (!res.data.valid) {
                            alert('error' + JSON.stringify(res.data.error));
                            return;
                        }
                        this.loadFabricWarehouses({});
                        form.resetFields();
                        this.setState({ modalvisible: false });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                console.log('call add');
                axios.post('api/fabric/import/add', { data: data, detail: data_collect.data })
                    .then((res) => {
                        console.log(res.data);
                        if (!res.data.valid) {
                            alert('error' + JSON.stringify(res.data.error));
                            return;
                        }
                        this.loadFabricWarehouses({});
                        form.resetFields();
                        this.setState({ modalvisible: false });
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }
           
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    //end modal

    rowGetter = (i) => {
        if (i >= 0 && i < this.state.warehouse_import_data.length) {
            return this.state.warehouse_import_data[i];
        }
        return null;
    };

    componentDidMount = async () => {
        this.loadSearchProviders();
    }

    onRowWarehouseImportClick = (e) => {
        let index = e;
        if (index >= 0 && index < this.state.warehouse_import_data.length) {
            let row = this.state.warehouse_import_data[index];
            this.setState({ selected_warehouse_import: row });
        }
    }

    render() {
        const WrappedWarehouseImportForm = Form.create()(WarehouseImportForm);
        const { getFieldDecorator } = this.props.form;

        const columns = [
            { key: 'inputdate_no', name: 'DATE', formatter: DateLongFormatter },
            { key: 'provider_name', name: 'SUPPLIER' },
            { key: 'declare_no', name: 'STK' },
            { key: 'declare_date', name: 'STK DATE', formatter: DateShortFormatter },
            { key: 'invoice_no', name: 'INVOICE #' },
        ];
        return (
            <div>
                <Collapse className='ant-advanced-search-panel-collapse'>
                    <Panel header="SEARCH" key="1" >
                        <Form className="ant-advanced-search-panel " onSubmit={this.handleSearch}>
                            <Grid>
                                <Row className="show-grid">
                                    <Col md={6} sm={12} xs={6} style={{ textAlign: 'left' }}>
                                        <FormItem label={'ORDER #'}>
                                            {
                                                getFieldDecorator('orderid', {})(<Input placeholder="Nhập mã order #" />)
                                            }
                                        </FormItem>
                                        <FormItem label={'INVOICE #'}>
                                            {
                                                getFieldDecorator('invoice_no', {})(<Input placeholder="Nhập mã số invoice" />)
                                            }
                                        </FormItem>
                                        <FormItem label={'SUPPLIER'}>
                                            {
                                                getFieldDecorator('provider_name', {})
                                                    (<Select placeholder='Chọn nhà cung cấp' size={this.state.data_providers_size}>{this.state.data_providers}</Select>)
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col md={6} sm={12} xs={6} >
                                        <FormItem label={'STK'}>
                                            {
                                                getFieldDecorator('declare_no', {})(<Input placeholder="Nhập số tờ khai" />)
                                            }
                                        </FormItem>

                                        <FormItem label={'STK DATE'}>
                                            {
                                                getFieldDecorator('declare_dates', {})(
                                                    <RangePicker placeholder="Nhập ngày tờ khai"
                                                        format={dateFormat}
                                                    />
                                                )
                                            }
                                        </FormItem>
                                    </Col>

                                </Row>
                                <Row className="show-grid">
                                    <Col md={4} sm={6} xs={12} style={{ textAlign: 'left' }}>
                                        <Button type="primary" htmlType="submit">SEARCH</Button>
                                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>CLEAR</Button>
                                    </Col>
                                </Row>

                            </Grid>
                        </Form>
                    </Panel>
                </Collapse>

                <div className="ant-advanced-toolbar">
                    <Button type="primary" value='new' className='ant-advanced-toolbar-item' onClick={this.showModal}>NEW</Button>
                    <Button type="primary" value='view' className='ant-advanced-toolbar-item' onClick={this.showModal}>DETAIL</Button>
                </div>

                <WrappedWarehouseImportForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.modalvisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    data={this.state.selected_warehouse_import}
                >
                </WrappedWarehouseImportForm>

                <ReactDataGrid
                    enableCellSelect={true}
                    resizable={true}
                    columns={columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.warehouse_import_data.length}
                    minHeight={290}
                    onRowClick={this.onRowWarehouseImportClick}
                    rowRenderer={RowRenderer}
                ></ReactDataGrid>
            </div >
        );
    }
};
export default WarehouseImport;