import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Типы и интерфейсы
export interface PokemonBasicInfo {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
}
export interface PokemonComparisonDetails {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
  weight: number; // Вес покемона
  height: number; // Рост покемона
}

export interface RandomPokemon extends PokemonDetails {
  description: string;
}

export interface EvolutionDetail {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionDetail[];
  is_baby: boolean;
}

export interface EvolutionChainResponse {
  chain: EvolutionDetail;
}

export interface PokemonDetailsForPage {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  abilities: string[];
  types: string[];
  stats: { name: string; value: number }[];
  description: string;
}

// Функции
export const fetchPokemons = async (limit: number = 10, offset: number = 0): Promise<PokemonDetails[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const pokemonDetailsPromises = response.data.results.map((pokemon: PokemonBasicInfo) =>
      fetchPokemonDetails(pokemon.name)
    );
    const pokemons = await Promise.all(pokemonDetailsPromises);
    return pokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw new Error('Failed to fetch pokemons');
  }
};

export const fetchPokemonDetails = async (nameOrId: string): Promise<PokemonDetails> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId}`);
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      types: response.data.types.map((type: { type: { name: string } }) => type.type.name),
      abilities: response.data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
      stats: response.data.stats.map((stat: { stat: { name: string }, base_stat: number }) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    };
  } catch (error) {
    console.error(`Error fetching details for ${nameOrId}:`, error);
    throw new Error(`Failed to fetch details for ${nameOrId}`);
  }
};

export const fetchRandomPokemon = async (maxId: number): Promise<RandomPokemon> => {
  const randomId = Math.floor(Math.random() * maxId) + 1;
  try {
    const [response, speciesResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/pokemon/${randomId}`),
      axios.get(`${API_BASE_URL}/pokemon-species/${randomId}`),
    ]);

    const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
      (entry: { language: { name: string } }) => entry.language.name === 'en'
    );

    return {
      name: response.data.name,
      types: response.data.types.map((type: { type: { name: string } }) => type.type.name),
      stats: response.data.stats.map((stat: { stat: { name: string }, base_stat: number }) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      image: response.data.sprites.front_default,
      description: descriptionEntry ? descriptionEntry.flavor_text.replace(/[\n\f]/g, ' ') : 'No description available.',
      id: response.data.id,
      abilities: response.data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
    };
  } catch (error) {
    console.error('Error fetching random pokemon:', error);
    throw new Error('Failed to fetch random pokemon');
  }
};

export const fetchPokemonEvolutionDetails = async (nameOrId: string): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species/${nameOrId}`);
    const evolutionChainUrl = response.data.evolution_chain.url;
    const chainId = evolutionChainUrl.split('/').filter(Boolean).pop();
    if (!chainId) {
      throw new Error('Invalid evolution chain URL');
    }
    return parseInt(chainId, 10);
  } catch (error) {
    console.error(`Error fetching evolution details for ${nameOrId}:`, error);
    throw new Error(`Failed to fetch evolution details for ${nameOrId}`);
  }
};

export const fetchEvolutionChain = async (chainId: number): Promise<PokemonDetails[]> => {
  try {
    const response = await axios.get<EvolutionChainResponse>(`${API_BASE_URL}/evolution-chain/${chainId}`);
    const evolutionChain: PokemonDetails[] = [];

    const traverseChain = async (chain: EvolutionDetail) => {
      const details = await fetchPokemonDetails(chain.species.name);
      evolutionChain.push(details);
      if (chain.evolves_to.length > 0) {
        await traverseChain(chain.evolves_to[0]);
      }
    };

    await traverseChain(response.data.chain);

    return evolutionChain; // Пример: [{ id: 25, name: "pikachu", image: "url" }, ...]
  } catch (error) {
    console.error(`Error fetching evolution chain with ID ${chainId}:`, error);
    throw new Error(`Failed to fetch evolution chain with ID ${chainId}`);
  }
};

export const fetchPokemonForComparison = async (nameOrId: string): Promise<PokemonComparisonDetails> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId}`);

    const { id, name, sprites, types, abilities, stats, weight, height } = response.data;

    return {
      id,
      name,
      image: sprites.front_default,
      types: types.map((type: { type: { name: string } }) => type.type.name),
      abilities: abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
      stats: stats.map((stat: { stat: { name: string }, base_stat: number }) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      weight,
      height,
    };
  } catch (error) {
    console.error(`Error fetching pokemon (${nameOrId}):`, error);
    throw new Error(`Failed to fetch pokemon (${nameOrId}).`);
  }
};

export const fetchRandomPokemons = async (count: number, maxId: number): Promise<{ id: number; name: string }[]> => {
  const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * maxId) + 1);

  try {
    const responses = await Promise.all(
      randomIds.map((id) => axios.get(`${API_BASE_URL}/pokemon/${id}`))
    );

    return responses.map((response) => ({
      id: response.data.id,
      name: response.data.name,
    }));
  } catch (error) {
    console.error('Error fetching random pokemons:', error);
    throw new Error('Failed to fetch random pokemons');
  }
};

export const fetchPokemonDetailsForPage = async (nameOrId: number | string): Promise<PokemonDetailsForPage> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId}`);
    const speciesResponse = await axios.get(`${API_BASE_URL}/pokemon-species/${nameOrId}`)

    const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
      (entry: { language: { name: string } }) => entry.language.name === 'en'
    );

    const { id, name, sprites, types, abilities, stats, weight, height} = response.data;

    return {
      id,
      name,
      image: sprites.front_default,
      types: types.map((type: { type: { name: string } }) => type.type.name),
      abilities: abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
      stats: stats.map((stat: { stat: { name: string }, base_stat: number }) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      weight,
      height,
      description: descriptionEntry ? descriptionEntry.flavor_text.replace(/[\n\f]/g, ' ') : 'No description available.',
    };
  } catch (error) {
    console.error(`Error fetching pokemon (${nameOrId}):`, error);
    throw new Error(`Failed to fetch pokemon (${nameOrId}).`);
  }
};