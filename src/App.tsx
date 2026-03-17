import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import GameCVPage from './pages/GameCVPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/aleql-gamedev" element={<GameCVPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
