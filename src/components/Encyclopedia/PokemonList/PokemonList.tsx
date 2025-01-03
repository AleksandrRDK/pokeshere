import { useState, useEffect } from 'react';
import { fetchPokemons } from '../../../api/pokemonApi';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.scss';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonListProps {
  searchQuery: string;
  filterQuery: string[];  // Убедитесь, что это массив строк
}

const PokemonList: React.FC<PokemonListProps> = ({ searchQuery, filterQuery }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      try {
        const newPokemons = await fetchPokemons(10, offset);
        setPokemons((prev) => [...prev, ...newPokemons]);
      } catch (error) {
        console.error('Error loading pokemons:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPokemons();
  }, [offset]);

  useEffect(() => {
    let filtered = pokemons;

    // Фильтрация по запросу поиска
    if (searchQuery) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтрация по типам
    if (filterQuery.length > 0) {
      filtered = filtered.filter((pokemon) =>
        filterQuery.every((type) => pokemon.types.includes(type))
      );
    }

    setFilteredPokemons(filtered);
  }, [searchQuery, filterQuery, pokemons]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + 10);
  };

  return (
    <div className="pokemon-list">
      <div className="cards">
        {filteredPokemons.length > 0 ? (filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))) : (<div className="no-pokemons">No such Pokémon found</div>)}
      </div>
      {loading && <p>Loading...</p>}
      <button className="load-more" onClick={handleLoadMore} disabled={loading}>
        Load More
      </button>
    </div>
  );
};

export default PokemonList;
