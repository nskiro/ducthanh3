import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuPackaging = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavItem eventKey={'/packaging/upload'} componentClass={NavLink} to="/packaging/upload" href="/packaging/upload"><FontAwesome name="upload" /> Upload File</NavItem>
            <NavItem eventKey={'/packaging/viewreport'} componentClass={NavLink} to="/packaging/viewreport" href="/packaging/viewreport"><FontAwesome name="chart-bar" /> View Report</NavItem>
        </Nav>
    )
};

export default menuPackaging;