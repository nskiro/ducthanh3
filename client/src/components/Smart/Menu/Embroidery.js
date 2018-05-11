import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const menuEmbroidery = (props) => {
    return(
        <Nav activeKey={props.active} onSelect={props.select}>
            <NavItem eventKey={'/'} componentClass={NavLink} to="/" href="/"><FontAwesome name="home" /> Home</NavItem>
            <NavItem eventKey={'/embroidery/upload'} componentClass={NavLink} to="/embroidery/upload" href="/embroidery/upload"><FontAwesome name="upload" /> Upload File</NavItem>
            <NavItem eventKey={'/embroidery/viewreport'} componentClass={NavLink} to="/embroidery/viewreport" href="/embroidery/viewreport"><FontAwesome name="chart-bar" /> View Report</NavItem>
        </Nav>
    )
};

export default menuEmbroidery;