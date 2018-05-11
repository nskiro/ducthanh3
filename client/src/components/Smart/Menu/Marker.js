import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuMarker = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavItem eventKey={'/marker/upload'} componentClass={NavLink} to="/marker/upload" href="/marker/upload"><FontAwesome name="upload" /> Upload File</NavItem>
            <NavItem eventKey={'/marker/viewreport'} componentClass={NavLink} to="/marker/viewreport" href="/marker/viewreport"><FontAwesome name="chart-bar" /> View Report</NavItem>
        </Nav>
    )
};

export default menuMarker;