import { ImExit } from "react-icons/im";

const ExitButton = () => {
  const handleExit = () => {
    if (window.electronAPI) {
      window.electronAPI.exitApp();
    }
  };
  return (
    <div className="cursor-pointer text-lg text-red-500" onClick={handleExit}>
      <ImExit />
    </div>
  );
};

export default ExitButton;
