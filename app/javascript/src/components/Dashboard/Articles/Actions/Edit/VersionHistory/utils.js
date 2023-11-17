import i18n from "common/i18n";

export const buildButtonLabel = version => {
  if (version.event === "restore") {
    return i18n.t(
      "dashboard.articles.actions.edit.versionHistory.button.label.restore"
    );
  } else if (version.object.status === "draft") {
    return i18n.t(
      "dashboard.articles.actions.edit.versionHistory.button.label.drafted"
    );
  }

  return i18n.t(
    "dashboard.articles.actions.edit.versionHistory.button.label.published"
  );
};

export const buildCurrentVersionLabel = article =>
  article.status === "draft"
    ? i18n.t(
        "dashboard.articles.actions.edit.versionHistory.button.label.drafted"
      )
    : i18n.t(
        "dashboard.articles.actions.edit.versionHistory.button.label.published"
      );

export const renderCategoryName = (article, categories) => {
  const category = categories.find(
    category => category.id === article.categoryId
  );

  return category.name;
};
