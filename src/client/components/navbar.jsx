import React, {PropTypes} from 'react';

const Navbar = props => {
  const navItems = [
    {
      imagePath: 'player',
      state: 'PLAYER_SETTINGS',
      text: 'PLAYER SETTINGS'
    },
    {
      imagePath: 'lobby',
      state: 'LOBBIES',
      text: 'LOBBIES'
    },
    {
      imagePath: 'controls',
      state: 'CONTROLS',
      text: 'HOW TO PLAY'
    }
  ];
  return (
    <nav className='navbar'>
      {_.map(navItems, navItem => {
        return (
          <NavItem {...navItem}
            active={props.navState === navItem.state}
            key={navItem.state}
            setNavState={props.setNavState}
          />
        );
      })}
    </nav>
  );
};

Navbar.propTypes = {
  navState: PropTypes.string,
  setNavState: PropTypes.func,
};

const NavItem = props => {
  const className = props.active ? 'active' : '';
  return (
    <div
      className='navbar-item'
      onClick={() => {
        props.setNavState(props.state);
      }}>
      <div className={`img ${props.imagePath} ${className}`} />
      <p className={className}>{props.text}</p>
    </div>
  );
};

NavItem.propTypes = {
  active: PropTypes.bool,
  imagePath: PropTypes.string,
  setNavState: PropTypes.func,
  state: PropTypes.string,
  text: PropTypes.string
};

module.exports = Navbar;
