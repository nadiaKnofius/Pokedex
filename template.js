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
        <div id="${i}" class="card d-flex flex-column justify-content-between align-items-center border-r-10 font-solid ${bgImg}" onclick="showDetailCard(${id})">
            <div class="w-100 card-header">
            <div class="id">#&nbsp${id}</div>
            <h2 class="poke-names font-hollow">${name}</h2>
        </div>
        <div class="card-main d-flex w-100 justify-content-between align-items-center">
        <div class="w-100">
            <div class="type ${bgType1} d-flex justify-content-center align-items-center">${type1}</div>
            <div class="type ${bgType2} d-flex justify-content-center align-items-center">${type2}</div>
        </div>
            <div class="poke-img-container">
                <img id="img1" class="poke-img" src="${img}" alt="">
            </div>
         </div>
        </div>
`
}


function showDetailCardTemplate(id, type1, type2, bgType1, bgType2, name, img, stats, weight, height){
    return `
    <div id="${id}" class="cardInDetail d-flex flex-column justify-content-between align-items-center w-100 border-r-10 font-solid">
    <div class="w-100 detail-card-header">
    <div class="id-detail">#&nbsp${id}</div>
    <h2 class="poke-names-detail font-hollow">${name}</h2>
    <div class="xmark" onclick="closeDetailCard()"><p class="arrows">&#10006</p></div>
</div>
<div class="card-main-detail d-flex w-100 justify-content-between align-items-center flex-column">
    <div class="poke-img-container-detail">
        <img id="img1" class="poke-img" src="${img}" alt="">
    </div>
<div class="w-100 d-flex justify-content-center">
    <div class="type ${bgType1} d-flex justify-content-center align-items-center">${type1}</div>
    <div class="type ${bgType2} d-flex justify-content-center align-items-center">${type2}</div>
</div>

<div class="w-100 d-flex justify-content-center">
    <div class="heightWeight">weight: ${weight} kg</div>
    <div class="heightWeight">height: ${height} cm</div>
</div>
<div class="arrow-container">
    <div class="arrow-left" onclick="previousDetailCard(${id})"><p class="arrows">&#8678</p></div> 
    <div class="arrow-right" onclick="nextDetailCard(${id})"><p class="arrows">&#8680</p></div> 
</div>
 </div>
</div>
<!-- footer -->
<div class="tab ${bgType1}">
    <button id="stats-btn" class="tablinks" onclick="openTab(event, 'stats')">Stats</button>
    <button class="tablinks" onclick="openTab(event, 'abilities')">Abilities</button>
    <button class="tablinks" onclick="openTab(event, 'evolution')">Evolution</button>
  </div>
  <!-- Tab content -->
  <div id="stats" class="tabcontent">
    <div class="stats-container d-flex w-100">
        <div class="stat">
            hp
        </div>
        <div class="progressbar">
            <div id="${stats[0].name}" class="progress ${bgType1} animated-progress" style="width: 25%" >${stats[0].value}</div>
        </div>
    </div>
    <div class="stats-container d-flex w-100">
        <div class="stat">
            attack
        </div>
        <div class="progressbar">
            <div id="${stats[1].name}" class="progress ${bgType1} animated-progress" style="width: 25%" >${stats[1].value}</div>
        </div>
    </div>
    <div class="stats-container d-flex w-100">
        <div class="stat">
            defense
        </div>
        <div class="progressbar">
            <div id="${stats[2].name}" class="progress ${bgType1} animated-progress" style="width: 25%" >${stats[2].value}</div>
        </div>
    </div>
    <div class="stats-container d-flex w-100">
        <div class="stat">
            special-attack
        </div>
        <div class="progressbar">
            <div id="${stats[3].name}" class="progress ${bgType1} animated-progress" style="width: 25%" >${stats[3].value}</div>
        </div>
    </div>
    <div class="stats-container d-flex w-100">
        <div class="stat">
            special-defense
        </div>
        <div class="progressbar">
            <div id="${stats[4].name}" class="progress ${bgType1} animated-progress" style="width: 25%" >${stats[4].value}</div>
        </div>
    </div>
    <div class="stats-container d-flex w-100">
        <div class="stat">
            speed
        </div>
        <div class="progressbar">
            <div id="${stats[5].name}" class="progress ${bgType1} animated-progress" style="width: 25%">${stats[5].value}</div>
        </div>
    </div>
  </div>
  
  <div id="abilities" class="tabcontent">
   
  </div>
  
  <div id="evolution" class="tabcontent">
    <h3>Evolution</h3>
    <p>In progress...</p>
  </div>
</div>
    `
}


function showLoadingGifInHTMLTemplate(){
    return  ` 
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
    <h2 class="load-text text-center">loading Pokemon, please wait</h2>
    <div class="d-flex w-100 justify-content-center"><img class="load" src="img/loading.gif" alt=""></div>
    </div>`
 }
 