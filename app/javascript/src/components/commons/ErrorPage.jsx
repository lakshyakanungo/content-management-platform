import React from "react";

import { Button } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ErrorPage = ({ error }) => {
  const history = useHistory();

  // TODO: Add translations
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-2">
      <span>
        <h3>Oh oh! Some error occured!</h3>
      </span>
      <span>Status code: {error.response.status}</span>
      <Button
        className="mt-2"
        label="Go to dashboard"
        onClick={() => history.replace("/articles")}
      />
    </div>
  );
};

export default ErrorPage;
