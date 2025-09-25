document.addEventListener('DOMContentLoaded', () => {
    const pokemonListContainer = document.getElementById('pokemon-list');
    const pokemonDetailsContainer = document.getElementById('pokemon-details');
    const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function fetchPokemonList(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            renderPokemonList(data.results);
        } catch (error) {
            console.error('Erro ao buscar a lista de Pokémon:', error);
        }
    }

   
    function renderPokemonList(pokemons) {
        pokemonListContainer.innerHTML = ''; 
        pokemons.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            listItem.addEventListener('click', () => fetchPokemonDetails(pokemon.url));
            pokemonListContainer.appendChild(listItem);
        });
    }

    async function fetchPokemonDetails(url) {
        try {
            const response = await fetch(url);
            const pokemon = await response.json();
            renderPokemonDetails(pokemon);
        } catch (error) {
            console.error('Erro ao buscar detalhes do Pokémon:', error);
        }
    }


    function renderPokemonDetails(pokemon) {
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

    fetchPokemonList(`${POKEAPI_BASE_URL}?limit=50`);
});