import './App.scss';
import "../../styles/responsive.scss"
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import EncyclopediaPage from '../../pages/EncyclopediaPage';
import EvolutionPage from '../../pages/EvolutionPage';
import ComparisonPage from '../../pages/ComparisonPage';
import PokemonDetailPage from '../../pages/PokemonDetailPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<EncyclopediaPage />} />
          <Route path="/evolution" element={<EvolutionPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;