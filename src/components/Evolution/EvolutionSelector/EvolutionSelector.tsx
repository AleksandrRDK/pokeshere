import { useEffect, useState } from 'react';
import './EvolutionSelector.scss';
import { fetchPokemons, fetchPokemonDetails } from '../../../api/pokemonApi';

interface Pokemon {
  id: number;
  name: string;
}

interface EvolutionSelectorProps {
  onSelect: (pokemonName: string) => void;
}

const EvolutionSelector: React.FC<EvolutionSelectorProps> = ({ onSelect }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPokemons = await fetchPokemons(50); // Загружаем первых 50 покемонов
        setPokemons(
          fetchedPokemons.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
          }))
        );
      } catch (err) {
        setError('Failed to load pokemons');
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const pokemon = await fetchPokemonDetails(searchQuery.toLowerCase()); // Поиск по имени
      setSearchedPokemon(pokemon); // Отображаем найденного покемона
    } catch (err) {
      setError('Pokemon not found');
      setSearchedPokemon(null); // Сбросить, если не найдено
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="evolution-selector">Loading...</div>;
  if (error) return <div className="evolution-selector">{error}</div>;

  return (
    <div className="evolution-selector">
      <h2>Select a Pokemon</h2>

      {/* Поиск покемона */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a Pokemon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Find</button>
      </div>

      {/* Если найден покемон */}
      {searchedPokemon && (
        <div className="searched-pokemon">
          <button onClick={() => onSelect(searchedPokemon.name)} className="pokemon-button">
            {searchedPokemon.name}
          </button>
        </div>
      )}

      {/* Список из 50 покемонов */}
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <button
            key={pokemon.id}
            onClick={() => onSelect(pokemon.name)}
            className="pokemon-button"
          >
            {pokemon.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EvolutionSelector;
