import React from "react";

import slackLogo from "../Unslack.png";

export interface IProps {
  onSelect?: (event: any) => void;
}

const AppNavBar: React.SFC<IProps> = props => {
  return (
    <nav className="flex bg-black px-4 py-3 sticky-top roboto">
      <div className="flex items-start text-white m-auto md:mr-6">
        <img
          className="fill-current mr-2"
          height={40}
          width={147}
          src={slackLogo}
        />
      </div>
    </nav>
  );
};

export { AppNavBar };
