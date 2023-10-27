import React from "react";

import { Modal } from "@bigbinary/neetoui";
import { Warning } from "neetoicons";

const Header = ({ category, hasMultipleCategories }) => {
  const { Header: NeetoHeader } = Modal;

  return (
    <NeetoHeader>
      <div className="flex flex-col gap-3 w-full">
        <h2 className="neeto-ui-text-gray-800">Delete Category</h2>
        <p>
          You are permanently deleting the <b>{category.name}</b> category. This
          action cannot be undone. Are you sure you wish to continue?
        </p>
        <div className="flex neeto-ui-bg-error-100 gap-1 neeto-ui-rounded p-2">
          <Warning color="#BB121A" size={48} />
          {hasMultipleCategories ? (
            <span className="">
              Category
              <b className="neeto-ui-text-error-800">
                &nbsp;{category.name}&nbsp;
              </b>
              has&nbsp;{category.articlesCount}&nbsp;articles. Before this
              category can be deleted, these articles needs to be moved to
              another category.
            </span>
          ) : (
            <span className="">
              Category
              <b className="neeto-ui-text-error-800">
                &nbsp;{category.name}&nbsp;
              </b>
              is the only category present and it has&nbsp;
              {category.articlesCount}&nbsp;articles. On proceeding, all the
              articles will be moved to a new category
              <b className="neeto-ui-text-error-800">&nbsp;General&nbsp;</b>.
            </span>
          )}
        </div>
      </div>
    </NeetoHeader>
  );
};

export default Header;
