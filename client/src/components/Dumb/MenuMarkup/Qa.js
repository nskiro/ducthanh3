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
      <SubMenu title={<span>Pre-Production</span>}>
        <Menu.Item key='/sample/upload'>
          <Link onClick={onLinkClick} to='/sample/upload'>Sample</Link>
        </Menu.Item>
        <Menu.Item key='/marker/upload'>
          <Link onClick={onLinkClick} to='/marker/upload'>Marker</Link>
        </Menu.Item>
        <Menu.Item key='/fabricQc/upload'>
          <Link onClick={onLinkClick} to='/fabricQc/upload'>Fabric QC</Link>
        </Menu.Item>
        <Menu.Item key='/cutting/upload'>
          <Link onClick={onLinkClick} to='/cutting/upload'>Cutting</Link>
        </Menu.Item>
        <Menu.Item key='/numbering/upload'>
          <Link onClick={onLinkClick} to='/numbering/upload'>Numbering</Link>
        </Menu.Item>
        <Menu.Item key='/trim/upload'>
          <Link onClick={onLinkClick} to='/trim/upload'>Trim</Link>
        </Menu.Item>
        <Menu.Item key='/embroidery/upload'>
          <Link onClick={onLinkClick} to='/embroidery/upload'>Embroidery</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key='/sewingplan/upload'>
        <Link onClick={onLinkClick} to='/sewingplan/upload'>Sewing Plan</Link>
      </Menu.Item>
      <Menu.Item key='/production/upload'>
        <Link onClick={onLinkClick} to='/production/upload'>Production</Link>
      </Menu.Item>
      <SubMenu title={<span>Post-Production</span>}>
        <Menu.Item key='/qaqc/upload'>
          <Link onClick={onLinkClick} to='/qaqc/upload'>QA - QC</Link>
        </Menu.Item>
        
        <Menu.Item key='/packaging/upload'>
          <Link onClick={onLinkClick} to='/packaging/upload'>Packaging</Link>
        </Menu.Item>
        <Menu.Item key='/aql/upload'>
          <Link onClick={onLinkClick} to='/aql/upload'>FRI-AQL</Link>
        </Menu.Item>
      </SubMenu>
    </SubMenu>
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
    <Menu.Item key='/imex/viewreport'>
      <Link onClick={onLinkClick} to='/imex/viewreport'>Import-Export</Link>
    </Menu.Item>
    <SubMenu title={<span>Pre-Production</span>}>
      <SubMenu title={<span>Fabric</span>}>
        <Menu.Item key='/fabricWarehouse'>
          <Link onClick={onLinkClick} to='/fabricWarehouse'>Warehouse</Link>
        </Menu.Item>
        <Menu.Item key='/fabricQc/viewreport'>
          <Link onClick={onLinkClick} to='/fabricQc/viewreport'>QC</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key='/sample/viewreport'>
          <Link onClick={onLinkClick} to='/sample/viewreport'>Sample</Link>
      </Menu.Item>
      <Menu.Item key='/marker/viewreport'>
          <Link onClick={onLinkClick} to='/marker/viewreport'>Marker</Link>
      </Menu.Item>
      <Menu.Item key='/cutting/viewreport'>
          <Link onClick={onLinkClick} to='/cutting/viewreport'>Cutting</Link>
      </Menu.Item>
      <Menu.Item key='/numbering/viewreport'>
          <Link onClick={onLinkClick} to='/numbering/viewreport'>Numbering</Link>
      </Menu.Item>
      <Menu.Item key='/embroidery/viewreport'>
          <Link onClick={onLinkClick} to='/embroidery/viewreport'>Embroidery</Link>
      </Menu.Item>
      <SubMenu title={<span>Trim</span>}>
        <Menu.Item key='/trim/input'>
          <Link onClick={onLinkClick} to='/trim/input'>Input</Link>
        </Menu.Item>
        <Menu.Item key='/trim/qa'>
          <Link onClick={onLinkClick} to='/trim/qa'>QA</Link>
        </Menu.Item>
      </SubMenu>
    </SubMenu>
    <SubMenu title={<span>Production</span>}>
      <Menu.Item key='/sewingplan/viewreport'>
          <Link onClick={onLinkClick} to='/sewingplan/viewreport'>Sewing Plan</Link>
      </Menu.Item>
      <Menu.Item key='/production/viewreport'>
          <Link onClick={onLinkClick} to='/production/viewreport'>Sewing</Link>
      </Menu.Item>
      <Menu.Item key='/qaqc/viewreport'>
          <Link onClick={onLinkClick} to='/qaqc/viewreport'>QA-QC</Link>
      </Menu.Item>
      <Menu.Item key='/factoryOperation'>
          <Link onClick={onLinkClick} to='/factoryOperation'>Factory Operation</Link>
      </Menu.Item>
    </SubMenu>
    <SubMenu title={<span>Post-Production</span>}>
      <Menu.Item key='/aql/viewreport'>
          <Link onClick={onLinkClick} to='/aql/viewreport'>FRI-AQL</Link>
      </Menu.Item>
      <Menu.Item key='/packaging/viewreport'>
          <Link onClick={onLinkClick} to='/packaging/viewreport'>Packaging</Link>
      </Menu.Item>
      <Menu.Item key='/productWarehouse'>
          <Link onClick={onLinkClick} to='/productWarehouse'>Product Warehouse</Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key='/administration/viewreport'>
      <Link onClick={onLinkClick} to='/administration/viewreport'>Administration</Link>
    </Menu.Item>
    <Menu.Item key='/accounting'>
      <Link onClick={onLinkClick} to='/accounting'>Accounting</Link>
    </Menu.Item>
    <SubMenu title={<span>Compliance</span>}>
        <Menu.Item key='/compliance/humidity'>
          <Link onClick={onLinkClick} to='/compliance/humidity'>Humidity Control</Link>
        </Menu.Item>
        <Menu.Item key='/compliance/metal'>
          <Link onClick={onLinkClick} to='/compliance/metal'>Metal Calibration</Link>
        </Menu.Item>
        <Menu.Item key='/compliance/general'>
          <Link onClick={onLinkClick} to='/compliance/general'>General Report</Link>
        </Menu.Item>
    </SubMenu>
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
