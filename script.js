let allPokemon = [];
let currentbgImg;

async function init() {
    await loadfirst20Pokemon();
    showPokemonCardsInHTML();
}


async function loadfirst20Pokemon() {
    for (let i = 0; i < 20; i++) {
        await fetchOnePokemon(i);
    }
}


async function fetchOnePokemon(i) {
    let id = i + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetchData(url);
    let responseAsJson = await response.json();
    pushDataOfCurrentPokemonToArray(responseAsJson, i, id);
}


function fetchData(url) {
    return fetch(url);
}


function pushDataOfCurrentPokemonToArray(responseAsJson, i, id) {
    addBasicCardDataToArray(responseAsJson, i, id);
    addDetailDataToArray(responseAsJson, i, id);
}


/**
 * adds basic data (relevant for Pokemon card overview) to array
 * @param {object} responseAsJson response of Pokemon API as Json
 * @param {number} i index of array
 * @param {number} id id of Pokemon
 */
function addBasicCardDataToArray(responseAsJson, i, id) {
    allPokemon[i] = {
        "name": responseAsJson.name,
        "id": id,
        "img": responseAsJson.sprites.other['official-artwork'].front_default,
        "types": {
            "type1": responseAsJson.types[0].type.name,
            "type2": "",
        }
    };
    if (responseAsJson.types[1]) {
        allPokemon[i]['types']['type2'] = responseAsJson.types[1].type.name;
    }
}


function addDetailDataToArray(responseAsJson, i) {
    allPokemon[i].weight = responseAsJson.weight;
    allPokemon[i].height = responseAsJson.height;
    addStatsToArray(responseAsJson, i);
    addAbilitiesToArray(responseAsJson, i);
}


function addAbilitiesToArray(responseAsJson, i) {
    allPokemon[i].abilities = [];
    for (let j = 0; j < responseAsJson.abilities.length; j++) {
        allPokemon[i].abilities[j] = responseAsJson.abilities[j].ability.name;
    }
}


function addStatsToArray(responseAsJson, i) {
    allPokemon[i].stats = [];
    for (let j = 0; j < responseAsJson.stats.length; j++) {
        allPokemon[i].stats[j] = { "name": "", "value": "" }
        allPokemon[i].stats[j].name = responseAsJson.stats[j].stat.name;
        allPokemon[i].stats[j].value = responseAsJson.stats[j].base_stat;
    }
}


function showPokemonCardsInHTML() {
    let cardContent = document.getElementById('card-content');
    cardContent.innerHTML = '';
    let mini = 0;
    let maxi = allPokemon.length;
    getBasicCardDataFromArray(mini, maxi, cardContent);
}


async function add20morePokemon() {
    let maxi = allPokemon.length + 20;
    for (let i = allPokemon.length; i < maxi; i++) {
        await fetchOnePokemon(i);
    }
    add20morePokemonCardsInHTML();
}


function add20morePokemonCardsInHTML() {
    let cardContent = document.getElementById('card-content');
    let mini = allPokemon.length - 20;
    let maxi = allPokemon.length;
    getBasicCardDataFromArray(mini, maxi, cardContent);
}


function getBasicCardDataFromArray(mini, maxi, cardContent) {
    for (let i = mini; i < maxi; i++) {
        let type1 = allPokemon[i].types.type1;
        let type2 = allPokemon[i].types.type2;
        let bgImg = typesBackgroundClasses[type1]['background-img'];
        let bgType1 = typesBackgroundClasses[type1].background;
        let bgType2;
        if (type2.length > 1) {
            bgType2 = typesBackgroundClasses[type2]['background'];
        }
        cardContent.innerHTML += showPokemonCardsInHTMLTemplate(allPokemon[i].name, allPokemon[i].id,
            allPokemon[i].types.type1, allPokemon[i].types.type2, allPokemon[i].img, bgImg, bgType1, bgType2, i);
    }
}


/**
 * checks, if id or name is searched
 * shows all Pokemon cards, if inputfield changes to empty
 */
function searchPokemon() {
    let input = document.getElementById('search-input').value;
    if (parseInt(input)) {
        searchPokemonId(parseInt(input));
    } else if (input.length <= 0) {
        showPokemonCardsInHTML();
    } else {
        searchPokemonName(input);
    }
}


/**
 * checks, if id already exists in array
 * if not, next 20 Pokemon will be load, processing until id exists in array
 */
async function searchPokemonId(id) {
    let cardContent = document.getElementById('card-content');
    cardContent.innerHTML = '';
    indexInArray = id - 1;
    if (allPokemon[indexInArray]) {
        getBasicCardDataFromArray(indexInArray, id, cardContent);
    } else {
        cardContent.innerHTML = showLoadingGifInHTMLTemplate();
        await add20morePokemon();
        searchPokemonId(id)
    }
}


/**
 * checks, if names in array includes input (min 3 characters)
 * if not, next 20 Pokemon will be load, processing until name exists in array, which includes input
 */
