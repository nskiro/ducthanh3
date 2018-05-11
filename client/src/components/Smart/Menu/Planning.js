import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuPlanning = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavItem eventKey={'/planning/upload'} componentClass={NavLink} to="/planning/upload" href="/planning/upload"><FontAwesome name="upload" /> Upload File</NavItem>
            <NavItem eventKey={'/planning/production'} componentClass={NavLink} to="/planning/production" href="/planning/production"><FontAwesome name="calendar" /> Production</NavItem>
            <NavItem eventKey={'/planning/booking'} componentClass={NavLink} to="/planning/booking" href="/planning/booking"><FontAwesome name="book" /> Booking</NavItem>
            <NavItem eventKey={'/planning/shipping'} componentClass={NavLink} to="/planning/shipping" href="/planning/shipping"><FontAwesome name="ship" /> Shipping</NavItem>
        </Nav>
    )
};

export default menuPlanning;