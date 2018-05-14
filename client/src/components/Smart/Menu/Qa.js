import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, NavDropdown } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuQa = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavDropdown eventKey={2} title={<span>Upload</span>} id="basic-nav-dropdown">
                <NavItem eventKey={'/qaqc/upload'} componentClass={NavLink} to="/qaqc/upload" href="/qaqc/upload"> QA/QC</NavItem>
                <NavItem eventKey={'/sample/upload'} componentClass={NavLink} to="/sample/upload" href="/sample/upload"> Sample</NavItem>
                <NavItem eventKey={'/marker/upload'} componentClass={NavLink} to="/marker/upload" href="/marker/upload"> Marker</NavItem>
                <NavItem eventKey={'/production/upload'} componentClass={NavLink} to="/production/upload" href="/production/upload"> Production</NavItem>
                <NavItem eventKey={'/embroidery/upload'} componentClass={NavLink} to="/embroidery/upload" href="/embroidery/upload"> Embroidery</NavItem>
                <NavItem eventKey={'/packaging/upload'} componentClass={NavLink} to="/packaging/upload" href="/packaging/upload"> Packaging</NavItem>
            </NavDropdown>
            <NavItem eventKey={'/qaqc/viewreport'} componentClass={NavLink} to="/qaqc/viewreport" href="/qaqc/viewreport"><FontAwesome name="chart-bar" /> View Report</NavItem>
        </Nav>
    )
};

export default menuQa;