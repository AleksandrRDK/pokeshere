import './App.scss';
import { useState } from 'react';

import Navigation from '../Navigation/Navigation';
import RandomPokemon from '../Encyclopedia/RandomPokemon/RandomPokemon';
import SearchBar from '../Encyclopedia/SearchBar/SearchBar';
import Filters from '../Encyclopedia/Filters/Filters';
import PokemonList from '../Encyclopedia/PokemonList/PokemonList';

import EvolutionSelector from '../Evolution/EvolutionSelector/EvolutionSelector';
import EvolutionTree from '../Evolution/EvolutionTree/EvolutionTree';
import { fetchPokemonEvolutionDetails, fetchEvolutionChain, PokemonDetails } from '../../api/pokemonApi';

import PokemonComparison from '../Comparison/PokemonComparison/PokemonComparison';


function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string[]>([]);
  const [evolutionChain, setEvolutionChain] = useState<PokemonDetails[]>([]);
  const [error, setError] = useState<string | null>(null); // Для отображения ошибок

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string[]) => {
    setFilterQuery(filter);
  };

  // Обработчик выбора покемона для цепочки эволюции
  const handleSelectPokemon = async (pokemonName: string) => {
    try {
      setError(null); // Сбрасываем предыдущую ошибку
      const chainId = await fetchPokemonEvolutionDetails(pokemonName); // Получаем ID цепочки эволюции
      const chainData = await fetchEvolutionChain(chainId); // Получаем данные цепочки
      setEvolutionChain(chainData); // Сохраняем данные в состоянии
    } catch (error: any) {
      setError(error.message || 'Failed to load evolution data'); // Устанавливаем сообщение об ошибке
    }
  };



  return (
    <div className="container">
      <Navigation />

      {/* Компоненты первой страницы */}
      {/* <RandomPokemon />
      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilter} />
      <PokemonList searchQuery={searchQuery} filterQuery={filterQuery} /> */}

      {/* Компоненты цепочки эволюции */}
      {/* <EvolutionSelector onSelect={handleSelectPokemon} />
      {error && <p className="error-message">{error}</p>}
      <EvolutionTree evolutionChain={evolutionChain} /> */}

        <PokemonComparison/>
    </div>
  );
}

export default App;
