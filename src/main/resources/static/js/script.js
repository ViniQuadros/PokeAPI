const template = document.getElementById("pokemonTemplate"); //The template for each div
const area = document.getElementById("pokeArea"); //Area where the templates are rendered

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

    area.appendChild(clone);
}

async function SearchPokemon() {
    try {
        //Remove possible spaces from the search
        const name = document.getElementById("pokeField").value.trim();
        const res = await fetchPokemon(name);
        area.innerHTML = '';
        renderPokemonCard(res);
    } catch (error) {
        console.error(error);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let numberList = [];
//Check if the number is inside the 'numberList array'
function checkArray(num){
    return !!numberList.includes(num);
}

//Renders the Pokémon at the home page
async function getHomePokemons() {
    let counter;
    try {
        area.innerHTML = '';

        counter = 0;
        while (counter < 10) {
            let randID = getRandomInt(1, 200);

            //If the number is in the array, must continue to prevent repeating Pokémon
            if (checkArray()) {
                continue;
            }

            const res = await fetchPokemon(randID);
            renderPokemonCard(res);
            counter++;
        }

    } catch (error) {
        console.error(error);
    }
}

async function findPokemonOfType(btn) {
    await loadPokemonType(btn.textContent.toLowerCase());
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.endsWith("index.html") || path === "/") {
        getHomePokemons();
    }
});