let menuBtn = document.querySelector('.menu-btn');
let nav = document.querySelector('.navbar')

menuBtn.addEventListener('click', ()=> {
    let isNavExpanded = nav.getAttribute('aria-expanded') === 'true' ? 'false':'true'
    nav.setAttribute('aria-expanded', isNavExpanded)
    menuBtn.setAttribute('data-opened', isNavExpanded)
})

function fetchContent() {
    fetch('starter-code/data.json').then(response => response.json()).then(data => console.log(data))
}

fetchContent()