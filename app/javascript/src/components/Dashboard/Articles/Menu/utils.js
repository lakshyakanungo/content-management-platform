export const handleKeyEvent = (event, action, code = "Escape") => {
  if (event.code === code) {
    action();
  }
};

export const getMenuArticlesCount = (articleCounts, menuState) =>
  articleCounts[menuState.toLowerCase()];
