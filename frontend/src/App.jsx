

import Header from "./components/Header";
import useKeyboardShortcut from "./hooks/useKeyboardShortcut";

function App() {
  useKeyboardShortcut();
  return <Header />;
}

export default App;
