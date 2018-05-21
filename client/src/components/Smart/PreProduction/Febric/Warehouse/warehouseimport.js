import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { Select, Input, Button, Form, DatePicker } from 'antd';


import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

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

//format
const dateFormat = 'DD/MM/YYYY';
//const monthFormat = 'MM/YYYY';

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


class WarehouseImport extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            importdate: new Date(),
            provider: '',
            declaration: '',
            contract: '',
            datecreate: undefined,
            usercreate: undefined,
            dateupdate: undefined,
            userupdate: undefined,
            mod: 0,

            data_providers: [],
            provider_size: 'default',

            fabric_type: [],
            fabric_type_size: 'default',

            fabric_color: [],
            fabric_color_size: 'default',

            rows: this.createRows(10),
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
        return this.state.rows[i];
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

    componentWillMount =()=>{

    }

    componentDidMount = () => {
        axios.get('api/fabric/provider/get')
            .then((res) => {
                let data = res.data;
                let childrens = [];
                for (let i = 0; i < data.length; i++) {
                    // if(data[i].provider_code)
                    childrens.push(<Option key={data[i].provider_code}>{data[i].provider_name}</Option>);
                }
                this.setState({ data_providers: childrens });
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { provider_size } = this.state;
        //const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
        };

        const tailFormItemLayout = {
            wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, },
        };
        /*
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        */
        var mygrid = <ReactDataGrid
            enableCellSelect={true}
            resizable={true}
            columns={this.state.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={390}
            onGridRowsUpdated={this.handleGridRowsUpdated} />


        return (
            <Form className="ant-advanced-search-form" >
                <Grid>
                    <Row className="show-grid">
                        <Col md={4} sm={6} xs={12} style={{ textAlign: 'left' }}>
                            <FormItem   {...formItemLayout} label="Ngày nhập " >
                                {getFieldDecorator('email', { rules: [{ type: 'object', required: true, message: 'Vui lòng chọn thời gian nhập kho !' }], }, )
                                    (<DatePicker initialValue={moment(this.state.importdate)} format={dateFormat} onChange={this.onChangeExportDate} />)
                                }
                            </FormItem>
                        </Col>
                        <Col md={4} sm={6} xs={12} style={{ textAlign: 'left' }}>
                            <FormItem   {...formItemLayout} label="Nhà cung cấp " >
                                {getFieldDecorator('provider_code', {
                                    rules: [
                                        { required: true, message: 'Vui lòng chọn nhà cung cấp!' }],
                                })(
                                    <Select mode="combobox" size={provider_size} onChange={this.onChangeProvider} >
                                        {this.state.data_providers}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col md={4} sm={6} xs={12} >
                            <FormItem {...formItemLayout} label="Tờ khai">
                                {getFieldDecorator('input', { rules: [{ required: true, message: 'Vui lòng nhập số tờ khai.' }] })
                                    (<Input placeholder="Nhập số tờ khai" />)}
                            </FormItem>
                        </Col>
                        <Col md={4} sm={6} xs={12}>
                            <FormItem  {...formItemLayout} label="Tờ khai">
                                {getFieldDecorator('input', { rules: [{ required: true, message: 'Input something!' }] })
                                    (<Input placeholder="placeholder" />)}
                            </FormItem>
                        </Col>
                        <Col md={4} sm={6} xs={12}>
                            <FormItem  {...formItemLayout} label="Tờ khai">
                                {getFieldDecorator('input', { rules: [{ required: true, message: 'Input something!' }] })
                                    (<Input placeholder="placeholder" />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <div>
                            <Button value="quantity" onClick={this.addNewRow}>New row </Button>
                        </div>
                        <div>
                            {mygrid}
                        </div>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="danger" htmlType="submit" onClick={this.handleCancel}>Hủy</Button>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Đồng ý</Button>
                        </FormItem>
                    </Row>
                </Grid>
            </Form >
        );
    }
};
export default WarehouseImport;