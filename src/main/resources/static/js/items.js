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
    const itemDesc = res.flavor_text_entries.find(entry => entry.language.name === "en").text;
    clone.querySelector(".name").textContent = itemName;
    clone.querySelector(".sprite").src = res.sprites.default;
    clone.querySelector(".description").textContent = `${itemDesc}`;

    const cardElement = clone.querySelector(".itemResult");
    cardElement.backgroundColor = '#E3F2FD';

    area.appendChild(clone);
}

async function SearchItem() {
    try {
        //Remove possible spaces from the search
        const name = document.getElementById("itemField").value.trim();
        const res = await fetchItem(name);
        area.innerHTML = '';
        renderItemCard(res);
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
            if (checkArray()) {
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

    if (path.endsWith("items.html") || path === "/") {
        getItems();
    }
});

