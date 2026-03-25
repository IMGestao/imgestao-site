import { Route, Routes } from "react-router-dom";
import HomePage from "./features/insights/pages/HomePage";
import InsightsPage from "./features/insights/pages/InsightsPage";
import ArticlePage from "./features/insights/pages/ArticlePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/insights/:slug" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
