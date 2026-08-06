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

function renderLocation(res){
    const locClone = locTemplate.content.cloneNode(true);

    const regionName = res.name;
    const formattedRegion = regionName.charAt(0).toUpperCase() + regionName.slice(1);

    // Extract all city names
    const cities = res.locations.map(location => location.name).join(", ");
    locClone.querySelector(".location").textContent = `${formattedRegion}: `;

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