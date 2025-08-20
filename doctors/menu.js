const mainDOM = document.getElementById("main")

const phoneMenu = document.createElement("div")

const sideBar = document.getElementById("sideBar")

const menuButton = document.getElementById("menuButton")

// copy the sideBar into the new div

phoneMenu.innerHTML = sideBar.innerHTML;
phoneMenu.style.diplay = 'flex';
phoneMenu.style.flexDirection = 'column'
phoneMenu.style.gap = "5px";
phoneMenu.style.width = '100%';

mainDOM.appendChild(phoneMenu)



