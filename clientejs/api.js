// api.js

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Busca a lista inicial de Pokémons.
 * @returns {Promise<Array|null>} Uma lista de resultados de pokémon ou nulo.
 */
export async function fetchPokemonList() {
    const url = `${POKEAPI_BASE_URL}?limit=50`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar a lista de Pokémon');
        }
        const data = await response.json();
        return data.results; // Retorna os dados puros

    } catch (error) {
        console.error('Erro ao buscar a lista de Pokémon:', error);
        return null; // Retorna nulo em caso de erro
    }
}

/**
 * Busca os detalhes de um Pokémon específico pela URL.
 * @param {string} url - A URL do Pokémon.
 * @returns {Promise<Object|null>} O objeto do pokémon ou nulo.
 */
export async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do Pokémon');
        }
        const pokemon = await response.json();
        return pokemon; // Retorna os dados puros

    } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
        return null; // Retorna nulo em caso de erro
    }
}