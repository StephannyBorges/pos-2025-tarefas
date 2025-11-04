// dom.js

// Seleciona os elementos da DOM uma única vez
const pokemonListContainer = document.getElementById('pokemon-list');
const pokemonDetailsContainer = document.getElementById('pokemon-details');

/**
 * Renderiza a lista de Pokémon na sidebar...
 * @param {Array} pokemons - A lista de pokémons (com name e url)
 * @param {Function} onPokemonClick - Função a ser chamada quando um Pokémon é clicado.
 */
export function renderPokemonList(pokemons, onPokemonClick) {
    pokemonListContainer.innerHTML = ''; // Limpa a lista
    
    if (!pokemons) {
        pokemonListContainer.innerHTML = '<li>Falha ao carregar Pokémons.</li>';
        return;
    }

    pokemons.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        
        // Em vez de chamar a API, chama o "callback" que o main.js passou
        listItem.addEventListener('click', () => {
            onPokemonClick(pokemon.url);
        });
        
        pokemonListContainer.appendChild(listItem);
    });
}

/**
 * Renderiza os detalhes de um Pokémon no container principal.
 * @param {Object} pokemon - O objeto completo do Pokémon.
 */
export function renderPokemonDetails(pokemon) {
    if (!pokemon) {
        pokemonDetailsContainer.innerHTML = '<p>Selecione um Pokémon para ver os detalhes.</p>';
        return;
    }

    const animatedSprite = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
    const highQualitySprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    pokemonDetailsContainer.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${animatedSprite || highQualitySprite}" alt="${pokemon.name}">
        <div class="pokemon-stats">
            <div class="stat">
                <span>ID:</span>
                <div class="bar">
                    <div class="fill" style="width: ${pokemon.id / 10}%;"><span>${(pokemon.id / 10).toFixed(1)}%</span></div>
                </div>
            </div>
            <div class="stat">
                <span>Altura:</span>
                <div class="bar">
                    <div class="fill" style="width: ${pokemon.height * 10}%;"><span>${(pokemon.height * 10).toFixed(1)}%</span></div>
                </div>
            </div>
            <div class="stat">
                <span>Peso:</span>
                <div class="bar">
                    <div class="fill" style="width: ${pokemon.weight / 10}%;"><span>${(pokemon.weight / 10).toFixed(1)}%</span></div>
                </div>
            </div>
            <div class="stat">
                <span>Habilidades:</span>
                <div class="bar">
                    <div class="fill" style="width: ${pokemon.abilities.length * 20}%;"><span>${(pokemon.abilities.length * 20).toFixed(1)}%</span></div>
                </div>
            </div>
        </div>
    `;
}