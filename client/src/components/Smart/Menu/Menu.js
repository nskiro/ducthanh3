import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import FontAwesome  from 'react-fontawesome';
import Logo from '../../../assets/images/ergobaby-logo-square.png';

import MenuPlanning from './Planning';
import MenuQa from './Qa';
import MenuLeader from './Leader';
import MenuMarker from './Marker';
import MenuSample from './Sample';
import MenuProduction from './Production';
import MenuEmbroidery from './Embroidery';
import MenuPackaging from './Packaging';

class Menu extends Component {
    state = {
        active: this.props.location.pathname
    }
    handleSelect = (selectedKey) => {
        this.setState({active: selectedKey});
    }
    render(){
        let menuType = null;
        switch(this.props.menutype){
            case 'Planning' : 
                menuType = <MenuPlanning active={this.state.active} select={this.handleSelect} />;
                break;
            case 'Qa': 
                menuType = <MenuQa active={this.state.active} select={this.handleSelect} />;
                break;
            case 'Leader': 
                menuType = <MenuLeader active={this.state.active} select={this.handleSelect} />;
                break;
            case 'Marker': 
                menuType = <MenuMarker active={this.state.active} select={this.handleSelect} />;
                break;
            case 'Sample': 
                menuType = <MenuSample active={this.state.active} select={this.handleSelect} />;
                break;
            case 'Packaging': 
                menuType = <MenuPackaging active={this.state.active} select={this.handleSelect} />;
                break;
            case 'Production': 
                menuType = <MenuProduction active={this.state.active} select={this.handleSelect} />;
                break;
            case 'Embroidery': 
                menuType = <MenuEmbroidery active={this.state.active} select={this.handleSelect} />;
                break;
            default: menuType = (
                <Nav activeKey={this.state.active}>
                    <NavItem eventKey={1}  to="/" href="/">
                        Home
                    </NavItem>
                </Nav>);
        }
        return(
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={Logo} style={{padding: 0,margin: 0}} alt="Ergo Baby" />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {menuType}
                    { localStorage.getItem('token') !== null ? <Nav pullRight><NavItem componentClass={NavLink} to="/logout" href="/system/logout"><FontAwesome name="sign-out-alt" /> Log Out</NavItem></Nav> : null }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default withRouter(Menu);