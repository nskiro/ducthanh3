import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Form, Radio , message, Select } from 'antd';
import _ from 'lodash';

import Aux from '../../../hoc';
import cmConfig from '../../../CommonConfig';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import QaAvatar from '../../../assets/images/dept/QC QA.jpg';
const RadioGroup = Radio.Group;
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
        subDept: '',
        fileDeptList: [],
        selectedFile: null,
        haveSubDept: false
    }

    handleDeptChange = (event) => {
        let value = event.target.value;
        this.setState({dept: value});
        if(value === "QC1"){
            this.setState({haveSubDept: true});
        }
        else{
            this.setState({haveSubDept: false, subDept: ''});
            axios.get(`/api/qaqc/listfolder/${value}`)
            .then((res) => {
                if(res.data.length > 0){
                    message.success('Files found. Please select report file');
                }
                else{
                    message.warning('No files found');
                }
                this.setState({fileDeptList: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    handleSubDeptChange = (event) => {
        let value = event.target.value;
        this.setState({subDept: value});
        if(this.state.dept === ''){
            message.warning('Please select department first');
        }
        else{
            axios.get(`/api/qaqc/listfolder/${this.state.dept}-${value}`)
            .then((res) => {
                if(res.data.length > 0){
                    message.success('Files found. Please select report file');
                }
                else{
                    message.warning('No files found');
                }
                this.setState({fileDeptList: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
        }
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
                        <DeptInfo 
                            title="QA"
                            avatar={QaAvatar}
                            head = "Mr. Phong Phan"
                            email = "phanphong@ducthanh3.com.vn"
                            mobile = "0974986555"
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Form layout="vertical">
                            <FormItem label="Choose report type">
                                <RadioGroup onChange={this.handleDeptChange} value={this.state.dept}>
                                    <Radio value="QC1">QC 1</Radio>
                                    <Radio value="QC2">QC 2</Radio>
                                    <Radio value="QCF">QC Final</Radio>
                                    <Radio value="PRO">Procedure</Radio>
                                    <Radio value="WR">Weekly Report</Radio>
                                    <Radio value="SPEC">Specification</Radio>
                                    <Radio value="INS">Inspect Procedure</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="Choose sub-department">
                                <RadioGroup onChange={this.handleSubDeptChange} value={this.state.subDept} disabled = {!this.state.haveSubDept}>
                                    <Radio value="EB1">EB 1</Radio>
                                    <Radio value="EB2">EB 2</Radio>
                                    <Radio value="EB3">EB 3</Radio>
                                    <Radio value="EB4">EB 4</Radio>
                                    <Radio value="EB5">EB 5</Radio>
                                    <Radio value="EB6">EB 6</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="Choose report file">
                                <Select
                                    showSearch
                                    style={{ width: 650 }}
                                    placeholder = "Select report file"
                                    RadioFilterProp = "children"
                                    
                                    onSelect = {this.handleFileChange}
                                    filterRadio = {(input, Radio) => Radio.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {optionReportFile}
                                </Select>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <Row className="show-grid">
                    {this.state.selectedFile !== null ? <iframe src={`${cmConfig.baseURL + 'web/viewer.html?file='+ _.replace(this.state.selectedFile,'upload\\','..\\')}`} width="100%" height="600px" /> : null }
                </Row>
            </Aux>
        );
    }
}

export default ViewReport;