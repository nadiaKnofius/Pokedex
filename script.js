let allPokemon = [];
let currentbgImg;

async function init() {
    await loadfirst20Pokemon();
    showPokemonCardsInHTML();
    document.getElementById('content').onscroll = checkScrollY();
}


async function loadfirst20Pokemon() {
    for (let i = 0; i < 20; i++) {
        await fetchOnePokemon(i);
    }
}


async function add20morePokemon() {
    let maxi = allPokemon.length + 20;
    for (let i = allPokemon.length; i < maxi; i++) {
        await fetchOnePokemon(i);
    }
    add20morePokemonCardsInHTML();
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


// document.getElementById('content').onscroll = checkScrollY();



// function checkScrollY() {
//     try {
//         let scrollY = document.getElementById('content').scrollTop;
//         let lastPokemonId = allPokemon.length - 3;
//         let locationLastPokemonCard = document.getElementById(lastPokemonId).offsetTop;
//         console.log(scrollY);
//         console.log(locationLastPokemonCard);
//     }
//     catch (err) { }
// }


function showSearchInputField() {
    addClassDNone('search-icon');
    addClassDNone('search-blend');
    removeClassFadeOut('close-mark')
    removeClassFadeOut('search-input');
    addClassFadeIn('search-input');
    addClassFadeIn('close-mark');
    removeClassDNone('search-input');
    removeClassDNone('close-mark');
    document.getElementById('menu').classList.add('menuhv');
    //TODO
}


function hideSearchInputField() {
    removeClassDNone('search-icon');
    removeClassDNone('search-blend');
    removeClassFadeIn('search-input');
    addClassFadeOut('search-input');
    removeClassFadeIn('close-mark');
    addClassFadeOut('close-mark');
    setTimeout(addClassDNone, 900, 'search-input');
    setTimeout(addClassDNone, 900, 'close-mark')
    document.getElementById('search-input').value = '';
    searchPokemon();
}


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


async function checkInputLength(cardContent, input){
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
    let bgImg = typesBackgroundClasses[type1]['background-img'];
    changeBgOfDetailCard(bgImg);
    document.getElementById('detail-card').innerHTML = showDetailCardTemplate(id, type1, type2, bgType1, bgType2, name, img);
    openFirstTab( 'stats');
}

async function nextDetailCard(id){
    let nextId = id + 1;
    if (!allPokemon[id]){
        await add20morePokemon();
    }
    showDetailCard(nextId);
}


function previousDetailCard(id){
    let previousId = id - 1;
    if (previousId === 0){
        alert('Der Vorgang kann aktuell nicht ausgeführt werden. Es sind noch nicht alle Pokemon geladen')
    } else {
        showDetailCard(previousId);
    }
    
}

function changeBgOfDetailCard(bgImg){
    if(!(bgImg == currentbgImg) || !currentbgImg){
    document.getElementById('detail-card').classList.add(`${bgImg}`);
    document.getElementById('detail-card').classList.remove(`${currentbgImg}`);
    currentbgImg = bgImg;
    }
}


function closeMobileNav() {
    addClassFadeOut('mobile-nav')
    removeClassFadeIn('mobile-nav');
    setTimeout(addClassDNone, 900, 'mobile-nav')
}

function openMobilNav() {
    removeClassDNone('mobile-nav');
    removeClassFadeOut('mobile-nav');
    addClassFadeIn('mobile-nav');
}

function removeClassDNone(id) {
    document.getElementById(id).classList.remove('d-none');
}

function addClassDNone(id) {
    document.getElementById(id).classList.add('d-none');
}

function removeClassFadeIn(id) {
    document.getElementById(id).classList.remove('animateFadeIn');
}

function addClassFadeIn(id) {
    document.getElementById(id).classList.add('animateFadeIn');
}

function removeClassFadeOut(id) {
    document.getElementById(id).classList.remove('animateFadeOut');
}

function addClassFadeOut(id) {
    document.getElementById(id).classList.add('animateFadeOut');
}


function openTab(evt, tabName) {
    let tablinks;
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  function openFirstTab(tabName){
    let activeTab = document.getElementById(tabName);
    activeTab.style.display ="block";
    document.getElementById('stats-btn').classList.add('active');
  }


  function closeDetailCard(){
    addClassDNone('pokemon-details');
  }