import './App.scss';
import Navigation from '../Navigation/Navigation';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import EncyclopediaPage from '../../pages/EncyclopediaPage';
import EvolutionPage from '../../pages/EvolutionPage';
import ComparisonPage from '../../pages/ComparisonPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<EncyclopediaPage />} />
          <Route path="/evolution" element={<EvolutionPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;