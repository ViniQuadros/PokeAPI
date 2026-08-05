// Variables for the pagination
let currentPage = 1;
const maxPerPage = 10;
let totalPages = 1;

// Holds the full list of Pokémon
let currentTypeEntries = [];
let currentTypeName = '';

//Get the elements
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

function updateControls() {
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Renders only the Pokémon for the current page slice
async function renderTypePage() {
    try {
        area.innerHTML = '';

        const start = (currentPage - 1) * maxPerPage;
        const end = start + maxPerPage;
        const pageEntries = currentTypeEntries.slice(start, end);

        // Fetch details only for the Pokémon on this page
        const pokemonPromises = pageEntries.map(entry => fetchPokemon(entry.pokemon.name));
        const allPokemonData = await Promise.all(pokemonPromises);

        allPokemonData.forEach(pokemonData => {
            const typeClone = template.content.cloneNode(true);

            typeClone.querySelector(".name").textContent =
                pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
            typeClone.querySelector(".sprite").src = pokemonData.sprites.front_default;
            typeClone.querySelector(".type").textContent = `Type: ${currentTypeName}`;

            const cardElement = typeClone.querySelector(".pokeResult");
            selectCardColor(currentTypeName, cardElement);

            area.appendChild(typeClone);
        });

        //Update controls when page changed
        updateControls();
    } catch (error) {
        console.error(error);
    }
}

// Fetches the full type list once, then renders page 1
async function loadPokemonType(typeName) {
    try {
        const res = await fetchType(typeName);

        currentTypeName = typeName;
        currentTypeEntries = res.pokemon;
        currentPage = 1;
        totalPages = Math.ceil(currentTypeEntries.length / maxPerPage);

        await renderTypePage();
    } catch (error) {
        console.error(error);
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTypePage();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderTypePage();
    }
});