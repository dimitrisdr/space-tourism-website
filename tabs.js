// global variables

let tabsContainer = document.querySelector('.secondary-navigation');
let allTabs = Array.from(tabsContainer.children);


// functions

let tabFocus = 0
function changeTab(e) {

    const keyRight = 39;
    const keyLeft = 37;
    
    let thisKeyCode = e.keyCode;
    if (thisKeyCode === keyRight || thisKeyCode === keyLeft) {
        allTabs[tabFocus].setAttribute('tabindex', -1);
        const dir = thisKeyCode === keyRight ? 1 : -1;
        tabFocus = (tabFocus === 0 && thisKeyCode === keyLeft) ? (allTabs.length - 1) : (tabFocus + dir) % allTabs.length;
    }

    allTabs[tabFocus].setAttribute('tabindex', 0);
    allTabs[tabFocus].focus();
}

function changeTabPanel(e) {
    let thisBtn = e.target
    console.log(thisBtn)
}

// event listeners

tabsContainer.addEventListener('keydown', changeTab);
allTabs.forEach(tab => tab.addEventListener('click', changeTabPanel))