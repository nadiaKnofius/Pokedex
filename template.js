let typesBackgroundClasses = {
    "grass": {
        "background": "bg-grass",
        "background-img": "bg-img-grass"
    },
    "fire": {
        "background": "bg-fire",
        "background-img": "bg-img-fire"
    },
    "ice": {
        "background": "bg-ice",
        "background-img": "bg-img-ice"
    },
    "poison": {
        "background": "bg-poison",
        "background-img": "bg-img-poison"
    },
    "bug": {
        "background": "bg-bug",
        "background-img": "bg-img-bug"
    },
    "water": {
        "background": "bg-water",
        "background-img": "bg-img-water"
    },
    "flying": {
        "background": "bg-flying",
        "background-img": "bg-img-flying"
    },
    "normal": {
        "background": "bg-normal",
        "background-img": "bg-img-normal"
    },
    "electric": {
        "background": "bg-electric",
        "background-img": "bg-img-electric"
    },
    "rock": {
        "background": "bg-rock",
        "background-img": "bg-img-rock"
    },
    "dragon": {
        "background": "bg-dragon",
        "background-img": "bg-img-dragon"
    },
    "ghost": {
        "background": "bg-ghost",
        "background-img": "bg-img-ghost"
    },
    "dark": {
        "background": "bg-dark",
        "background-img": "bg-img-dark"
    },
    "steel": {
        "background": "bg-steel",
        "background-img": "bg-img-steel"
    },
    "fairy": {
        "background": "bg-fairy",
        "background-img": "bg-img-fairy"
    },
    "psychic": {
        "background": "bg-psychic",
        "background-img": "bg-img-psychic"
    },
    "fighting": {
        "background": "bg-fighting",
        "background-img": "bg-img-fighting"
    },
    "ground": {
        "background": "bg-ground",
        "background-img": "bg-img-ground"
    },
};


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