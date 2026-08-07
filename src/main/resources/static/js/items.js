const template = document.getElementById("itemTemplate"); //The template for each div
const area = document.getElementById("itemArea"); //Area where the templates are rendered

async function fetchItem(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/item/${name}/`);
    if (!response.ok) {
        alert("Could not find Item: " + name);
        throw new Error(response.statusText);
    }
    return response.json();
}

//Get the template and updates it for the item page
function renderItemCard(res) {
    const clone = template.content.cloneNode(true);

    const itemName = res.names.find(entry => entry.language.name === "en").name;
    const itemDesc = res.flavor_text_entries.find(entry => entry.language.name === "en").text.replace(/\n/g, ' ');;
    clone.querySelector(".name").textContent = itemName;

    const sprite = res.sprites.default;
    if (sprite === null) {
        clone.querySelector(".sprite").style.display = 'none';
    } else {
        clone.querySelector(".sprite").src = sprite;
    }

    const desc = `${itemDesc}`
    clone.querySelector(".description").textContent = !desc ? 'no description' : desc;

    const cardElement = clone.querySelector(".itemResult");

    area.appendChild(clone);
}


async function searchItems() {

    const name = document.getElementById("itemField").value.toLowerCase().trim();

    if(name === '') {
        getItems();
        return;
    }

    const response = await fetch('https://pokeapi.co/api/v2/item?limit=10000');

    if (!response.ok) {
        throw new Error(`Error loading item(s): ${response.statusText}`);
    }

    try {

        const data = await response.json();

        const matchedItems = data.results.filter(item =>
        item.name.includes(name)
        );

        area.innerHTML = '';

        const itemsToFetch = matchedItems.slice(0, 10);

        for (const item of itemsToFetch) {
            const itemFetched = await fetchItem(item.name);
            renderItemCard(itemFetched);
        }


    } catch (error) {
        console.error(error);
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let numberListItem = [];
//Check if the number is inside the 'numberListItem array'
function checkArray(num){
    return !!numberListItem.includes(num);
}

//Renders the Item at the item page
async function getItems() {
    let counter;
    try {
        area.innerHTML = '';

        counter = 0;
        while (counter < 10) {
            let randID = getRandomInt(1, 200);

            //If the number is in the array, must continue to prevent repeating Pokémon
            if (checkArray(randID)) {
                continue;
            }

            const res = await fetchItem(randID);
            renderItemCard(res);
            counter++;
        }

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.endsWith("items") || path === "/") {
        getItems();
    }
});

