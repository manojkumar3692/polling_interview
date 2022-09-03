import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Polls from "./pages/Polls";
import PollResult from "./component/PollResult";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/polls" element={<Polls />}>
            <Route path=":id" element={<PollResult />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
