import './PokemonCard.scss';

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
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
