import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, Alert, Row, Col } from 'react-bootstrap';
import FontAwesome  from 'react-fontawesome';

import * as actions from '../../../store/action/index';
import EBLogo from '../../../assets/images/ergobaby-logo-square.png';
import DTLogo from '../../../assets/images/DT-Logo.png';

import './Login.css';

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state);
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/' />
        }
        
        let errMsg = null;
        if(this.props.errorMsg !== null){
            errMsg = <Alert bsStyle="danger"> {this.props.errorMsg} </Alert>;
        }

        return(
            <div className="login">
                {authRedirect}
                <Row>
                    <Col xs={6} sm={6}>
                        <img src={DTLogo} alt="Ergo Baby" style={{maxHeight: '145px', display: 'block', margin: 'auto'}} />
                    </Col>
                    <Col xs={6} sm={6}>
                        <img src={EBLogo} alt="Ergo Baby" style={{maxHeight: '145px', display: 'block', margin: 'auto'}} />
                    </Col>
                </Row>
                
                <form id="loginForm" className="login-form" onSubmit={this.handleFormSubmit}>
                    {errMsg}
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <FontAwesome name='user' />
                            </InputGroup.Addon>
                            <FormControl name="username" type="text" placeholder="Username" style={{height: "40px"}} onChange={this.handleInputChange} />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <FontAwesome name='key' />
                            </InputGroup.Addon>
                            <FormControl name="password" type="password" placeholder="Password" style={{height: "40px"}} onChange={this.handleInputChange} />
                        </InputGroup>
                    </FormGroup>
                    <button type='submit' id="btnLogin" name="btnLogin" className="btn btn-primary fa-lg" tabIndex="3">
                        <FontAwesome name='lock-open' /> Login
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.token !== '',
        errorMsg: state.user.error,
        loading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( username, password ) => dispatch(actions.auth( username, password))
    };
};
export default connect( mapStateToProps, mapDispatchToProps )(Login);