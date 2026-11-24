import { Route, Routes } from "react-router-dom";
import HomePage from "./features/insights/pages/HomePage";
import InsightsPage from "./features/insights/pages/InsightsPage";
import ArticlePage from "./features/insights/pages/ArticlePage";
import ThemePage from "./features/insights/pages/ThemePage";
import GlossaryPage from "./features/insights/pages/GlossaryPage";
import InstitutionalPage from "./shared/institutional/InstitutionalPage";
import { institutionalPages } from "./shared/institutional/institutionalConfig.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/insights/:slug" element={<ArticlePage />} />
      <Route path="/temas/:themeSlug" element={<ThemePage />} />
      <Route path="/glossario" element={<GlossaryPage />} />
      {institutionalPages.map(page => <Route key={page.path} path={page.path} element={<InstitutionalPage />} />)}
      <Route path="*" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
