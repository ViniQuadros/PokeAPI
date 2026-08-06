const locTemplate = document.getElementById("locationsTemplate");

//Get region
async function fetchRegion(region) {
    const response = await fetch(`https://pokeapi.co/api/v2/region/${region}/`);
    if (!response.ok) {
        alert("Could not find region: " + region);
        throw new Error(response.statusText);
    }
    return response.json();
}

//Get Pokedex
async function fetchPokedex(url) {
    const response = await fetch(url);
    if (!response.ok) {
        alert("Could not find url: " + url);
        throw new Error(response.statusText);
    }
    return response.json();
}

async function renderLocation(res){
    const locClone = locTemplate.content.cloneNode(true);

    const pokemon = document.getElementById("pokemonByRegion");
    const pokedexUrl = res.pokedexes?.[0]?.url;

    if (pokedexUrl) {
        // Fetch the pokedex to get the pokemon by region
        const pokedexResponse = await fetchPokedex(pokedexUrl);
        const entries = pokedexResponse?.pokemon_entries || [];

        if (entries.length > 0) {
            // Select 5 random pokemon
            const randomNames = [];
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * entries.length);
                const randomName = entries[randomIndex].pokemon_species.name;
                randomNames.push(randomName.charAt(0).toUpperCase() + randomName.slice(1));
            }

            pokemon.textContent = "Some Pokémon of this region: " + randomNames.join(", ");
        } else {
            pokemon.textContent = "No Pokédex entries found for this region.";
        }
    } else {
        pokemon.textContent = "No Pokédex available for this region.";
    }

    const regionName = res.name;
    const formattedRegion = regionName.charAt(0).toUpperCase() + regionName.slice(1);

    // Extract all city names
    const cities = res.locations.map(location => location.name).join(", ");
    const generation = res.main_generation?.name;
    if (generation) {
        locClone.querySelector(".location").textContent = `${formattedRegion}(${generation}): `;
    } else {
        locClone.querySelector(".location").textContent = `${formattedRegion}: `;
    }

    const citiesList = locClone.querySelector(".cities");
    res.locations.forEach(location => {
        const li = document.createElement("li");
        const name = location.name;
        li.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        citiesList.appendChild(li);
    });

    area.appendChild(locClone);
}

async function findRegion(button){
    try {
        area.innerHTML = '';

        const btnValue = button.textContent;

        const res = await fetchRegion(btnValue);
        renderLocation(res);
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getAllRegions();
});