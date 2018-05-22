import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { Select, Input, Button, Form, Modal, Collapse, DatePicker } from 'antd';


import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

import RowRenderer from './rowrenderer';
import DateFormatter from './dateformatter';

import moment from 'moment';

import axios from '../../../../../axiosInst';
//css
import './views.css';

const { Editors } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor } = Editors;
//const { ImageFormatter } = Formatters;
//const Option = Select.Option;

//const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
//format
const dateFormat = 'DD/MM/YYYY';

const counties = [
    { id: 0, title: 'Bedfordshire' },
    { id: 1, title: 'Berkshire' },
    { id: 2, title: 'Buckinghamshire' },
    { id: 3, title: 'Cambridgeshire' },
    { id: 4, title: 'Cheshire' },
    { id: 5, title: 'Cornwall' }
]


const columnsAll = [
    { key: 'orderid', name: 'ORDER #', editable: true, width: 100 },
    { key: 'type', name: 'LOẠI VẢI', editable: true, resizable: true, editor: <AutoCompleteEditor options={counties} /> },
    { key: 'color', name: 'MÀU VẢI', editable: true },
    { key: 'quantity', name: 'SỐ MÉT', editable: true },
    { key: 'roll', name: 'ROLL', editable: true },
    { key: 'note', name: 'GHI CHÚ', editable: true }
];

class WarehouseImportForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            importdate: new Date(),
            provider: '',
            declaration: '',
            contract: '',

            data_providers: [],
            data_fcolors: [],
            data_ctypes: [],
            provider_size: 'default',

            fabric_type: [],
            fabric_type_size: 'default',

            fabric_color: [],
            fabric_color_size: 'default',

            rows: this.createRows(5),
            columns: [
                { key: 'orderid', name: 'ORDER #', editable: true, width: 100 },
                { key: 'type', name: 'LOẠI VẢI', editable: true, resizable: true },
                { key: 'color', name: 'MÀU VẢI', editable: true },
                { key: 'quantity', name: 'SỐ MÉT', editable: true },
                { key: 'roll', name: 'ROLL', editable: true },
                { key: 'note', name: 'GHI CHÚ', editable: true }
            ]

        };
    }

    getRandomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    };

    createColums = () => {
        let cols = [
            { key: 'orderid', name: 'ORDER #', editable: true, width: 100 },
            { key: 'type', name: 'LOẠI VẢI', editable: true, resizable: true, editor: <AutoCompleteEditor options={this.state.fabric_type} /> },
            { key: 'color', name: 'MÀU VẢI', editable: true },
            { key: 'quantity', name: 'SỐ MÉT', editable: true },
            { key: 'roll', name: 'ROLL', editable: true },
            { key: 'note', name: 'GHI CHÚ', editable: true }
        ];
        return cols;
    };

    addNewRow = () => {
        // let rows =  this.state.Row
        console.log('add new  row');
    }

    onChangeExportDate = (event) => {
        // this.setState({ importdate: event.toDate() });
        console.log(event.toDate());
    }

    onChangeProvider = (e) => {
        //  this.setState({ provider: event, provider_size:data_providers.size() });
        console.log(e);
        //this.setState({ provider_size: e.target.value });
    }

    onChangeDecleration = (event) => {
        this.setState({ declaration: event });
    }

    onChangeContact = (event) => {
        this.setState({ contract: event });
    }

    createRows = (numberOfRows) => {
        let rows = [];
        for (let i = 1; i < numberOfRows; i++) {
            rows.push({
                orderid: '',
                type: '',
                color: '',
                quantity: '',
                roll: '',
                note: ''
            });
        }
        return rows;
    };



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

    handleSubmit = (event) => {
        console.log('handleSubmit');
        const data = new FormData(event.target);
        console.log(data);
        event.preventDefault();

    }

    handleCancel = (e) => {
        console.log('cancel');
    }

    componentDidMount = () => {


    }

    render() {

        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = this.props.form;
        // const { provider_size } = this.state;

        //const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
        };

        const tailFormItemLayout = {
            wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

        var mygrid = <ReactDataGrid
            enableCellSelect={true}
            resizable={true}
            columns={this.state.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={200}
            onGridRowsUpdated={this.handleGridRowsUpdated} />

        return (
            <Modal
                title="Nhập kho"
                visible={visible}
                onOk={onCreate}
                maskClosable={false}
                onCancel={onCancel}
                width={950}
                style={{ top: 5 }}
            >
                <Form className="ant-advanced-search-form" >
                    <Grid>
                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>
                                <FormItem   {...formItemLayout} label="Ngày nhập " >
                                    {getFieldDecorator('email', { initialValue: moment() }, { rules: [{ type: 'object', required: true, message: 'Vui lòng chọn thời gian nhập kho !' }], }, )
                                        (<DatePicker initialValue={moment(this.state.importdate)} format={dateFormat} onChange={this.onChangeExportDate} />)
                                    }
                                </FormItem>
                            </Col>
                            <Col md={4} sm={6} xs={6} style={{ textAlign: 'left' }}>

                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={4} >
                                <FormItem {...formItemLayout} label="Tờ khai">
                                    {getFieldDecorator('input', { rules: [{ required: true, message: 'Vui lòng nhập số tờ khai.' }] })
                                        (<Input placeholder="Nhập số tờ khai" />)}
                                </FormItem>
                            </Col>
                            <Col md={4} sm={6} xs={4}>
                                <FormItem  {...formItemLayout} label="Tờ khai">
                                    {getFieldDecorator('input', { rules: [{ required: true, message: 'Input something!' }] })
                                        (<Input placeholder="placeholder" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={4}>
                                <FormItem  {...formItemLayout} label="Tờ khai">
                                    {getFieldDecorator('input', { rules: [{ required: true, message: 'Input something!' }] })
                                        (<Input placeholder="placeholder" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={4} sm={6} xs={6}>
                                <Button value="quantity" onClick={this.addNewRow}>New row </Button>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col md={8} sm={12} xs={8}>
                                {mygrid}
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <FormItem {...tailFormItemLayout}>
                                <Button type="danger" htmlType="submit" onClick={this.handleCancel}>Hủy</Button>
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Đồng ý</Button>
                            </FormItem>
                        </Row>
                    </Grid>

                </Form >
            </Modal>
        );
    }
};


class WarehouseImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            modalvisible: false,
            data_providers: [],
            data_fcolors: [],
            data_ctypes: [],
            selected_provider: { 'provider_code': '', 'provider_name': '' }
        };

    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log('Received values of form: ', values);
            if (values.provider_code) {
                this.loadSearchProviders(values);
            } else {
                this.loadSearchProviders({});
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.loadSearchProviders({});
    }

    onRefeshGrid = () => {
        this.handleReset();
    }

    onExportToExel = () => {
        alert('Cứ từ từ,chuẩn bị export ... loading .... loading...');
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
                    selected_provider: { 'provider_code': '', 'provider_name': '' }
                });

            } else if (mod === 'edit') {

                let provider = this.state.selected_provider;
                if (provider.provider_code) {
                    this.setState({
                        modalvisible: true
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

    handleCreate = (e) => {
        const form = this.formRef.props.form;

        form.validateFields((err, values) => {
            console.log(values);
            if (err) {
                return;
            }

            let data = {
                _id: values.id,
                provider_code: values.provider_code,
                provider_name: values.provider_name,

            }

            if (values.id) {
                console.log('call update');
                axios.post(`api/fabric/provider/update/${values.id}`, data)
                    .then((res) => {
                        console.log(res.data);
                        this.loadProviders({});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                console.log('call add');
                axios.post('api/fabric/provider/add', data)
                    .then((res) => {
                        console.log(res.data);
                        this.loadProviders({});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            form.resetFields();
            this.setState({ modalvisible: false });

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    //end modal

    rowGetter = (i) => {
        return this.state.data_providers[i];
    };

    loadProviders = (v) => {
        axios.get('api/fabric/provider/get', { params: v })
            .then((res) => {
                let data = res.data;
                // update data
                this.setState({ data_providers: data });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ data_providers: [] });
            });
    }

    loadFabricTypes=()=>{
        console.log('loadFabricTypes');
    }


    
    loadFabricColors=()=>{
        console.log('loadFabricColors');
    }

    componentDidMount = () => {
        this.loadProviders({});
        this.loadFabricTypes();
        this.loadFabricColors();
    }

    onRowProviderClick = (e) => {
        let index = e;
        if (index >= 0 && index < this.state.data_providers.length) {
            let provider = this.state.data_providers[index];
            this.setState({ selected_provider: provider });
        }

    }
    render() {
        const WrappedWarehouseImportForm = Form.create()(WarehouseImportForm);
        const { getFieldDecorator } = this.props.form;
        const columns = [
            // {key: '_id', name: 'id', hidd: false },
            { key: 'inputdate_no', name: 'Ngày nhập liệu' },
            { key: 'provider_name', name: 'Nhà cung cấp' },
            { key: 'delcare_no', name: 'Số tờ khai' },
            { key: 'declare_date', name: 'Ngày tờ khai' },
            { key: 'invoice_no', name: 'Số invoice' },
        ];
        return (
            <div>
                <Collapse className='ant-advanced-search-panel-collapse'>
                    <Panel header="Tìm kiếm" key="1" >
                        <Form className="ant-advanced-search-panel " onSubmit={this.handleSearch}>
                            <Grid>
                                <Row className="show-grid">
                                    <Col md={4} sm={6} xs={12} style={{ textAlign: 'left' }}>
                                        <FormItem label={'Mã nhà cung cấp'}>
                                            {
                                                getFieldDecorator('provider_code', {})(<Input placeholder="Nhập mã cung cấp" />)
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col md={4} sm={6} xs={12} style={{ textAlign: 'left' }}>
                                        <Button type="primary" htmlType="submit">Search</Button>
                                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}> Clear </Button>
                                    </Col>
                                </Row>

                            </Grid>
                        </Form>
                    </Panel>
                </Collapse>

                <div className="ant-advanced-toolbar">
                    <Button type="primary" value='new' className='ant-advanced-toolbar-item' onClick={this.showModal}>Thêm mới</Button>
                    <Button type="primary" value='edit' className='ant-advanced-toolbar-item' onClick={this.showModal}>Điều chỉnh</Button>
                    <Button type="primary" className='ant-advanced-toolbar-item' onClick={this.onRefeshGrid}>Refesh Grid</Button>
                    <Button type="primary" className='ant-advanced-toolbar-item' onClick={this.onExportToExel}>Export to Excel</Button>
                </div>

                <WrappedWarehouseImportForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.modalvisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                >
                </WrappedWarehouseImportForm>

                <ReactDataGrid
                    enableCellSelect={true}
                    resizable={true}
                    columns={columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.data_providers.length}
                    minHeight={290}
                    onRowClick={this.onRowProviderClick}
                    rowRenderer={RowRenderer}
                ></ReactDataGrid>
            </div >
        );
    }
};
export default WarehouseImport;