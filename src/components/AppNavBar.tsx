import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";

import slackLogo from "../slack.svg";

export interface IProps {
  onSelect?: (event: any) => void;
}

const AppNavBar: React.SFC<IProps> = props => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black px-4 py-3 sticky-top overpass">
      <div className="flex items-center flex-no-shrink text-white m-auto md:mr-6">
        <img
          className="fill-current w-8 h-8 mr-2"
          height={54}
          width={54}
          src={slackLogo}
        />
        <span className="font-semibold text-md tracking-tight">
          Unsplash Gallery
        </span>
      </div>
      <div className="w-full flex flex-grow md:justify-end md:mt-0 justify-center mt-2 md:w-auto">
        <div className="text-sm">
          <Button
            id="oldest"
            className="ml-2 px-4 py-2 leading-none bg-grey-darkest border rounded text-grey border-grey-darkest hover:border-transparent hover:text-white hover:bg-grey-darkest"
            onClick={props.onSelect}
          >
            Oldest
          </Button>
          <Button
            id="latest"
            className="ml-2 px-4 py-2 leading-none bg-grey-darkest border rounded text-grey border-grey-darkest hover:border-transparent hover:text-white hover:bg-grey-darkest"
            onClick={props.onSelect}
          >
            Latest
          </Button>
          <Button
            id="popular"
            className="ml-2 px-4 py-2 leading-none bg-grey-darkest border rounded text-grey border-grey-darkest hover:border-transparent hover:text-white hover:bg-grey-darkest"
            onClick={props.onSelect}
          >
            Popular
          </Button>
        </div>
      </div>
    </nav>
  );
};

export { AppNavBar };
