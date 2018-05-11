import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuProduction = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavItem eventKey={'/production/upload'} componentClass={NavLink} to="/production/upload" href="/production/upload"><FontAwesome name="upload" /> Upload File</NavItem>
            <NavItem eventKey={'/production/viewreport'} componentClass={NavLink} to="/production/viewreport" href="/production/viewreport"><FontAwesome name="chart-bar" /> View Report</NavItem>
        </Nav>
    )
};

export default menuProduction;