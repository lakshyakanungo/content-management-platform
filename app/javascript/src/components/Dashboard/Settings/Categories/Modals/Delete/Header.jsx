import React from "react";

import { Modal } from "@bigbinary/neetoui";
import { Warning } from "neetoicons";
import { useTranslation, Trans } from "react-i18next";

const Header = ({ category, hasMultipleCategories }) => {
  const { Header: NeetoHeader } = Modal;

  const { name, articlesCount } = category;

  const { t } = useTranslation();

  return (
    <NeetoHeader>
      <div className="flex flex-col gap-3 w-full">
        <h2 className="neeto-ui-text-gray-800">
          {t("dashboard.settings.categories.modal.delete.header.title")}
        </h2>
        <span>
          <Trans
            components={[<b key={1} />]}
            i18nKey="dashboard.settings.categories.modal.delete.header.subtitle"
            values={{ name }}
          />
        </span>
        <div className="flex neeto-ui-bg-error-100 gap-1 neeto-ui-rounded p-2">
          <Warning color="#BB121A" size={48} />
          {hasMultipleCategories ? (
            <span>
              <Trans
                components={[<b className="neeto-ui-text-error-800" key={1} />]}
                i18nKey="dashboard.settings.categories.modal.delete.header.multiple"
                values={{ name, articlesCount }}
              />
            </span>
          ) : (
            <span>
              <Trans
                components={[<b className="neeto-ui-text-error-800" key={1} />]}
                i18nKey="dashboard.settings.categories.modal.delete.header.single"
                values={{ name, articlesCount }}
              />
            </span>
          )}
        </div>
      </div>
    </NeetoHeader>
  );
};

export default Header;
