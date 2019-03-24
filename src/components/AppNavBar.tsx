import React from "react";

import slackLogo from "../Unslack.png";

const AppNavBar: React.SFC<{}> = props => {
  return (
    <nav className="flex bg-black px-4 py-3 sticky-top unslack-font">
      <div className="flex items-start text-white px-4 ml-5 md:mr-6">
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
