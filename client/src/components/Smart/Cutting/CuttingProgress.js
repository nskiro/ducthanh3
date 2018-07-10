import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Select, message, Form, Checkbox, Collapse, Alert } from 'antd';
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
        columns: [],
        checkboxColumns: []
    }
    componentDidMount() {
        axios.get('/api/cutting/listfolder')
            .then((res) => {
                if (res.data.length > 0) {
                    message.success('Files found. Please select report file');
                }
                else {
                    message.warning('No files found');
                }
                this.setState({ files: res.data });
            })
            .catch((err) => {

            });
    }

    handleFileChange = (value) => {
        const removeCheckItem = /Kh Cat|Ngay Cat Vai|Ngay Cat Luoi|Dinh Muc|So Luong|Sl Thuc Phat|Ngay Phat|Thong Tin|Sl Vai/g
        axios.get(`/api/cutting/${value}`)
            .then((res) => {
                this.setState({
                    rows: res.data.data,
                    columns: res.data.columns,
                    checkboxColumns: _.filter(res.data.columns, (o) => {
                        console.log(!o.visible && o.name.match(removeCheckItem))
                        return !o.visible && !o.name.match(removeCheckItem);
                    })
                });
            })
            .catch((err) => {

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

    onCheckedChange = (e) => {
        const value = e.target.value;
        let temp = [...this.state.columns];
        _.forEach(temp, (obj) => {
            if (_.lowerCase(obj.key).includes(_.lowerCase(value)))
                obj.visible = e.target.checked;
        });
        this.setState({ columns: temp });
    }

    render() {
        const { columns, checkboxColumns } = this.state;
        console.log(checkboxColumns);
        const visibleColumns = _.filter(columns, (o) => {
            return o.visible;
        });

        let optionCuttingFile = null;
        if (this.state.files.length > 0) {
            optionCuttingFile = this.state.files.map((rec) => {
                return <Option value={rec.name} key={rec.name}>{rec.name}</Option>;
            });
        }


        return (
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
                                <img src={CuttingAvatar} alt="Avatar" style={{ maxWidth: "100%" }} />
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
                                <Row className="show-grid" style={{ marginTop: '5px' }}>
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
                                    placeholder="Select report file"
                                    optionFilterProp="children"

                                    onSelect={this.handleFileChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {optionCuttingFile}
                                </Select>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    {checkboxColumns.map((value) => { return <Col xs={6} sm={3}><Checkbox value={value.key} onChange={this.onCheckedChange}>{value.name}</Checkbox></Col> })}
                </Row>
                <Row style={{ marginTop: '5px' }}>
                    <Col xs={12} sm={12}>
                        <DataGrid
                            columns={visibleColumns}
                            rowGetter={this.rowGetter}
                            enableCellSelect={true}
                            rowsCount={this.rowsCount()}
                            minHeight={600}
                            rowHeight={50}
                            toolbar={<Toolbar enableFilter={true} />}
                            onAddFilter={this.handleFilterChange}
                            getValidFilterValues={this.getValidFilterValues}
                            onClearFilters={this.handleOnClearFilters}
                            resizeable
                            onColumnResize={(colIdx, newWidth) => {
                                console.log(colIdx, newWidth);
                            }} />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default CuttingProgress;