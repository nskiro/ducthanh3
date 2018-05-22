import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Form, Select, message, Button} from 'antd';
import _ from 'lodash';

import Aux from '../../../hoc';
import cmConfig from '../../../CommonConfig';
import axios from '../../../axiosInst';
import DeptInfo from '../../Dumb/DeptInfo/DeptInfo';

import PlanningAvatar from '../../../assets/images/dept/kehoach.png';
const Option = Select.Option;
const FormItem = Form.Item;

const PdfViewer = (props) => {
    return <embed src={props.pdfUrl} width={'100%'} height={'800'} />;
};

class ViewReport extends Component {
    state = {
        fileList: [],
        selectedFile: null
    }

    componentDidMount(){
        axios.get(`/api/planning/shipping`)
        .then((res) => {
            if(res.data.length > 0){
                message.success('Files found. Please select report file');
            }
            else{
                message.warning('No files found');
            }
            this.setState({fileList: res.data});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleFileDelete = () => {
        if(this.state.selectedFile === null){
            message.warning('Please select file to delete!');
        }
        else{
            const filePath = this.state.selectedFile.split('/');
            console.log(filePath);
            axios.get(`/api/planning/deleteFile/${filePath[4]}`)
            .then((res) => {
                let temp = [...this.state.fileList];
                const indx = _.findIndex(temp, (o) =>{
                    return o.name === filePath[4];
                  });
                _.pullAt(temp,indx);
                message.success(res.data);
                this.setState({selectedFile: null, fileList: temp});
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
        if(this.state.fileList.length > 0){
            optionReportFile = this.state.fileList.map((rec) => {
                return <Option value={rec.path} key={rec.name}>{rec.name}</Option>;
            });
        }
        
        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Shipping Schedule</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <DeptInfo 
                            title="Planning"
                            avatar={PlanningAvatar}
                            head = "Ms. Thanh Nguyen"
                            email = "nguyenthanh@ducthanh3.com.vn"
                            mobile = "01208308959"
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <Form layout="inline">
                            <FormItem label="Choose report file">
                                <Select
                                    ref="selectFile"
                                    showSearch
                                    style={{ width: 350 }}
                                    placeholder = "Select report file"
                                    optionFilterProp = "children"
                                    onFocus = {this.handleFileFocus}
                                    onSelect = {this.handleFileChange}
                                    onBlur = {()=>{console.log('Blur')}}
                                    filterOption = {(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {optionReportFile}
                                </Select>
                            </FormItem>
                            { localStorage.dept === 'Planning' ? <FormItem><Button type="danger" shape="circle" icon="delete" onClick={this.handleFileDelete} /></FormItem> : null } 
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