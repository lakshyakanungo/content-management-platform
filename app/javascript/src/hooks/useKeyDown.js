import { useEffect } from "react";

/*  TODO: NOT USING THIS FILE RIGHT NOT
DELETE WHEN REFACTORING IF GLOBAL KEY PRESS NOT NEEDED
*/

const useKeyDown = (action, keyName = "Escape") => {
  const handelKeyDown = event => {
    if (event.code === keyName) {
      event.preventDefault();
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
