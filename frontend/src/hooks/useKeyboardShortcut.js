import { useEffect } from "react";

const useKeyboardShortcut = () => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (
        e.ctrlKey && (
          e.key === "\\" ||
          e.code === "Backslash" ||
          e.keyCode === 220
        )
      ) {
        console.log("Ctrl+\\ detected, toggling both windows");
        e.preventDefault();
        if (window.electronAPI) {
          window.electronAPI.toggleBothWindows();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
};

export default useKeyboardShortcut;
