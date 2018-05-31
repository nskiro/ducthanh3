import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { Select, AutoComplete, Input, InputNumber, Button, Form, Modal, Collapse, DatePicker } from 'antd';

import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

import RowRenderer from './rowrenderer';
import DateFormatter from './dateformatter';

import PropTypes from 'prop-types';
import moment from 'moment';

import axios from '../../../../../axiosInst';
//css
import './views.css';

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
    { key: 'po_no', name: 'PO', editable: true },
    { key: 'line_no', name: 'LINE', editable: true },
    { key: 'sku', name: 'SKU', editable: true },
    { key: 'des', name: 'DESCRIPTION', editable: true },
    { key: 'qty', name: 'QTY', editable: true },
    { key: 'yield', name: 'YIELD', editable: true },
    { key: 'fab_qty', name: 'FAB_QTY', editable: true },
    { key: 'note', name: 'NOTE', editable: true }
]

class WarehouseExportForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            exportdate: new Date(),
            provider_selected: 'default',
            rows: this.props.data.details,
            columns: []
        };
    }

    createNewRow = () => {
        return { orderid: '', fabric_type: '', fabric_color: '', met: '', roll: '', po_no: '', line_no: '', sku: '', des: '', qty: '', yield: '', fab_qty: '', note: '' }
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
                    if (children_uni.indexOf(data[i].provider_name) === -1) {
                        children.push(<Option key={data[i].provider_name}>{data[i].provider_name}</Option>);
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
                    { key: 'po_no', name: 'PO', editable: true },
                    { key: 'line_no', name: 'LINE', editable: true },
                    { key: 'sku', name: 'SKU', editable: true },
                    { key: 'des', name: 'DESCRIPTION', editable: true },
                    { key: 'qty', name: 'QTY', editable: true },
                    { key: 'yield', name: 'YIELD', editable: true },
                    { key: 'fab_qty', name: 'FAB_QTY', editable: true },
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
                width={1024}
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
                                <FormItem   {...formItemLayout} label="EX DATE" >
                                    {getFieldDecorator('inputdate_no', { initialValue: moment(this.props.data.inputdate_no) }, { rules: [{ type: 'object', required: true, message: 'Vui lòng chọn thời gian xuất kho !' }], }, )
                                        (<DatePicker format={dateFormat} disabled />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={10} sm={10} xs={10}>
                                <Button onClick={this.addNewRow}>New row</Button>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={10} sm={12} xs={10}>
                                <ReactDataGrid
                                    enableCellSelect={true}
                                    resizable={true}
                                    columns={this.state.columns}
                                    rowGetter={this.rowGetter}
                                    rowsCount={this.state.rows.length}
                                    minHeight={300}
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

WarehouseExportForm.propTypes = {
    data: PropTypes.object
};
WarehouseExportForm.defaultProps = {

};

class WarehouseExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            warehouse_import_rowcout: 0,
            warehouse_import_data: [],
            data_export_selected: {
                inputdate_no: new Date(),
                details: [],
                title: ''
            },
            modalvisible: false
        };

    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (values.from_date) {
                values.from_date = values.from_date.format('YYYY-MM-DD');
            }

            if (values.to_date) {
                let todate = moment(values.to_date).add(1, 'days');
                values.to_date = todate.format('YYYY-MM-DD');
            }
            this.loadFabricWarehouses(values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
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
                    modalvisible: true,
                    data_export_selected: { inputdate_no: new Date(), details: [], title: 'NEW' },
                });

            } else if (mod === 'detail') {
                let selected = this.state.data_export_selected;
                selected['title'] = 'DETAIL';
                this.setState({
                    modalvisible: true,
                    data_export_selected: selected
                });

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
        console.log(row);
        let check_keys = ["fabric_color", "fabric_type", "orderid", "met", "roll", "po_no", "line_no", "sku", "des", "qty", "yield", "fab_qty"];
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

    loadFabricWarehouses = (v) => {
        axios.get('api/fabric/export/get', { params: v })
            .then((res) => {
                let data = res.data;
                // update data
                console.log(data);
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

            if (err) {
                return;
            }

            if (this.state.mod === 'detail') {
                return;
            }

            let data_collect = this.collectDataGrid(this.formRef.state.rows);
            if (!data_collect.isvalid) {
                alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
                return;
            }
            let data = {
                // _id: values.id,
                inputdate_no: values.inputdate_no.format('YYYY-MM-DD')
            }


            if (values.id) {
                console.log('call update');

                axios.post(`api/fabric/export/update/${values.id}`, { data: data, detail: data_collect.data })
                    .then((res) => {
                        console.log(res.data);
                        form.resetFields();
                        this.setState({ modalvisible: false });
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err.error);
                    });
            } else {
                console.log('call add');

                axios.post('api/fabric/export/add', { data: data, detail: data_collect.data })
                    .then((res) => {
                        console.log(res.data);
                        //this.loadFabricWarehouses({});
                        form.resetFields();
                        this.setState({ modalvisible: false });
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err.error);
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

    onRowWarehouseImportClick = (e) => {
        let index = e;
        if (index >= 0 && index < this.state.warehouse_import_data.length) {
            let row_selected = this.state.warehouse_import_data[index];
            this.setState({ data_export_selected: row_selected });
        }
        console.log('selected =>' + JSON.stringify(this.state.data_export_selected));
    }

    render() {
        const WrappedWarehouseExportForm = Form.create()(WarehouseExportForm);
        const { getFieldDecorator } = this.props.form;
        const columns = [
            { key: 'inputdate_no', name: 'EX DATE', formatter: DateShortFormatter },
            { key: 'create_date', name: 'CREATE DATE', formatter: DateLongFormatter }
        ];
        return (
            <div>
                <Collapse className='ant-advanced-search-panel-collapse'>
                    <Panel header="SEARCH" key="1" >
                        <Form className="ant-advanced-search-panel " onSubmit={this.handleSearch}>
                            <Grid>
                                <Row className="show-grid">
                                    <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>
                                        <FormItem label="FROM EX DATE " >
                                            {getFieldDecorator('from_date', {}, {}, )
                                                (<DatePicker format={dateFormat} />)
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>
                                        <FormItem label="TO EX DATE " >
                                            {getFieldDecorator('to_date', {}, {}, )
                                                (<DatePicker format={dateFormat} />)
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row className="show-grid">
                                    <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>
                                        <FormItem label="FROM ORDER # " >
                                            {getFieldDecorator('from_orderid', {}, )
                                                (<InputNumber placeholder="from order #" />)
                                            }
                                        </FormItem>
                                    </Col>

                                    <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>
                                        <FormItem label="TO ORDER # " >
                                            {getFieldDecorator('to_orderid', {}, )
                                                (<InputNumber placeholder="to order #" />)
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
                    <Button type="primary" value='detail' className='ant-advanced-toolbar-item' onClick={this.showModal}>DETAIL</Button>
                </div>

                <WrappedWarehouseExportForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.modalvisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    data={this.state.data_export_selected}
                >
                </WrappedWarehouseExportForm>

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
}

export default WarehouseExport;