import { useState, useEffect } from 'react';
import { fetchRandomPokemon } from '../../../api/pokemonApi';
import './RandomPokemon.scss';

const RandomPokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const typeIcons: Record<string, string> = {
    normal: '/img/icons/normal.png',
    fighting: '/img/icons/fighting.png',
    flying: '/img/icons/flying.png',
    poison: '/img/icons/poison.png',
    ground: '/img/icons/ground.png',
    rock: '/img/icons/rock.png',
    bug: '/img/icons/bug.png',
    ghost: '/img/icons/ghost.png',
    steel: '/img/icons/steel.png',
    fire: '/img/icons/fire.png',
    water: '/img/icons/water.png',
    grass: '/img/icons/leaf.png',
    electric: '/img/icons/lightning.png',
    psychic: '/img/icons/psychic.png',
    ice: '/icons/img/ice.png',
    dragon: '/img/icons/dragon.png',
    dark: '/img/icons/dark.png',
    fairy: '/img/icons/fairy.png',
    unknown: '/img/icons/unknown.pngimg/',
    shadow: '/img/icons/shadow.png',
  };

  const statIcons: Record<string, string> = {
    hp: '/img/icons/stats/heart.png',
    attack: '/img/icons/stats/sword.png',
    defense: '/img/icons/stats/shield.png',
    'special-attack': '/img/icons/stats/magic-wand.png',
    'special-defense': '/img/icons/stats/armor.png',
    speed: '/img/icons/stats/speedometer.png',
  };

  useEffect(() => {
    const getRandomPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const randomPokemonData = await fetchRandomPokemon(898);
        setPokemon(randomPokemonData);
      } catch (error) {
        setError('Failed to load random pokemon');
      } finally {
        setLoading(false);
      }
    };

    getRandomPokemon();
  }, []);

  const handleNewRandomPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const randomPokemonData = await fetchRandomPokemon(898);
      setPokemon(randomPokemonData);
    } catch (error) {
      setError('Failed to load random pokemon');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="random-pokemon">
      {pokemon && (
        <>
          <div className="pokemon-info">
            <div className="pokemon-main">
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                <h2 className="pokemon-name">{pokemon.name}</h2>
            </div>
            <div className="pokemon-details">
              <p className="pokemon-description">{pokemon.description}</p>
              <div className="pokemon-types">
                Types:
                {pokemon.types.map((type: string) => (
                  <span key={type} className="pokemon-type">
                    <img src={typeIcons[type] || '/icons/default.png'} alt={type} />
                    {type}
                  </span>
                ))}
              </div>
              <div className="pokemon-stats">
                {pokemon.stats.map((stat: { name: string, value: number }) => (
                  <div key={stat.name} className="pokemon-stat">
                    <img src={statIcons[stat.name] || '/icons/default.png'} alt={stat.name} />
                    <strong>{stat.name}:</strong> {stat.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="new-pokemon-button" onClick={handleNewRandomPokemon}>
            Get another random pokemon
          </button>
        </>
      )}
    </div>
  );
};

export default RandomPokemon;
