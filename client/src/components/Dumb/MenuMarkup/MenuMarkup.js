import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import FontAwesome  from 'react-fontawesome';
import Logo from '../../../assets/images/ergobaby-logo-square.png';

const SubMenu = Menu.SubMenu;
const MenuMarkup = ({ mobileVersion, activeLinkKey, onLinkClick, className }) => (
  <Menu
    theme={'light'}
    mode={mobileVersion ? 'vertical' : 'horizontal'}
    selectedKeys={[`${activeLinkKey}`]}
    className={className}
  >
    <Menu.Item key='/'>
      <Link onClick={onLinkClick} to='/'><img src={Logo} style={{padding: 0,margin: 0, maxHeight: '43px'}} alt="Ergo Baby" /></Link>
    </Menu.Item>
    <SubMenu title={<span>Planning</span>}>
        <Menu.Item key='/planning/production'>
          <Link onClick={onLinkClick} to='/planning/production'>Production</Link>
        </Menu.Item>
        <Menu.Item key='/planning/booking'>
          <Link onClick={onLinkClick} to='/planning/booking'>Booking</Link>
        </Menu.Item>
        <Menu.Item key='/planning/shipping'>
          <Link onClick={onLinkClick} to='/planning/shipping'>Shipping</Link>
        </Menu.Item>
      </SubMenu>
    <Menu.Item key='/imex'>
      <Link onClick={onLinkClick} to='/imex'>Import-Export</Link>
    </Menu.Item>
    <SubMenu title={<span>Pre-Production</span>}>
      <SubMenu title={<span>Fabric</span>}>
        <Menu.Item key='/fabricWarehouse'>
          <Link onClick={onLinkClick} to='/fabricWarehouse'>Warehouse</Link>
        </Menu.Item>
        <Menu.Item key='/fabricQc'>
          <Link onClick={onLinkClick} to='/fabricQc'>QC</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key='/sample/viewreport'>
          <Link onClick={onLinkClick} to='/sample/viewreport'>Sample</Link>
      </Menu.Item>
      <Menu.Item key='/marker/viewreport'>
          <Link onClick={onLinkClick} to='/marker/viewreport'>Marker</Link>
      </Menu.Item>
      <Menu.Item key='/cutting'>
          <Link onClick={onLinkClick} to='/cutting'>Cutting</Link>
      </Menu.Item>
      <Menu.Item key='/numbering'>
          <Link onClick={onLinkClick} to='/numbering'>Numbering</Link>
      </Menu.Item>
      <Menu.Item key='/embroidery/viewreport'>
          <Link onClick={onLinkClick} to='/embroidery/viewreport'>Embroidery</Link>
      </Menu.Item>
    </SubMenu>
    <SubMenu title={<span>Production</span>}>
      <Menu.Item key='/production/viewreport'>
          <Link onClick={onLinkClick} to='/production/viewreport'>Sewing</Link>
      </Menu.Item>
      <Menu.Item key='/qaqc/viewreport'>
          <Link onClick={onLinkClick} to='/qaqc/viewreport'>QA-QC</Link>
      </Menu.Item>
    </SubMenu>
    <SubMenu title={<span>Post-Production</span>}>
      <Menu.Item key='/aql'>
          <Link onClick={onLinkClick} to='/aql'>FRI-AQL</Link>
      </Menu.Item>
      <Menu.Item key='/packaging/viewreport'>
          <Link onClick={onLinkClick} to='/packaging/viewreport'>Packaging</Link>
      </Menu.Item>
      <Menu.Item key='/productWarehouse'>
          <Link onClick={onLinkClick} to='/productWarehouse'>Product Warehouse</Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key='/administration'>
      <Link onClick={onLinkClick} to='/administration'>Administration</Link>
    </Menu.Item>
    <Menu.Item key='/accounting'>
      <Link onClick={onLinkClick} to='/accounting'>Accounting</Link>
    </Menu.Item>
    <Menu.Item key='/compliance'>
      <Link onClick={onLinkClick} to='/compliance'>Compliance</Link>
    </Menu.Item>
    <Menu.Item key='/logout' style={{position: 'absolute', right: '20px'}}>
        <Link onClick={onLinkClick} to='/logout'><FontAwesome name="sign-out-alt" /> Logout</Link>
    </Menu.Item>
  </Menu>
);

MenuMarkup.propTypes = {
  mobileVersion: PropTypes.bool,
  activeLinkKey: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func,
  className: PropTypes.string,
};

MenuMarkup.defaultProps = {
  mobileVersion: false,
  className: 'mobile-navigation',
};

export default MenuMarkup;
