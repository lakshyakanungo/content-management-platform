import React from "react";

import { ActionDropdown as NeetoActionDropdown } from "@bigbinary/neetoui";

import { STATUS_OPTIONS } from "./constants";
import {
  buildActionItemClassName,
  renderActionDropdownLabel,
  renderActionItemPrefix,
} from "./utils";

const ActionDropdown = ({
  article,
  setSelectedOptionIndex,
  selectedOptionIndex,
  formikProps,
  isScheduled,
}) => {
  const { Menu, MenuItem } = NeetoActionDropdown;
  const dropdownValue = STATUS_OPTIONS[selectedOptionIndex].value;
  const isDisabled = article?.status === dropdownValue && !formikProps.dirty;

  return (
    <NeetoActionDropdown
      label={renderActionDropdownLabel(selectedOptionIndex, isScheduled)}
      value={dropdownValue}
      buttonProps={{
        disabled: isDisabled,
      }}
      onClick={formikProps.handleSubmit}
    >
      <Menu className="flex flex-col">
        {STATUS_OPTIONS.map((option, index) => (
          <MenuItem.Button
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
