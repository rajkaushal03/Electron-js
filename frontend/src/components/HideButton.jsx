import { BsIncognito } from "react-icons/bs";

const HideButton = () => {
  const handleHide = () => {
    if (window.electronAPI) {
      window.electronAPI.hideBothWindows();
    }
  };
  return (
    <div className="cursor-pointer text-lg bg-gray-800 rounded-2xl p-1" onClick={handleHide}>
      <BsIncognito />
    </div>
  );
};

export default HideButton;
