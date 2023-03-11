import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Profile />} />
        <Route path="/chat" exact element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
