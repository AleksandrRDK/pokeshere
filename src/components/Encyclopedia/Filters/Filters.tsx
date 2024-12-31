import { useState } from 'react';
import './Filters.scss';

interface FiltersProps {
  onFilter: (selectedTypes: string[]) => void;
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
};

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeClick = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newSelectedTypes);
    onFilter(newSelectedTypes);
  };

  return (
    <div className="filters">
      {Object.keys(typeIcons).map((type) => (
        <button
          key={type}
          className={`filter-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
          onClick={() => handleTypeClick(type)}
        >
          <img src={typeIcons[type]} alt={type} className="filter-icon" />
          {type}
        </button>
      ))}
    </div>
  );
};

export default Filters;
