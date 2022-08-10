let allPokemon = [];

async function init() {
   await loadfirst20Pokemon();
   showPokemonCardsInHTML(); 
}

async function loadfirst20Pokemon() {
    for (let i = 0; i < 20; i++) {
        let id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        pushDataOfCurrentPokemonToArray(responseAsJson, i, id);
    }
}

async function add20morePokemon() {
    let maxi = allPokemon.length + 20;
    for (let i = allPokemon.length; i < maxi; i++) {
        let id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        pushDataOfCurrentPokemonToArray(responseAsJson, i, id);
    }
}

function pushDataOfCurrentPokemonToArray(responseAsJson, i, id) {
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


function showPokemonCardsInHTML() {
    let cardContent = document.getElementById('card-content');
    cardContent.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        let name = allPokemon[i].name;
        let id = allPokemon[i].id;
        let type1 = allPokemon[i].types.type1;
        let type2 = allPokemon[i].types.type2;
        let img = allPokemon[i].img;
        let bgType1 = typesBackgroundClasses[type1].background;
        let bgType2;
        if (type2.length > 1){
        bgType2 = typesBackgroundClasses[type2]['background'];
        }
        let bgImg = typesBackgroundClasses[type1]['background-img'];
        cardContent.innerHTML += showPokemonCardsInHTMLTemplate(name, id, type1, type2, img, bgImg, bgType1, bgType2, i);
    }
}


function add20morePokemonCardsInHTML(){
    let cardContent = document.getElementById('card-content');
    let mini = allPokemon.length - 20;
    let maxi = allPokemon.length;
    for (let i = mini; i < maxi; i++) {
        let name = allPokemon[i].name;
        let id = allPokemon[i].id;
        let type1 = allPokemon[i].types.type1;
        let type2 = allPokemon[i].types.type2;
        let img = allPokemon[i].img;
        let bgType1 = typesBackgroundClasses[type1].background;
        let bgType2;
        if (type2.length > 1){
        bgType2 = typesBackgroundClasses[type2]['background'];
        }
        let bgImg = typesBackgroundClasses[type1]['background-img'];
        cardContent.innerHTML += showPokemonCardsInHTMLTemplate(name, id, type1, type2, img, bgImg, bgType1, bgType2, i);
    }
}


function showPokemonCardsInHTMLTemplate(name, id, type1, type2, img, bgImg, bgType1, bgType2, i) {
    return `
    <div id="${i}" class="card d-flex flex-column justify-content-between align-items-center border-r-10 font-solid ${bgImg}">
    <div class="w-100 card-header">
        <div class="id">#${id}</div>
        <h2 class="poke-names font-hollow">${name}</h2>
    </div>
    <div class="card-main d-flex w-100 justify-content-between align-items-center">
        <div class="w-100">
            <div class="type ${bgType1}">${type1}</div>
            <div class="type ${bgType2}">${type2}</div>
        </div>
        <div class="poke-img-container">
            <img id="img1" class="poke-img" src="${img}" alt="">
        </div>
    </div>
</div>
`
}


window.onscroll = checkScrollY;

function checkScrollY(){
    let scrollY = window.scrollY;
    let lastPokemonId = allPokemon.length - 1;
    let locationLastPokemonCard = document.getElementById(lastPokemonId).offsetTop;
    console.log(scrollY);
    console.log(locationLastPokemonCard);
}

























function closeMobileNav() {
    document.getElementById('mobile-nav').classList.add('animateFadeOut');
    document.getElementById('mobile-nav').classList.remove('animateFadeIn');
    setTimeout(addClassDNone, 900, 'mobile-nav')
}

function openMobilNav() {
    removeClassDNone('mobile-nav');
    document.getElementById('mobile-nav').classList.remove('animateFadeOut');
    document.getElementById('mobile-nav').classList.add('animateFadeIn');
}

function removeClassDNone(id) {
    document.getElementById(id).classList.remove('d-none');
}

function addClassDNone(id) {
    document.getElementById(id).classList.add('d-none');
}