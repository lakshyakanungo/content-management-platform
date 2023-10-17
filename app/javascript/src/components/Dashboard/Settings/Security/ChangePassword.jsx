import React from "react";

import { Eye } from "neetoicons";
import { Input, Button } from "neetoui";

const ChangePassword = ({ setShowChangePasswordForm }) => (
  <div>
    <Input
      disabled
      className="mb-4"
      label="Password"
      suffix={<Eye />}
      type="password"
      value="********"
    />
    <Button
      label="Change password"
      type="submit"
      onClick={() => setShowChangePasswordForm(false)}
    />
  </div>
);

export default ChangePassword;
