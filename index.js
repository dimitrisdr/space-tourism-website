let menuBtn = document.querySelector('.menu-btn');
let nav = document.querySelector('.navbar')

menuBtn.addEventListener('click', ()=> {
    let isNavExpanded = nav.getAttribute('aria-expanded') === 'true' ? 'false':'true'
    nav.setAttribute('aria-expanded', isNavExpanded.toString())
})