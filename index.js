let menuBtn = document.querySelector('.menu-btn');
let nav = document.querySelector('.navbar');
let primaryNavItems = document.querySelectorAll('.primary-navigation__item button');
let main = document.getElementsByClassName('main')[0];
let body = document.querySelector('body')
// functions 

let previousCompName = 'home';


function loadComponent(compName){

    const main = document.querySelector('main')
    const body = document.querySelector('body')
    main.classList.add('fade-out')
    main.addEventListener('transitionend', async function trackTransitionEnd() {
        main.removeEventListener('transitionend', trackTransitionEnd)
        const response = await fetch(`components/${compName}.html`)
        const thiscomponent = await response.text()
        main.innerHTML = thiscomponent;
        main.classList.remove('fade-out', `main--${previousCompName}`)
        body.classList.remove(previousCompName)
        body.classList.add(compName)
        main.classList.add(`main--${compName}`)
        previousCompName = compName
        let secondaryNavItems = body.querySelectorAll('[role="tablist"]')
        if (!secondaryNavItems) return
        secondaryNavItems.forEach(item => item.addEventListener('click', handleSecondaryNavItems))
    })
}


function changeContent(mainParent, data, dKey){
    let elToChange = mainParent.querySelector(`[data-name="${dKey}"]`)

    if (!elToChange) return

    if (elToChange.matches('picture')){
        let picElements = elToChange.children ;

        for (let i=0; i < picElements.length; i++){
            
            const attrToChange = picElements[i].matches('source') ? 'srcset': 'src';
            const dataForUpdate = picElements[i].matches('source') ? data[dKey][Object.keys(data[dKey])[1]]: data[dKey][Object.keys(data[dKey])[0]];
            picElements[i].setAttribute(attrToChange, 'starter-code/'+dataForUpdate.split('./')[1]);
        
        }

    }else {

        elToChange.innerText = data[dKey];

    }

}

 async function handleSecondaryNavItems(e) {
    let thisBtn = e.target.closest('button')
    let btnName = thisBtn.dataset.name;
    let pageName = thisBtn.parentElement.dataset.cat;
    let allItems = Array.from(thisBtn.parentElement.children)

    allItems.forEach(item => item.setAttribute('aria-selected',false))
    e.target.setAttribute('aria-selected', true)
    try {

        const response = await fetch('starter-code/data.json');

        if (!response.ok){
            throw new Error('cannot get data');
        }
        main.classList.add('fade-out')
        main.addEventListener('transitionend', async function handleTransitions(){
            main.removeEventListener('transitionend', handleTransitions)
            const data = await response.json();
            const dataToUse = data[pageName].find(e => e['name'] === btnName);
            Object.keys(dataToUse).forEach(key => changeContent(main, dataToUse, key, pageName));
            const images = Array.from(main.querySelectorAll('img'))
            console.log(images)
            await Promise.all(images.map(img=> {
                return new Promise(resolve => {
                    if (img.complete){
                        resolve()
                    }else {
                        img.onload = resolve
                        img.onerror = resolve
                    }
                })
            }));
            main.classList.remove('fade-out')
        })

    }catch(err) {
        console.log(err);
    }
}

function navigateToPage(e) {
    const btn = e.target.closest('button');
    let btnParentLi = btn.parentElement;
    let liParentChildren = Array.from(btn.parentElement.parentElement.children);
    liParentChildren.forEach(child => child.setAttribute('aria-selected', 'false'))
    btnParentLi.setAttribute('aria-selected', 'true')
    const catName = btn.dataset.name;
    loadComponent(catName);
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

