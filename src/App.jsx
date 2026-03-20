import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Insights from "./insights/pages/Insights";
import Article from "./insights/pages/Article";
import { Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/insights/:slug" element={<Article />} />
    </Routes>
  );
}

export default App;