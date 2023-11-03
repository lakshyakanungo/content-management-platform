import React from "react";

import { useTranslation } from "react-i18next";

import EmptyState from "components/commons/EmptyState";

const Empty = ({ searchTerm, setSearchTerm, selectedCategories, history }) => {
  const { t } = useTranslation();

  return (
    <>
      {searchTerm.length ? (
        <EmptyState
          primaryAction={() => setSearchTerm("")}
          searchText={searchTerm}
          subtitle={t("dashboard.articles.page.emptyState.forSearch.subtitle")}
          primaryActionLabel={t(
            "dashboard.articles.page.emptyState.forSearch.primaryActionLabel"
          )}
          title={t("dashboard.articles.page.emptyState.forSearch.title", {
            title: searchTerm,
          })}
        />
      ) : selectedCategories.length ? (
        <EmptyState
          primaryAction={() => history.push("/articles/new")}
          title={t("dashboard.articles.page.emptyState.categoryFilter.title")}
          primaryActionLabel={t(
            "dashboard.articles.page.emptyState.categoryFilter.primaryActionLabel"
          )}
          subtitle={t(
            "dashboard.articles.page.emptyState.categoryFilter.subtitle"
          )}
        />
      ) : (
        <EmptyState
          primaryAction={() => history.push("/articles/new")}
          subtitle={t("dashboard.articles.page.emptyState.general.subtitle")}
          title={t("dashboard.articles.page.emptyState.general.title")}
          primaryActionLabel={t(
            "dashboard.articles.page.emptyState.general.primaryActionLabel"
          )}
        />
      )}
    </>
  );
};

export default Empty;
