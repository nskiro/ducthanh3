import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Form, Select, message, Radio } from 'antd';
import _ from 'lodash';

import Aux from '../../../hoc';
import cmConfig from '../../../CommonConfig';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import ProductionAvatar from '../../../assets/images/dept/Production.jpg';

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
        fileDeptList: [],
        selectedFile: null
    }

    handleDeptChange = (event) => {
        let value = event.target.value;
        this.setState({dept: value});
        axios.get(`/api/production/listfolder/${value}`)
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
                return <Option value={rec.path} key={rec.name}>{rec.name.split('-')[1]}</Option>;
            });
        }
        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Production Report</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <DeptInfo 
                            title="Production"
                            avatar={ProductionAvatar}
                            head = "Ms. Thanh Truc"
                            email = "thanhtruc@ducthanh3.com.vn"
                            mobile = "01225003245"
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Form layout="vertical">
                            <FormItem label="Choose sub-department">
                                <RadioGroup onChange={this.handleDeptChange} value={this.state.dept}>
                                    <Radio value="EB1">EB 1-2</Radio>
                                    <Radio value="EB2">EB 3-4</Radio>
                                    <Radio value="EB3">EB 5-6</Radio>
                                    <Radio value="EB4">EB 7</Radio>
                                    <Radio value="EB5">EB 8-9</Radio>
                                    <Radio value="EB6">EB 10-11</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="Choose report file">
                                <Select
                                    showSearch
                                    style={{ width: 350 }}
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