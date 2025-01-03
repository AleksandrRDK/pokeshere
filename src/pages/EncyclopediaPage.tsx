import { useState } from "react";

import Navigation from "../components/Navigation/Navigation";
import RandomPokemon from "../components/Encyclopedia/RandomPokemon/RandomPokemon";
import SearchBar from "../components/Encyclopedia/SearchBar/SearchBar";
import Filters from "../components/Encyclopedia/Filters/Filters";
import PokemonList from "../components/Encyclopedia/PokemonList/PokemonList";

const EncyclopediaPage = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filterQuery, setFilterQuery] = useState<string[]>([]);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	  const handleFilter = (filter: string[]) => {
		setFilterQuery(filter);
	  };
	return (
		<>
			<Navigation />
			<RandomPokemon />
			<SearchBar onSearch={handleSearch} />
			<Filters onFilter={handleFilter} />
			<PokemonList searchQuery={searchQuery} filterQuery={filterQuery} />
		</>
	)
}

export default EncyclopediaPage;