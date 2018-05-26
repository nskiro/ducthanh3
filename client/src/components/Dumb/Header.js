import React from 'react';
import { withRouter } from 'react-router';

import MenuMarkup from './MenuMarkup/MenuMarkup';
import MenuMarkup2 from './MenuMarkup/MenuMarkup2';
import PlanningMenu from './MenuMarkup/Planning';
import QaMenu from './MenuMarkup/Qa';
import ResponsiveNav from '../Smart/ResponsiveNav/ResponsiveNav';

const Header = ({ location }) => {
  let menuType = null;
  switch(localStorage.getItem('dept')){
    /*case 'Planning':
      menuType = PlanningMenu;
      break;*/
    case 'Qa':
      menuType = QaMenu;
      break;
    case 'Leader':
      menuType = MenuMarkup;
      break;
    default:
      menuType = MenuMarkup2;
      break;
  };
  return (
    <ResponsiveNav
      activeLinkKey={location.pathname}
      menuMarkup={menuType}
      placement='bottomLeft'
    />
  );
};

export default withRouter(Header);

