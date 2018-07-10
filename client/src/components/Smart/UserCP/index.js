import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, Icon, message, Upload, Button } from 'antd';
import Aux from '../../../hoc';
import axios from '../../../axiosInst';
import cmConfig from '../../../CommonConfig';

const { Meta } = Card;

class UserCP extends Component {

    state = {
        avatar: '',
        deptName: '',
        email: '',
        mobile: '',
        status: '',
        HoD: ''
    }

    componentDidMount() {
        axios.get(`/user/getprofile/${this.props.dept}`)
            .then((res) => {
                console.log(res.data);
                this.setState({ ...res.data });
            });
    }

    render() {
        const { avatar } = this.state;
        return (
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>User Control Panel</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={4}>
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt="example" src={`${cmConfig.baseURL + avatar}`} style={{maxWidth: '100%'}} />}
                            actions={[
                                <Upload
                                    name= 'avatar'
                                    accept= 'image/*'
                                    multiple= {false}
                                    showUploadList= {false}
                                    action= {`${cmConfig.baseURL}api/upload/avatar/${this.props.dept}`}
                                    headers= {{'Authorization': 'Bearer ' + localStorage.getItem('token')}}
                                    beforeUpload= {(file) => {
                                        const isLt2M = file.size / 1024 / 1024 < 2;
                                        if (!isLt2M) {
                                            message.error('Image must smaller than 2MB!');
                                        }
                                        return isLt2M;
                                    }}
                                    onChange={(info) => {
                                        const res = info.file.response;
                                        const status = info.file.status;
                                        if (status === 'done') {
                                            this.setState({avatar: res.avatar});

                                        }
                                        else if (status === 'error') {
                                            message.error(res);
                                        }
                                    }}
                                >
                                    <Button>
                                        <Icon type="upload" /> Click to Upload
                                </Button>
                                </Upload>]}
                        >
                            <Meta
                                title="Avatar"
                                description="Click button below to upload avatar"
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={4}>
                    </Col>
                    <Col xs={12} sm={4}>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        dept: state.user.dept
    };
};

export default connect( mapStateToProps)(UserCP);
