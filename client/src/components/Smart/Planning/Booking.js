import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Form, Select, message, Input } from 'antd';
import _ from 'lodash';

import Aux from '../../../hoc';
import cmConfig from '../../../CommonConfig';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import PlanningAvatar from '../../../assets/images/dept/kehoach.png';
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;

class PdfViewer extends Component {
    render() {
        return <embed src={this.props.pdfUrl} width={'100%'} height={'800'} />;
    }
};

class ViewReport extends Component {
    state = {
        fileList: [],
        filteredFileList: [],
        selectedFile: null
    }

    componentDidMount(){
        axios.get(`/api/planning/booking`)
        .then((res) => {
            if(res.data.length > 0){
                message.success('Files found. Please select report file');
                this.setState({fileList: res.data});
            }
            else{
                message.warning('No files found');
            }
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

    handleFilterFile = (value) => {
        let tempArr = [...this.state.fileList];
        if(value){
            tempArr = _.filter(this.state.fileList,(rec)=>{
                return rec.name.includes(value);
            });
            this.setState({filteredFileList: tempArr});
        }
        else{
            this.setState({filteredFileList: []});
        }
    }

    render(){
        let optionReportFile = null;
        let fileList = this.state.filteredFileList.length > 0 ? this.state.filteredFileList : this.state.fileList;
        if(fileList.length > 0){
            optionReportFile = fileList.map((rec) => {
                return <Option value={rec.path} key={rec.name}>{rec.name}</Option>;
            });
        }
        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Booking Chart</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <DeptInfo 
                            title="Planning"
                            avatar={PlanningAvatar}
                            head = "Ms Thanh"
                            email = "nguyenthanh@ducthanh3.com.vn"
                            mobile = "01.208.308.959"
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Form layout="inline">
                            <FormItem label="Search file">
                                <Search
                                    placeholder="Enter file name"
                                    onSearch={this.handleFilterFile}
                                    enterButton
                                />
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