import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuSample = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavItem eventKey={'/sample/upload'} componentClass={NavLink} to="/sample/upload" href="/sample/upload"><FontAwesome name="upload" /> Upload File</NavItem>
            <NavItem eventKey={'/sample/viewreport'} componentClass={NavLink} to="/sample/viewreport" href="/sample/viewreport"><FontAwesome name="chart-bar" /> View Report</NavItem>
        </Nav>
    )
};

export default menuSample;