import { useState } from 'react';
import './Filters.scss';

interface FiltersProps {
  onFilter: (selectedTypes: string[]) => void;
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
