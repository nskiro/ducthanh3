import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuQa = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavItem eventKey={'/qaqc/upload'} componentClass={NavLink} to="/qaqc/upload" href="/qaqc/upload"><FontAwesome name="upload" /> Upload File</NavItem>
            <NavItem eventKey={'/qaqc/viewreport'} componentClass={NavLink} to="/qaqc/viewreport" href="/qaqc/viewreport"><FontAwesome name="chart-bar" /> View Report</NavItem>
        </Nav>
    )
};

export default menuQa;