import { useEffect, useState } from 'react';
import './EvolutionSelector.scss';
import { fetchPokemons } from '../../../api/pokemonApi';

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

  if (loading) return <div className="evolution-selector">Loading...</div>;
  if (error) return <div className="evolution-selector">{error}</div>;

  return (
    <div className="evolution-selector">
      <h2>Select a Pokemon</h2>
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
