import React from 'react';
import { Navbar } from 'react-bootstrap';

import slackLogo from '../slack.svg';

const AppNavBar: React.SFC<{}> = () => {
    return (
        <Navbar className="flex items-center justify-between flex-wrap bg-black fixed-top">
        <Navbar.Brand>
          <img className="w-8 h-8 mr-4 ml-4" src={slackLogo}/>
          <span className="text-xl tracking-tight text-white overpass text-semibold">
            Unsplash Gallery
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    );
}

export { AppNavBar };
