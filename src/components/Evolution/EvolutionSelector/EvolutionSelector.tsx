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

			// Проверяем, есть ли данные в localStorage
			const storedPokemons = localStorage.getItem('pokemonsEvolution');
			if (storedPokemons) {
				// Если данные есть, используем их
				setPokemons(JSON.parse(storedPokemons));
				setLoading(false);
				return;
			}

			try {
				// Если данных нет, делаем запрос к API
				const fetchedPokemons = await fetchPokemons(50);
				const pokemonList = fetchedPokemons.map((pokemon) => ({
					id: pokemon.id,
					name: pokemon.name,
				}));

				// Сохраняем данные в localStorage
				localStorage.setItem('pokemonsEvolution', JSON.stringify(pokemonList));

				// Устанавливаем покемонов в состояние
				setPokemons(pokemonList);
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
			const pokemon = await fetchPokemonDetails(searchQuery.toLowerCase());
			setSearchedPokemon(pokemon);
		} catch (err) {
			setError('Pokemon not found');
			setSearchedPokemon(null);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div className="evolution-selector">Loading...</div>;

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
			<div className="searched-pokemon__wrapper">
				{error ? (
					<div className="error-message">{error}</div>
				) : searchedPokemon ? (
					<div className="searched-pokemon">
						<button
							onClick={() => onSelect(searchedPokemon.name)}
							className="pokemon-button"
						>
							{searchedPokemon.name}
						</button>
					</div>
				) : (
					<div className="choose-message">Choose one</div>
				)}
			</div>

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
