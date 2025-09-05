
import { ImExit } from "react-icons/im";
import { useEffect } from "react";

function App() {

  const handleExit = () => {
    if (window.electronAPI) {
      window.electronAPI.exitApp();
    }
  }


  // Handler to hide both windows
  const handleHide = () => {
    if (window.electronAPI) {
      window.electronAPI.hideBothWindows();
    }
  };

  // Keyboard shortcut: Ctrl+\ to toggle both windows
  useEffect(() => {
    const onKeyDown = (e) => {
      // e.code === 'Backslash' is more reliable for '\\' key
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
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center w-full p-2 text-xs h-full">
        <div>K</div>
        <button className="bg-blue-500 text-white rounded px-4" onClick>Listen</button>
        <div>Ask/Question</div>
        <div className="cursor-pointer" onClick={handleHide}>Hide</div>
        <div className="cursor-pointer text-lg text-red-500" onClick={handleExit}><ImExit /></div>
      </div>
    </>
  )
}

export default App