function searchPokemonName(input) {
    let cardContent = document.getElementById('card-content');
    cardContent.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        let pokmonName = allPokemon[i].name;
        let id = i + 1;
        if (pokmonName.includes(input)) {
            getBasicCardDataFromArray(i, id, cardContent);
        }
    }
    checkInputLength(cardContent, input);
}


/**
 * checks, if input length has min 3 characters
 * if yes, searchPokemonName function will be called
 */
async function checkInputLength(cardContent, input) {
    if (cardContent.innerHTML === '') {
        if (input.length < 3) {
            cardContent.innerHTML = `<h2 class="load-text">please type min 3 characters</h2>`;
        } else {
            cardContent.innerHTML = showLoadingGifInHTMLTemplate();
            await add20morePokemon();
            searchPokemonName(input);
        }
    }
}


function showDetailCard(id) {
    removeClassDNone('pokemon-details');
    let indexOfArray = id - 1;
    let name = allPokemon[indexOfArray].name;
    let type1 = allPokemon[indexOfArray].types.type1;
    let type2 = allPokemon[indexOfArray].types.type2;
    let img = allPokemon[indexOfArray].img;
    let bgType1 = typesBackgroundClasses[type1].background;
    let bgType2;
    if (type2.length > 1) {
        bgType2 = typesBackgroundClasses[type2]['background'];
    }
    showDetailCardBgSettings(id, type1, type2, bgType1, bgType2, name, img, indexOfArray);
}


function showDetailCardBgSettings(id, type1, type2, bgType1, bgType2, name, img, indexOfArray) {
    let bgImg = typesBackgroundClasses[type1]['background-img'];
    let height = allPokemon[indexOfArray].height;
    let weight = allPokemon[indexOfArray].weight;
    let stats = getStatsOfCurrentPokemon(indexOfArray);
    let abilities = getAbilitiesOfCurrentPokemon(indexOfArray);
    console.log(abilities);
    changeBgOfDetailCard(bgImg);
    document.getElementById('detail-card').innerHTML = showDetailCardTemplate(id, type1, type2, bgType1, bgType2, name, img, stats, height, weight);
    addAbilitiesinHTML(abilities);
    changeWidthOfProgressBars(stats);
    openFirstTab('stats');
}


function changeWidthOfProgressBars(stats) {
    for (let i = 0; i < stats.length; i++) {
        let progressBarId = document.getElementById(`${stats[i].name}`);
        let widthOfProgress = calcWidthOfProgressBar(stats[i].value);
        progressBarId.style.width = `${widthOfProgress}%`;
    }
}


function getStatsOfCurrentPokemon(indexOfArray) {
    let stats = [];
    for (let i = 0; i < allPokemon[indexOfArray].stats.length; i++) {
        let element = allPokemon[indexOfArray].stats[i];
        stats.push(element);
    }
    return stats;
}


function getAbilitiesOfCurrentPokemon(indexOfArray) {
    let abilities = [];
    for (let i = 0; i < allPokemon[indexOfArray].abilities.length; i++) {
        let element = allPokemon[indexOfArray].abilities[i];
        abilities.push(element);
    }
    return abilities;
}


function addAbilitiesinHTML(abilities) {
    let abilityContent = document.getElementById('abilities');
    abilityContent.innerHTML = `<h3>Abilities</h3>`;
    for (let i = 0; i < abilities.length; i++) {
        let abilitiy = abilities[i];
        abilityContent.innerHTML += addAbilitiesinHTMLTemplate(abilitiy);
    }
}


function addAbilitiesinHTMLTemplate(abilitiy) {
    return `
        <p>${abilitiy}</p>
    `;
}

/**
 * shows next detail card
 * if Pokemon does not exist in array, it loads next 20 Pokemon
 */
async function nextDetailCard(id) {
    let nextId = id + 1;
    if (!allPokemon[id]) {
        await add20morePokemon();
    }
    showDetailCard(nextId);
}


/**
 * shows previous detail card
 * if Pokemon does not exist in array, no previous card will be show
 */
function previousDetailCard(id) {
    let previousId = id - 1;
    if (previousId === 0) {
        alert('Der Vorgang kann aktuell nicht ausgeführt werden. Es sind noch nicht alle Pokemon geladen')
    } else {
        showDetailCard(previousId);
    }

}


/**
 * supposition: 150 points in every stat is max
 */
function calcWidthOfProgressBar(value) {
    return (value * 100) / 150;
}


document.getElementById('content').addEventListener('scroll', () => {
    checkScrollY();
})


async function checkScrollY() {
    try {
        let scrollY = document.getElementById('content').scrollTop;
        let lastPokemonId = allPokemon.length - 10;
        let locationLastPokemonCard = document.getElementById(lastPokemonId).offsetTop;
        if (scrollY >= locationLastPokemonCard) {
            await add20morePokemon();
        }
    }
    catch (err) { }
} 
