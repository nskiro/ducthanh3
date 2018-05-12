import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Form, Select, message } from 'antd';
import _ from 'lodash';

import Aux from '../../../hoc';
import cmConfig from '../../../CommonConfig';
import axios from '../../../axiosInst';

const Option = Select.Option;
const FormItem = Form.Item;

class PdfViewer extends Component {
    render() {
        return <embed src={this.props.pdfUrl} width={'100%'} height={'800'} />;
    }
};

class ViewReport extends Component {
    state = {
        dept: '',
        fileDeptList: [],
        selectedFile: null,
        haveSubDept: false
    }

    handleDeptChange = (value) => {
        if(value === "QC1" || value === "QC2"){
            this.setState({dept: value,haveSubDept: true});
        }
        else{
            this.setState({haveSubDept: false});
            axios.get(`/api/qaqc/listfolder/${value}`)
            .then((res) => {
                if(res.data.length > 0){
                    message.success('Files found. Please select report file');
                    this.setState({fileDeptList: res.data});
                }
                else{
                    message.warning('No files found');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        
    }

    handleSubDeptChange = (value) => {
        if(this.state.dept === ''){
            message.warning('Please select department first');
        }
        else{
            axios.get(`/api/qaqc/listfolder/${this.state.dept}-${value}`)
            .then((res) => {
                if(res.data.length > 0){
                    message.success('Files found. Please select report file');
                    this.setState({fileDeptList: res.data});
                }
                else{
                    message.warning('No files found');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    handleFileFocus = (value) => {
        this.setState({selectedFile: null});
    }
    
    handleFileChange = (value) => {
        this.setState({selectedFile: value});
    }

    render(){
        let optionReportFile = null;
        if(this.state.fileDeptList.length > 0){
            optionReportFile = this.state.fileDeptList.map((rec) => {
                return <Option value={rec.path} key={rec.name}>{rec.name}</Option>;
            });
        }
        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View QA/QC Report</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Form layout="inline">
                            <FormItem label="Choose department">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder = "Select department"
                                    optionFilterProp = "children"
                                    onChange = {this.handleDeptChange}
                                    filterOption = {(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    <Option value="QC1">QC 1</Option>
                                    <Option value="QC2">QC 2</Option>
                                    <Option value="QCF">QC Final</Option>
                                    <Option value="PRO">Procedure</Option>
                                    <Option value="FO">Factory Operation</Option>
                                    <Option value="WR">Weekly Report</Option>
                                    <Option value="SPEC">Specification</Option>
                                    <Option value="INS">Inspect Procedure</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="Choose sub-department">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder = "Select sub-department"
                                    optionFilterProp = "children"
                                    onSelect = {this.handleSubDeptChange}
                                    disabled = {!this.state.haveSubDept}
                                    filterOption = {(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    <Option value="EB1">EB 1</Option>
                                    <Option value="EB2">EB 2</Option>
                                    <Option value="EB3">EB 3</Option>
                                    <Option value="EB4">EB 4</Option>
                                    <Option value="EB5">EB 5</Option>
                                    <Option value="EB6">EB 6</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="Choose report file">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder = "Select report file"
                                    optionFilterProp = "children"
                                    onFocus = {this.handleFileFocus}
                                    onSelect = {this.handleFileChange}
                                    filterOption = {(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {optionReportFile}
                                </Select>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <Row className="show-grid">
                    {this.state.selectedFile !== null ? <PdfViewer pdfUrl={`${cmConfig.baseURL + _.replace(this.state.selectedFile,'upload/','')}`} /> : null }
                </Row>
            </Aux>
        );
    }
}

export default ViewReport;