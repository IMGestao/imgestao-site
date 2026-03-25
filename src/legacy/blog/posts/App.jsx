import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./imgestao_homepage_profissional";
import GestaoEstrategica from "./blog/posts/gestao-estrategica";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blog/gestao-estrategica"
          element={<GestaoEstrategica />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;