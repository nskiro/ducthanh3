import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/action/index';

class Logout extends Component {

    render () {
        localStorage.removeItem('token');
        localStorage.removeItem('dept');
        this.props.onLogout();
        return window.location.href = "http://ducthanh3.com.vn/";
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);