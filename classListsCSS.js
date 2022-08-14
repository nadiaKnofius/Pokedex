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
}


function hideSearchInputField() {
    let input = document.getElementById('search-input');
    input.value = '';
    removeClassDNone('search-icon');
    removeClassDNone('search-blend');
    removeClassFadeIn('search-input');
    addClassFadeOut('search-input');
    removeClassFadeIn('close-mark');
    addClassFadeOut('close-mark');
    setTimeout(addClassDNone, 900, 'search-input');
    setTimeout(addClassDNone, 900, 'close-mark')
    checkViewport();
    searchPokemon();
}


function checkViewport() {
    if (window.innerWidth < 700) {
        document.getElementById('nav-icons').style.display = "none";
    } else {
        document.getElementById('nav-icons').style.display = "block";
    }
}


function showSearchInputFieldFromMobileNav() {
    document.getElementById('nav-icons').style.display = "block";
    closeMobileNav();
    showSearchInputField();
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


function closeDetailCard() {
    addClassDNone('pokemon-details');
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


function openFirstTab(tabName) {
    let activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    document.getElementById('stats-btn').classList.add('active');
}


function changeBgOfDetailCard(bgImg) {
    if (!(bgImg == currentbgImg) || !currentbgImg) {
        document.getElementById('detail-card').classList.add(`${bgImg}`);
        document.getElementById('detail-card').classList.remove(`${currentbgImg}`);
        currentbgImg = bgImg;
    }
}
