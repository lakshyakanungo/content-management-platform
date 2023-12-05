import React from "react";

import { Close, Plus } from "neetoicons";
import { Button } from "neetoui";

import EmptyLogo from "images/Empty";

const EmptyState = ({
  title,
  subtitle,
  primaryAction,
  primaryActionLabel,
  searchText = "",
}) => (
  <div className="flex h-full w-full flex-row items-start justify-start">
    <div className="m-auto w-3/5">
      <div className="m-auto mb-8 max-w-sm">
        <EmptyLogo />
      </div>
      <h2 className="mb-4 text-center text-2xl font-medium">{title}</h2>
      <p className="neeto-ui-text-gray-600 mb-6 text-center text-base font-normal leading-relaxed">
        {subtitle}
      </p>
      <div className="flex flex-row items-center justify-center">
        {primaryAction && (
          <Button
            icon={searchText ? Close : Plus}
            label={primaryActionLabel}
            size="small"
            style={searchText ? "secondary" : "primary"}
            onClick={primaryAction}
          />
        )}
      </div>
    </div>
  </div>
);

export default EmptyState;
