import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import FontAwesome  from 'react-fontawesome';
import Logo from '../../../assets/images/ergobaby-logo-square.png';

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
    <Menu.Item key='/embroidery/upload'>
      <Link onClick={onLinkClick} to='/embroidery/upload'>Upload</Link>
    </Menu.Item>
    <Menu.Item key='/embroidery/viewreport'>
      <Link onClick={onLinkClick} to='/embroidery/viewreport'>View Report</Link>
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