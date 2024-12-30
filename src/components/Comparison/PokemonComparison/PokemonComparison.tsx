import { useState, useEffect } from "react";

import { fetchPokemons, fetchRandomPokemon, RandomPokemon, fetchPokemonForComparison, PokemonComparisonDetails} from "../../../api/pokemonApi";

import "./PokemonComparison.scss";

interface Pokemon {
    id: number;
    name: string;
}

const PokemonComparison = () => {

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
    // для покемонов
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // для рандомного покемона
    const [rndPokemon, setRndPokemon] = useState<RandomPokemon>();
    const [rndLoading, setRndLoading] = useState(false);
    const [rndError, setRndError] = useState<string | null>(null);
    // для поиска
    const [searchQuery, setSearchQuery] = useState('');
    // для выбранного покемона
    const [searchedPokemon, setSearchedPokemon] = useState<PokemonComparisonDetails | null>(null);
    const [searchedLoading, setSearchedLoading] = useState(false);
    const [searchedError, setSearchedError] = useState<string | null>(null);

    useEffect(() => {
        const loadPokemons = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedPokemons = await fetchPokemons(3);
                setPokemons(
                    fetchedPokemons.map((pokemon) => ({
                        id: pokemon.id,
                        name: pokemon.name
                    }))
                );
            } catch (err) {
                setError(`Failed to load pokemons ${err}`);
            } finally {
                setLoading(false);
            }
        };

        loadPokemons()

        // для рандомного покемона

        const getRandomPokemon = async () => {
            setRndLoading(true);
            setRndError(null);
            try {
              const randomPokemonData = await fetchRandomPokemon(898);
              setRndPokemon(randomPokemonData);
            } catch (error) {
              setRndError('Failed to load random pokemon');
            } finally {
              setRndLoading(false);
            }
          };

          getRandomPokemon();
    }, []);

    if (loading || rndLoading || searchedLoading) return <div className="evolution-selector">Loading...</div>;

    if (error) {
        return <div className="error">{error}</div>;
    }
    if (rndError) {
        return <div className="error">{rndError}</div>;
    }
    if (searchedError) {
        return <div className="error">{searchedError}</div>;
    }

    const handleSelectPokemon = async (pokemonName: string) => {
        try {
            setSearchedError(null);
            setSearchedLoading(true);
            const chainId = await fetchPokemonForComparison(pokemonName);
            setSearchedPokemon(chainId)
        } catch (err: any) {
            setSearchedError(err.message || 'Failed to load evolution data');
        } finally {
            setSearchedLoading(false);
        }
    }

    return(
        <div className="pok-comparsion">
            <h2>Select a Pokemon</h2>
            <div className="pokemon-list">
                {pokemons.map((pokemon) => (
                    <button
                        key={pokemon.id}
                        onClick={() => {handleSelectPokemon(pokemon.name)}}
                        className="pokemon-list__btn"
                    >
                        {pokemon.name}
                    </button>
                ))}
                {rndPokemon && (
                    <button
                        key={rndPokemon.id}
                        onClick={() => {handleSelectPokemon(rndPokemon.name)}}
                        className="pokemon-list__btn"
                    >
                        {rndPokemon.name}
                    </button>
                )}
            </div>
            <div className="search-bar">
                <input
                type="text"
                placeholder="Search for a Pokemon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => {handleSelectPokemon(searchQuery)}}>Find</button>
            </div>
            {searchedPokemon && (
                <div className="pokemon">
                    <div className="pokemon__main">
                        <img src={searchedPokemon.image} alt={searchedPokemon.name} className="pokemon__img"/>
                        <h2 className="pokemon__name">{searchedPokemon.name}</h2>
                    </div>
                    <div className="pokemon__parameters">
                        <p>height: {(searchedPokemon.height / 10).toFixed(1)} m</p>
                        <p>weight: {(searchedPokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                    <div className="pokemon__abilities">
                        <h3>Abilities: </h3>
                        {searchedPokemon.abilities.map((ability) => (
                            <p className="pokemon__ability" key={ability}>{ability}</p>
                        ))}
                    </div>
                    <div className="pokemon__types">
                        <h3>Types: </h3>
                        {searchedPokemon.types.map((type: string) => (
                            <span key={type} className="pokemon__type">
                                <img src={typeIcons[type] || '/icons/default.png'} alt={type} />
                                {type}
                            </span>
                        ))}
                    </div>
                    <div className="pokemon__stats">
                        {searchedPokemon.stats.map((stat: { name: string, value: number }) => (
                        <div key={stat.name} className="pokemon__stat">
                            <img src={statIcons[stat.name] || '/icons/default.png'} alt={stat.name} />
                            <strong>{stat.name}:</strong> {stat.value}
                        </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PokemonComparison;