import React from "react";

import { Button } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

const NoData = () => {
  const history = useHistory();

  return (
    <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center text-center">
      <span> OOPS This route does not exist. Route back to dashboard?</span>
      <Button
        label="Go to dashboard"
        type="button"
        onClick={() => history.replace("/articles")}
      />
    </div>
  );
};

export default NoData;
