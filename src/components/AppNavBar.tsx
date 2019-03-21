import React from 'react';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import slackLogo from '../slack.svg';

export interface IProps {
    onSelect: (event: any) => void
}

const AppNavBar: React.SFC<IProps> = (props) => {
    return (
        <Navbar
            className="flex items-center justify-between flex-wrap bg-black sticky-top overpass"
        >
            <Navbar.Brand>
            <img className="w-8 h-8 mr-4 ml-4" src={slackLogo}/>
            <span className="text-xl tracking-tight text-white text-semibold">
                Unsplash Gallery
            </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Nav>
                <Nav.Link className="text-white">
                    <Button
                        id="oldest"
                        className="bg-transparent border-white shadow"
                        onClick={props.onSelect}
                    >
                        Oldest
                    </Button>
                </Nav.Link>
                <Nav.Link className="text-white">
                    <Button
                        id="latest"
                        className="bg-transparent border-white shadow"
                        onClick={props.onSelect}
                    >
                        Latest
                    </Button>
                </Nav.Link>
                <Nav.Link className="text-white">
                    <Button
                        id="popular"
                        className="bg-transparent border-white shadow"
                        onClick={props.onSelect}
                    >
                        Popular
                    </Button>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export { AppNavBar };
