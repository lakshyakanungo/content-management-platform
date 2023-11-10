import { useEffect } from "react";

const useKeyDown = (action, keyName = "Escape") => {
  const handelKeyDown = event => {
    if (event.code === keyName) {
      // event.preventDefault();
      action();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handelKeyDown);

    return () => {
      window.removeEventListener("keydown", handelKeyDown);
    };
  }, []);
};

export { useKeyDown };
