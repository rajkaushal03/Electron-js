import ListenButton from "./ListenButton";
import ChatLabel from "./ChatLabel";
import HideButton from "./HideButton";
import ExitButton from "./ExitButton";

const Header = () => (
  <div className="flex justify-between items-center w-full p-1 text-sm h-full">
    <img src="xing.png" alt="" className="w-5 h-5" />
    <ListenButton />
    <ChatLabel />
    <HideButton />
    <ExitButton />
  </div>
);

export default Header;
