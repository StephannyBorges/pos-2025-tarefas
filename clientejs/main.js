// main.js

// Importa o CSS (O Vite vai lidar com isso)
import './style.css';

// 1. Importa as funções dos nossos módulos separados
import { fetchPokemonList, fetchPokemonDetails } from './api.js';
import { renderPokemonList, renderPokemonDetails } from './dom.js';

/**
 * Esta é a função "cola" (o callback).
 * O DOM.js vai chamá-la quando um item for clicado.
 */
async function handlePokemonClick(pokemonUrl) {
    // 1. (API) Busca os detalhes
    const pokemonDetails = await fetchPokemonDetails(pokemonUrl);
    
    // 2. (DOM) Renderiza os detalhes
    renderPokemonDetails(pokemonDetails);
}

/**
 * Função principal de inicialização da aplicação.
 */
async function initApp() {
    // 1. (DOM) Limpa os detalhes para o estado inicial
    renderPokemonDetails(null); 

    // 2. (API) Busca a lista inicial
    const pokemonList = await fetchPokemonList();
    
    // 3. (DOM) Renderiza a lista e passa a função "handlePokemonClick" como callback
    renderPokemonList(pokemonList, handlePokemonClick);
}

// Inicia a aplicação.
// Não precisamos do 'DOMContentLoaded' pois scripts "type=module" já
// esperam o HTML ser carregado por padrão.
initApp();