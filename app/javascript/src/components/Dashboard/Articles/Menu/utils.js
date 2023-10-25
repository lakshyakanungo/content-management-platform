export const handleKeyEvent = (event, action, code = "Escape") => {
  if (event.code === code) {
    action();
  }
};
