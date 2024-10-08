let menuBtn = document.querySelector('.menu-btn');
let nav = document.querySelector('.navbar');
let primaryNavItems = document.querySelectorAll('.primary-navigation__item button');
let main = document.getElementsByClassName('main');

// functions 

let previousCompName = null;
async function loadComponent(compName) {

    try {
        const response= await fetch(`components/${compName}.html`)
        if (!response.ok) {
            throw new Error('failed to load component');
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

function changeContent(mainParent, data, dKey, category){
    let elToChange = mainParent[0].querySelectorAll(`[data-name="${dKey}"]`)

    if (!elToChange.length === 0) return
    elToChange.forEach(e=> {
        if (e.matches('img')){

            if (category !== 'tech'){
                e.setAttribute('src', 'starter-code/'+data[dKey]['png'].split('./')[1])
            } else {
                e.setAttribute('src', 'starter-code/'+data[dKey]['landscape'].split('./')[1])
            }
    
        }else if (e.matches('source')) {
    
            e.setAttribute('srcset', 'starter-code/'+data[dKey]['portrait'].split('./')[1])
    
        }else {
            e.innerText = data[dKey]
        }
    })
    
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

        const data = await response.json();
        const dataToUse = data[pageName].find(e => e['name'] === btnName);

        Object.keys(dataToUse).forEach(key => changeContent(main, dataToUse, key, pageName));
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

