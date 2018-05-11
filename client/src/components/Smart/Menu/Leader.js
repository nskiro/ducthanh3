import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, NavDropdown } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuLeader = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavDropdown eventKey={2} title={<span>Planning</span>} id="basic-nav-dropdown">
                <NavItem eventKey={'/planning/production'} componentClass={NavLink} to="/planning/production" href="/planning/production">Production</NavItem>
                <NavItem eventKey={'/planning/booking'} componentClass={NavLink} to="/planning/booking" href="/planning/booking">Booking</NavItem>
                <NavItem eventKey={'/planning/shipping'} componentClass={NavLink} to="/planning/shipping" href="/planning/shipping">Shipping</NavItem>
            </NavDropdown>
            <NavItem eventKey={'/qaqc/viewreport'} componentClass={NavLink} to="/qaqc/viewreport" href="/qaqc/viewreport"> QA/QC</NavItem>
            <NavItem eventKey={'/sample/viewreport'} componentClass={NavLink} to="/sample/viewreport" href="/sample/viewreport"> Sample</NavItem>
            <NavItem eventKey={'/marker/viewreport'} componentClass={NavLink} to="/marker/viewreport" href="/marker/viewreport"> Marker</NavItem>
            <NavItem eventKey={'/production/viewreport'} componentClass={NavLink} to="/production/viewreport" href="/production/viewreport"> Production</NavItem>
            <NavItem eventKey={'/embroidery/viewreport'} componentClass={NavLink} to="/embroidery/viewreport" href="/embroidery/viewreport"> Embroidery</NavItem>
            <NavItem eventKey={'/packaging/viewreport'} componentClass={NavLink} to="/packaging/viewreport" href="/packaging/viewreport"> Packaging</NavItem>
        </Nav>
    )
};

export default menuLeader;