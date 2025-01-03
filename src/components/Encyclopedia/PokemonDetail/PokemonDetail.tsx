import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPokemonDetailsForPage, PokemonDetailsForPage } from '../../../api/pokemonApi';

import './PokemonDetail.scss'

const PokemonDetail = () => {

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

	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	const { id } = useParams<{ id: string }>();
	const [pokemon, setPokemon] = useState<PokemonDetailsForPage>();

	useEffect(() => {
		const loadPokemon = async () => {
			try {
				const data = await fetchPokemonDetailsForPage(id!);
				setPokemon(data);
			} catch (error) {
				console.error('Error fetching pokemon details:', error);
			}
		};

		loadPokemon();
	}, [id]);

	if (!pokemon) return <p>Loading...</p>;

	return (
		<div className="pokemon-detail">
			<button className="pokemon-detail__back-button" onClick={handleBackClick}>
			←
			</button>
			<div className="pokemon-detail__main">
				<div className="pokemon-detail__avatar">
					<img src={pokemon.image} alt={pokemon.name} />
				</div>
				<div className="pokemon-detail__descr">
					<h2>{pokemon.name}</h2>
					<p>{pokemon.description}</p>
					<div className="pokemon-detail__parameters">
						<p>height: {(pokemon.height / 10).toFixed(1)} m</p>
						<p>weight: {(pokemon.weight / 10).toFixed(1)} kg</p>
					</div>
				</div>
			</div>
			<div className="pokemon-detail__submain">
				<div className="pokemon-detail__abilities">
					<h3>Abilities: </h3>
					{pokemon.abilities.map((ability) => (
						<p className="pokemon-detail__ability" key={ability}>{ability}</p>
					))}
				</div>
				<div className="pokemon-detail__types">
					<h3>Types: </h3>
					{pokemon.types.map((type: string) => (
						<span key={type} className="pokemon-detail__type">
							<img src={typeIcons[type] || '/icons/default.png'} alt={type} />
							<p>{type}</p>
						</span>
					))}
				</div>
			</div>
			<div className="pokemon-detail__stats">
				{pokemon.stats.map((stat: { name: string, value: number }) => (
				<div key={stat.name} className="pokemon-detail__stat">
					<img src={statIcons[stat.name] || '/icons/default.png'} alt={stat.name} />
					<strong>{stat.name}:</strong> <span>{stat.value}</span>
				</div>
				))}
			</div>
		</div>
	);
};

export default PokemonDetail;
