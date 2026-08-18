const template = document.getElementById("pokemonTemplate");
const area = document.getElementById("pokeArea");
let counter = 0;

async function searchGames() {
    try {
        area.innerHTML = '';
        const response = await fetch(`http://localhost:8080/games/pokemon`);
        const games = await response.json();
        console.log("Pokémon Games:", games);

        for (const game of games) {
            if (!game.cover?.url) continue;
            counter++;
            renderGameCard(game);
        }

        console.log(`Total de jogos retornados pela API: ${games.length}`);
        console.log(counter);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

function renderGameCard(res) {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".name").textContent = res.name;
    clone.querySelector(".cover").src = res.cover.url;

    const dataObj = new Date(res.first_release_date * 1000);
    const dataText = dataObj.toLocaleDateString("en", {
        timeZone: "UTC"
    })
    clone.querySelector(".releaseDate").textContent = "Launch date: " + dataText;

    area.appendChild(clone);
}

searchGames();