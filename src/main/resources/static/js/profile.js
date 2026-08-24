const template = document.getElementById("pokemonTemplate"); //The template for each div
const area = document.getElementById("pokeArea");

//Get Pokémon by its name or id
async function fetchPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    if (!response.ok) {
        alert("Could not find Pokemon: " + name);
        throw new Error(response.statusText);
    }
    return response.json();
}

//Get Pokémon by its type
async function fetchType(type) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
    if (!response.ok) {
        alert("Could not find type: " + type);
        throw new Error(response.statusText);
    }
    return response.json();
}

//Change the color of the template background based on the Pokemon type
function selectCardColor(typeName, cardElement){
    switch (typeName) {
        case "fire":
            cardElement.style.backgroundColor = '#CC4343';
            break;
        case "water":
            cardElement.style.backgroundColor = '#61A7E8';
            break;
        case "bug":
            cardElement.style.backgroundColor = '#94C356';
            break;
        case "poison":
            cardElement.style.backgroundColor = '#AB51E0';
            break;
        case "fairy":
            cardElement.style.backgroundColor = '#F27EEE';
            break;
        case "psychic":
            cardElement.style.backgroundColor = '#595959';
            break;
        case "electric":
            cardElement.style.backgroundColor = '#E0DB51';
            break;
        case "grass":
            cardElement.style.backgroundColor = '#004518';
            break;
        case "ghost":
            cardElement.style.backgroundColor = '#2d325e';
            break;
        case "rock":
            cardElement.style.backgroundColor = '#80723e';
            break;
        case "ice":
            cardElement.style.backgroundColor = '#b3dbfb';
            break;
        case "ground":
            cardElement.style.backgroundColor = '#efd786';
            break;
        case "fighting":
            cardElement.style.backgroundColor = '#fb9345';
            break;
        case "dragon":
            cardElement.style.backgroundColor = '#65fadf';
            break;
        case "dark":
            cardElement.style.backgroundColor = '#334541';
            break;
        default:
            cardElement.style.backgroundColor = '#d3d3d3';
            break;
    }
}

//Get the template and updates it for the home and search pages
function renderPokemonCard(res) {
    const clone = template.content.cloneNode(true);

    const pokemonName = res.name;
    clone.querySelector(".name").textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    clone.querySelector(".sprite").src = res.sprites.front_default;
    clone.querySelector(".height").textContent = `Height: ${res.height} ft`;
    clone.querySelector(".weight").textContent = `Weight: ${res.weight} pounds`;
    clone.querySelector(".type").textContent = `Type: ${res.types[0].type.name}`;

    const cardElement = clone.querySelector(".pokeResult");
    selectCardColor(res.types[0].type.name, cardElement);

    area.replaceChildren(clone);
}

async function loadingFavPokemon() {
    if (area) {
        const favPokemon = area.dataset.favPokemon;

        if (favPokemon && favPokemon.trim() !== "") {
            try {
                const pokemonData = await fetchPokemon(favPokemon.toLowerCase());

                renderPokemonCard(pokemonData);
            } catch (error) {
                console.error("Error loading your favorite Pokémon ", error);
                area.innerHTML = "<p>Error loading your favorite Pokémon.</p>";
            }
        } else {
            area.innerHTML = "<p style='text-align: center; color: #555;'>You haven't selected a favorite Pokémon yet!</p>";
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    loadingFavPokemon();
});
