import './EvolutionTree.scss';
import { PokemonDetails } from '../../../api/pokemonApi';

interface EvolutionTreeProps {
  evolutionChain: PokemonDetails[];
}

const EvolutionTree: React.FC<EvolutionTreeProps> = ({ evolutionChain }) => {
  if (evolutionChain.length === 0) {
    return <p className="evolution-tree__empty">Select a Pokémon to see its evolution tree.</p>;
  }

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

  const compareEvolution = (previous: PokemonDetails, current: PokemonDetails) => {
    const changes: string[] = [];

    if (previous.types.join(', ') !== current.types.join(', ')) {
      changes.push(`Types changed: ${previous.types.join(', ')} -> ${current.types.join(', ')}`);
    }

    const abilities1 = previous.abilities.join(', ');
    const abilities2 = current.abilities.join(', ');
    if (abilities1 !== abilities2) {
      changes.push(`Abilities changed: ${abilities1} -> ${abilities2}`);
    }

    for (let i = 0; i < previous.stats.length; i++) {
      if (previous.stats[i].value !== current.stats[i].value) {
        changes.push(`Stat ${previous.stats[i].name} changed: ${previous.stats[i].value} -> ${current.stats[i].value}`);
      }
    }

    return changes;
  };

  return (
    <div className="evolution-tree">
      <h2>Evolution Tree</h2>
      <ul>
        {evolutionChain.map((pokemon, index) => {
          const changes = index > 0 ? compareEvolution(evolutionChain[index - 1], pokemon) : [];

          return (
            <li key={pokemon.id} className="evolution-tree__item">
              <div className="evolution-tree__image-container">
                <img src={pokemon.image} alt={pokemon.name} className="evolution-tree__image" />
              </div>
              <div className="evolution-tree__info">
                <div className='evolution-tree__name__wrapper'>
                  <p className="evolution-tree__name">{pokemon.name}</p>
                  <div className="evolution-tree__name__bg"></div>
                </div>
                <div className="evolution-tree__types">
                  Types:
                  {pokemon.types.map((type) => (
                    <span key={type} className="evolution-tree__type">
                      <img src={typeIcons[type] || '/icons/default.png'} alt={type} />
                      {type}
                    </span>
                  ))}
                </div>
                <div className="evolution-tree__stats">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="evolution-tree__stat">
                      <img src={statIcons[stat.name] || '/icons/default.png'} alt={stat.name} />
                      <strong>{stat.name}:</strong> {stat.value}
                    </div>
                  ))}
                </div>
                {changes.length > 0 && (
                  <div className="evolution-tree__changes">
                    <div className="evolution-tree__changes__bg"></div>
                    <h4>Changes:</h4>
                    <ul>
                      {changes.map((change, idx) => (
                        <li key={idx} className="evolution-tree__change">{change}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {index < evolutionChain.length - 1 && <span className="evolution-tree__arrow">↓</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EvolutionTree;
