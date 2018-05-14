import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Form, Select, message } from 'antd';
import _ from 'lodash';

import Aux from '../../../hoc';
import cmConfig from '../../../CommonConfig';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import ProductionAvatar from '../../../assets/images/dept/quandoc.png';
const Option = Select.Option;
const FormItem = Form.Item;

class PdfViewer extends Component {
    render() {
        return <embed src={this.props.pdfUrl} width={'100%'} height={'800'} />;
    }
};

class ViewReport extends Component {
    state = {
        fileDeptList: [],
        selectedFile: null
    }

    handleSubDeptChange = (value) => {
        if(this.state.dept === ''){
            message.warning('Please select department first');
        }
        else{
            axios.get(`/api/production/listfolder/${value}`)
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
                            mobile = ""
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Form layout="inline">
                            <FormItem label="Choose sub-department">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder = "Select sub-department"
                                    optionFilterProp = "children"
                                    onSelect = {this.handleSubDeptChange}
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