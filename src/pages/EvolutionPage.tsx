import { useState } from "react";
import { fetchPokemonEvolutionDetails, fetchEvolutionChain, PokemonDetails } from '../api/pokemonApi';

import EvolutionSelector from "../components/Evolution/EvolutionSelector/EvolutionSelector";
import EvolutionTree from "../components/Evolution/EvolutionTree/EvolutionTree";

const EvolutionPage = () => {
    const [evolutionChain, setEvolutionChain] = useState<PokemonDetails[]>([]);
    const [error, setError] = useState<string | null>(null); // Для отображения ошибок


    // Обработчик выбора покемона для цепочки эволюции
    const handleSelectPokemon = async (pokemonName: string) => {
        try {
        setError(null); // Сбрасываем предыдущую ошибку
        const chainId = await fetchPokemonEvolutionDetails(pokemonName); // Получаем ID цепочки эволюции
        const chainData = await fetchEvolutionChain(chainId); // Получаем данные цепочки
        setEvolutionChain(chainData); // Сохраняем данные в состоянии
        } catch (error: any) {
        setError(error.message || 'Failed to load evolution data'); // Устанавливаем сообщение об ошибке
        }
    };
    return (
        <>
            <EvolutionSelector onSelect={handleSelectPokemon} />
            {error && <p className="error-message">{error}</p>}
            <EvolutionTree evolutionChain={evolutionChain} />
        </>
    )
}

export default EvolutionPage;