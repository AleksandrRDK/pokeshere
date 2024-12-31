import { useState, useEffect } from "react";

import { fetchPokemons,
         fetchPokemonForComparison,
         PokemonComparisonDetails,
         fetchRandomPokemons
        } from "../../../api/pokemonApi";

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
    const [rndPokemons, setRndPokemons] = useState<{ id: number; name: string }[]>([]);
    const [rndLoading, setRndLoading] = useState(false);
    const [rndError, setRndError] = useState<string | null>(null);
    // для поиска
    const [searchQuery, setSearchQuery] = useState('');
    // для выбранного покемона
    const [searchedPokemon, setSearchedPokemon] = useState<PokemonComparisonDetails | null>(null);
    const [searchedLoading, setSearchedLoading] = useState(false);
    const [searchedError, setSearchedError] = useState<string | null>(null);

    // сравнение
    const [comparisonResult, setComparisonResult] = useState<React.ReactNode>(null);

    // так же для второго поля с покемоном
    const [pokemonsSec, setPokemonsSec] = useState<Pokemon[]>([]);
    const [loadingSec, setLoadingSec] = useState(false);
    const [errorSec, setErrorSec] = useState<string | null>(null);
    // для рандомного покемона
    const [rndPokemonsSec, setRndPokemonsSec] = useState<{ id: number; name: string }[]>([]);
    const [rndLoadingSec, setRndLoadingSec] = useState(false);
    const [rndErrorSec, setRndErrorSec] = useState<string | null>(null);
    // для поиска
    const [searchQuerySec, setSearchQuerySec] = useState('');
    // для выбранного покемона
    const [searchedPokemonSec, setSearchedPokemonSec] = useState<PokemonComparisonDetails | null>(null);
    const [searchedLoadingSec, setSearchedLoadingSec] = useState(false);
    const [searchedErrorSec, setSearchedErrorSec] = useState<string | null>(null);

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

        const getRandomPokemons = async (count: number) => {
            setRndLoading(true);
            setRndError(null);
            try {
              const randomPokemonsData = await fetchRandomPokemons(count, 898);
              setRndPokemons(randomPokemonsData);
            } catch (error) {
              setRndError('Failed to load random pokemons');
            } finally {
              setRndLoading(false);
            }
        };

        getRandomPokemons(3);

          // для второго окошка с покемоном

          const loadPokemonsSec = async () => {
            setLoadingSec(true);
            setErrorSec(null);
            try {
                const fetchedPokemons = await fetchPokemons(3);
                setPokemonsSec(
                    fetchedPokemons.map((pokemon) => ({
                        id: pokemon.id,
                        name: pokemon.name
                    }))
                );
            } catch (err) {
                setErrorSec(`Failed to load pokemons ${err}`);
            } finally {
                setLoadingSec(false);
            }
        };

        loadPokemonsSec()

        // для рандомного покемона

        const getRandomPokemonsSec = async (count: number) => {
            setRndLoadingSec(true);
            setRndErrorSec(null);
            try {
              const randomPokemonsData = await fetchRandomPokemons(count, 898);
              setRndPokemonsSec(randomPokemonsData);
            } catch (error) {
              setRndErrorSec('Failed to load random pokemons');
            } finally {
              setRndLoadingSec(false);
            }
        };

        getRandomPokemonsSec(3);
    }, []);

    if (loading || rndLoading || searchedLoading || loadingSec || rndLoadingSec || searchedLoadingSec) return <div className="evolution-selector">Loading...</div>;

    if (error || rndError || searchedError || errorSec || rndErrorSec || searchedErrorSec) {
        return <div className="error">{error || rndError || searchedError || errorSec || rndErrorSec || searchedErrorSec}</div>;
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

    const handleSelectPokemonSec = async (pokemonName: string) => {
        try {
            setSearchedErrorSec(null);
            setSearchedLoadingSec(true);
            const chainId = await fetchPokemonForComparison(pokemonName);
            setSearchedPokemonSec(chainId)
        } catch (err: any) {
            setSearchedErrorSec(err.message || 'Failed to load evolution data');
        } finally {
            setSearchedLoadingSec(false);
        }
    }

    // функционал сравнения

    const comparePokemons = (
        pokemon1: PokemonComparisonDetails | null,
        pokemon2: PokemonComparisonDetails | null
    ): void => {
        if (!pokemon1 || !pokemon2) {
            setComparisonResult(
                <p className="comparison__error">Both Pokemon must be selected for comparison.</p>
            );
            return;
        }

        const result = [];

        // Сравнение статистики
        pokemon1.stats.forEach((stat1) => {
            const stat2 = pokemon2.stats.find((stat) => stat.name === stat1.name);
            if (stat2) {
                result.push(
                    <div className="stat__comparison" key={stat1.name}>
                        <div className="stat__comparison__wrapper">
                            <img src={statIcons[stat1.name] || '/img/icons/default.png'} alt={stat1.name} className="stat__icon" />
                            <p className="stat__name">{stat1.name.toUpperCase()}</p>
                        </div>
                        <p className="stat__values">{stat1.value} vs {stat2.value}</p>
                    </div>
                );
            }
        });

        // Сравнение роста
        result.push(
            <div className="stat__comparison" key="height">
                <p className="stat__name">HEIGHT</p>
                <p className="stat__values">{pokemon1.height / 10}m vs {pokemon2.height / 10}m</p>
            </div>
        );

        // Сравнение веса
        result.push(
            <div className="stat__comparison" key="weight">
                <p className="stat__name">WEIGHT</p>
                <p className="stat__values">{pokemon1.weight / 10}kg vs {pokemon2.weight / 10}kg</p>
            </div>
        );

        // Установка результата
        setComparisonResult(<div className="comparison__details">{result}</div>);
    };



    return(
        <div className="pokemon">
            <div className="pokemon__select">
                <div className="pokemon__wrapper">
                    <h2>Select a Pokemon</h2>
                    <div className="pokemon-list">
                        <div className="pokemon-list__targeted">
                            {pokemons.map((pokemon) => (
                                <button
                                    key={pokemon.id}
                                    onClick={() => {handleSelectPokemon(pokemon.name)}}
                                    className="pokemon-list__btn"
                                >
                                    {pokemon.name}
                                </button>
                            ))}
                        </div>
                        <div className="pokemon-list__random">
                            {rndPokemons.map((pokemon) => (
                                <button
                                    key={pokemon.id}
                                    onClick={() => handleSelectPokemon(pokemon.name)}
                                    className="pokemon-list__btn"
                                >
                                    {pokemon.name}
                                </button>
                            ))}
                        </div>
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
                </div>
                <div className="comparison">
                    <button
                        className="comparison__btn"
                        onClick={() => comparePokemons(searchedPokemon, searchedPokemonSec)}
                    >
                        Compare
                    </button>
                </div>
                <div className="pokemon__wrapper">
                    <h2>Select a Pokemon</h2>
                    <div className="pokemon-list">
                        <div className="pokemon-list__targeted">
                            {pokemonsSec.map((pokemon) => (
                                <button
                                    key={pokemon.id}
                                    onClick={() => {handleSelectPokemonSec(pokemon.name)}}
                                    className="pokemon-list__btn"
                                >
                                    {pokemon.name}
                                </button>
                            ))}
                        </div>
                        <div className="pokemon-list__random">
                            {rndPokemonsSec.map((pokemon) => (
                                <button
                                    key={pokemon.id}
                                    onClick={() => handleSelectPokemonSec(pokemon.name)}
                                    className="pokemon-list__btn"
                                >
                                    {pokemon.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="search-bar">
                        <input
                        type="text"
                        placeholder="Search for a Pokemon"
                        value={searchQuerySec}
                        onChange={(e) => setSearchQuerySec(e.target.value)}
                        />
                        <button onClick={() => {handleSelectPokemonSec(searchQuerySec)}}>Find</button>
                    </div>
                </div>
            </div>
            <div className="comparison">
                {comparisonResult && (
                    <div className="comparison__result">
                        {comparisonResult}
                    </div>
                )}
            </div>
            <div className="pokemon__comparison">
                <div className="pokemon__wrapper">
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
                <div className="pokemon__wrapper">
                    {searchedPokemonSec && (
                        <div className="pokemon">
                            <div className="pokemon__main">
                                <img src={searchedPokemonSec.image} alt={searchedPokemonSec.name} className="pokemon__img"/>
                                <h2 className="pokemon__name">{searchedPokemonSec.name}</h2>
                            </div>
                            <div className="pokemon__parameters">
                                <p>height: {(searchedPokemonSec.height / 10).toFixed(1)} m</p>
                                <p>weight: {(searchedPokemonSec.weight / 10).toFixed(1)} kg</p>
                            </div>
                            <div className="pokemon__abilities">
                                <h3>Abilities: </h3>
                                {searchedPokemonSec.abilities.map((ability) => (
                                    <p className="pokemon__ability" key={ability}>{ability}</p>
                                ))}
                            </div>
                            <div className="pokemon__types">
                                <h3>Types: </h3>
                                {searchedPokemonSec.types.map((type: string) => (
                                    <span key={type} className="pokemon__type">
                                        <img src={typeIcons[type] || '/icons/default.png'} alt={type} />
                                        {type}
                                    </span>
                                ))}
                            </div>
                            <div className="pokemon__stats">
                                {searchedPokemonSec.stats.map((stat: { name: string, value: number }) => (
                                <div key={stat.name} className="pokemon__stat">
                                    <img src={statIcons[stat.name] || '/icons/default.png'} alt={stat.name} />
                                    <strong>{stat.name}:</strong> {stat.value}
                                </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PokemonComparison;