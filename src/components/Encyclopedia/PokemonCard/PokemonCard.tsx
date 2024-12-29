import './PokemonCard.scss';

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

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
  ice: '/img/icons/ice.png',
  dragon: '/img/icons/dragon.png',
  dark: '/img/icons/dark.png',
  fairy: '/img/icons/fairy.png',
  unknown: '/img/icons/unknown.png',
  shadow: '/img/icons/shadow.png',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, types }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} className="pokemon-image" />
      <h3 className="pokemon-name">{name}</h3>
      <div className="pokemon-types">
        {types.map((type) => (
          <span key={type} className="pokemon-type">
            <img
              src={typeIcons[type] || '/img/icons/default.png'}
              alt={type}
              className="type-icon"
            />
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
