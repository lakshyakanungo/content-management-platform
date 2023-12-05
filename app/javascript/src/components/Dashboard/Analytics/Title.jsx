import React from "react";

import { Button } from "neetoui";

const Title = ({ record }) => {
  const handleClick = () => window.open(`/eui/${record.slug}`, "_blank");

  return (
    <Button className="text-left" style="link" onClick={handleClick}>
      {record.title}
    </Button>
  );
};

export default Title;
