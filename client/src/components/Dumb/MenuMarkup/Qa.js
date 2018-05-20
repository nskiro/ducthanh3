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
    <SubMenu title={<span>Upload</span>}>
      <Menu.Item key='/qaqc/upload'>
        <Link onClick={onLinkClick} to='/qaqc/upload'>QA - QC</Link>
      </Menu.Item>
      <Menu.Item key='/sample/upload'>
        <Link onClick={onLinkClick} to='/sample/upload'>Sample</Link>
      </Menu.Item>
      <Menu.Item key='/marker/upload'>
        <Link onClick={onLinkClick} to='/marker/upload'>Marker</Link>
      </Menu.Item>
      <Menu.Item key='/cutting/upload'>
        <Link onClick={onLinkClick} to='/cutting/upload'>Cutting</Link>
      </Menu.Item>
      <Menu.Item key='/numbering/upload'>
        <Link onClick={onLinkClick} to='/numbering/upload'>Numbering</Link>
      </Menu.Item>
      <Menu.Item key='/production/upload'>
        <Link onClick={onLinkClick} to='/production/upload'>Production</Link>
      </Menu.Item>
      <Menu.Item key='/embroidery/upload'>
        <Link onClick={onLinkClick} to='/embroidery/upload'>Embroidery</Link>
      </Menu.Item>
      <Menu.Item key='/packaging/upload'>
        <Link onClick={onLinkClick} to='/packaging/upload'>Packaging</Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key='/qaqc/viewreport'>
        <Link onClick={onLinkClick} to='/qaqc/viewreport'>View Report</Link>
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
