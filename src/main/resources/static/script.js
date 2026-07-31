const template = document.getElementById("pokemonTemplate");
const area = document.getElementById("pokeArea");

async function fetchPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

function renderPokemonCard(res) {
    const clone = template.content.cloneNode(true);

    const pokemonName = res.name;
    clone.querySelector(".name").textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    clone.querySelector(".sprite").src = res.sprites.front_default;
    clone.querySelector(".height").textContent = "Height: " + res.height;
    clone.querySelector(".weight").textContent = "Weight: " + res.weight;

    area.appendChild(clone);
}

async function SearchPokemon() {
    try {
        const name = document.getElementById("pokeField").value.trim();
        if (name.length === 0) {
            return getHomePokemons();
        }

        const res = await fetchPokemon(name);
        area.innerHTML = '';
        renderPokemonCard(res);
    } catch (error) {
        console.error(error);
    }
}

async function getHomePokemons() {
    try {
        const pokemons = ['Pikachu', 'Charmander', 'Squirtle', 'Gengar', 'Lucario', 'Togepi'];
        area.innerHTML = '';

        for (const pokemon of pokemons) {
            const res = await fetchPokemon(pokemon);
            renderPokemonCard(res);
        }
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", getHomePokemons);