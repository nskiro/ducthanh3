import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

// use babel-import-plugin as specified in Ant Design Docs!
// https://ant.design/docs/react/getting-started#Import-on-Demand
import { Popover, Icon }  from 'antd';

import './styles.css';

class ResponsiveNav extends Component {
  state = {
    viewportWidth: 0,
    menuVisible: false,
  };

  componentDidMount() {
    this.saveViewportDimensions();
    window.addEventListener('resize', this.saveViewportDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveViewportDimensions);
  }

  handleMenuVisibility = (menuVisible) => {
    this.setState({ menuVisible });
  };

  saveViewportDimensions = throttle(() => {
    this.setState({
      viewportWidth: window.innerWidth,
    })
  }, this.props.applyViewportChange);

  render() {
    const MenuMarkup = this.props.menuMarkup;

    if (this.state.viewportWidth > this.props.mobileBreakPoint) {
      return <MenuMarkup activeLinkKey={this.props.activeLinkKey} />;
    }

    return (
      <Popover
        content={<MenuMarkup
          onLinkClick={() => this.handleMenuVisibility(false)}
          activeLinkKey={this.props.activeLinkKey}
          mobileVersion
          // className='to-override-mobile-menu-class'
          />
        }
        trigger='click'
        placement={this.props.placement}
        visible={this.state.menuVisible}
        onVisibleChange={this.handleMenuVisibility}
      >
        <Icon
          className='iconHamburger'
          type='menu'
        />
      </Popover>
    );
  }
}

ResponsiveNav.propTypes = {
  mobileBreakPoint: PropTypes.number,
  applyViewportChange: PropTypes.number,
  activeLinkKey: PropTypes.string,
  placement: PropTypes.string,
  menuMarkup: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

ResponsiveNav.defaultProps = {
  mobileBreakPoint: 575,
  applyViewportChange: 250,
  placement: 'bottom',
};

export default ResponsiveNav
