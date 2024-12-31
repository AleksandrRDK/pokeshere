import { useState, useEffect } from 'react';
import { fetchRandomPokemon } from '../../../api/pokemonApi';
import './RandomPokemon.scss';

const RandomPokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const typeIcons: Record<string, string> = {
    normal: `${process.env.PUBLIC_URL}/img/icons/normal.png`,
    fighting: `${process.env.PUBLIC_URL}/img/icons/fighting.png`,
    flying: `${process.env.PUBLIC_URL}/img/icons/flying.png`,
    poison: `${process.env.PUBLIC_URL}/img/icons/poison.png`,
    ground: `${process.env.PUBLIC_URL}/img/icons/ground.png`,
    rock: `${process.env.PUBLIC_URL}/img/icons/rock.png`,
    bug: `${process.env.PUBLIC_URL}/img/icons/bug.png`,
    ghost: `${process.env.PUBLIC_URL}/img/icons/ghost.png`,
    steel: `${process.env.PUBLIC_URL}/img/icons/steel.png`,
    fire: `${process.env.PUBLIC_URL}/img/icons/fire.png`,
    water: `${process.env.PUBLIC_URL}/img/icons/water.png`,
    grass: `${process.env.PUBLIC_URL}/img/icons/leaf.png`,
    electric: `${process.env.PUBLIC_URL}/img/icons/lightning.png`,
    psychic: `${process.env.PUBLIC_URL}/img/icons/psychic.png`,
    ice: `${process.env.PUBLIC_URL}/img/icons/ice.png`,
    dragon: `${process.env.PUBLIC_URL}/img/icons/dragon.png`,
    dark: `${process.env.PUBLIC_URL}/img/icons/dark.png`,
    fairy: `${process.env.PUBLIC_URL}/img/icons/fairy.png`,
    unknown: `${process.env.PUBLIC_URL}/img/icons/unknown.png`,
    shadow: `${process.env.PUBLIC_URL}/img/icons/shadow.png`,
  };

  const statIcons: Record<string, string> = {
    hp: `${process.env.PUBLIC_URL}/img/icons/stats/heart.png`,
    attack: `${process.env.PUBLIC_URL}/img/icons/stats/sword.png`,
    defense: `${process.env.PUBLIC_URL}/img/icons/stats/shield.png`,
    'special-attack': `${process.env.PUBLIC_URL}/img/icons/stats/magic-wand.png`,
    'special-defense': `${process.env.PUBLIC_URL}/img/icons/stats/armor.png`,
    speed: `${process.env.PUBLIC_URL}/img/icons/stats/speedometer.png`,
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
