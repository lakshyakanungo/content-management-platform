import React from "react";

import { ActionDropdown as NeetoActionDropdown } from "@bigbinary/neetoui";

import { STATUS_OPTIONS } from "./constants";
import { buildActionItemClassName, renderActionItemPrefix } from "./utils";

const ActionDropdown = ({
  setSelectedOptionIndex,
  selectedOptionIndex,
  formikProps,
}) => {
  const { Menu, MenuItem } = NeetoActionDropdown;

  return (
    <NeetoActionDropdown
      label={STATUS_OPTIONS[selectedOptionIndex].label}
      value={STATUS_OPTIONS[selectedOptionIndex].value}
      onClick={formikProps.handleSubmit}
    >
      <Menu className="flex flex-col">
        {STATUS_OPTIONS.map((option, index) => (
          <MenuItem.Button
            disabled={!formikProps.isValid}
            key={option.value}
            className={buildActionItemClassName({
              selectedOptionIndex,
              index,
            })}
            prefix={renderActionItemPrefix({
              selectedOptionIndex,
              index,
            })}
            onClick={() => {
              setSelectedOptionIndex(index);
            }}
          >
            {option.label}
          </MenuItem.Button>
        ))}
      </Menu>
    </NeetoActionDropdown>
  );
};

export default ActionDropdown;
