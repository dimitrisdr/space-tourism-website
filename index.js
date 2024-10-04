let menuBtn = document.querySelector('.menu-btn');
let nav = document.querySelector('.navbar');
let primaryNavItems = document.querySelectorAll('.primary-navigation__item button');
let main = document.getElementsByClassName('main');

// functions 

let previousCompName = null;
async function loadComponent(compName) {
    console.log(main)
    try {
        const response= await fetch(`components/${compName}.html`)
        if (!response.ok) {
            throw new Error('failed to load component')
        }
        const thiscomponent = await response.text()
        let body = document.querySelector('body');
        body.classList.remove(previousCompName)
        body.classList.add(compName);
        previousCompName = compName
        let main = document.querySelector('main');
        if (main.classList.contains(`main--${compName}`)) return
        body.removeChild(main);
        let mainToLoad = document.createElement('main')
        mainToLoad.className = `main main--${compName} grid`
        mainToLoad.innerHTML = thiscomponent
        body.appendChild(mainToLoad)
        let secondaryNavItems = body.querySelectorAll('[role="tablist"]')
        if (!secondaryNavItems) return
        secondaryNavItems.forEach(item => item.addEventListener('click', handleSecondaryNavItems))

    } catch(err){
        console.log(err)
    }
}

async function fetchData() {
    try {
        const response = await fetch('starter-code/data.json')
        if (!response.ok){
            throw new Error('cannot get data')
        }
        const data = await response.json()

    }catch(err) {
        console.log(err)
    }
}

function changeContent(mainParent, data, dKey){
    let elToChange = mainParent[0].querySelector(`[data-name="${dKey}"]`)
    if (!elToChange) return
    if (elToChange.matches('img')) elToChange.setAttribute('src', 'starter-code/'+data[dKey]['png'].split('./')[1])
    elToChange.innerText = data[dKey]
}

 async function handleSecondaryNavItems(e) {

    let btnName = e.target.dataset.name;
    let pageName = e.target.parentElement.dataset.cat;

    try {

        const response = await fetch('starter-code/data.json');
        if (!response.ok){
            throw new Error('cannot get data');
        }

        const data = await response.json();
        const dataToUse = data[pageName].find(e => e['name'] === btnName);
        Object.keys(dataToUse).forEach(key => changeContent(main, dataToUse, key));
    }catch(err) {
        console.log(err);
    }
}

function navigateToPage(e) {

    const btn = e.target.closest('button');
    const catName = btn.dataset.name;
    loadComponent(catName)

}

function toggleMenu() {

    let isNavExpanded = nav.getAttribute('aria-expanded') === 'true' ? 'false':'true';
    nav.setAttribute('aria-expanded', isNavExpanded);
    menuBtn.setAttribute('data-opened', isNavExpanded);

}

// global event listeners

menuBtn.addEventListener('click', toggleMenu)
primaryNavItems.forEach(item => item.addEventListener('click', navigateToPage))

//  main

