import {
    Insect,
    addInsect
} from './model.js'
const ADDRESS = "http://127.0.0.1:8000/items/"
const elementAdder = document.getElementById('add-button');
const count = document.getElementById('count-button');
const sort = document.getElementById('sort-button');
const sortSlider = document.querySelector(".slider");
const contentBox = document.getElementById('content');
const search = document.getElementById('search');
const clear = document.getElementById('clear');
let isOn = false;
let insects = []
let totalPrice;
elementAdder.addEventListener('click', async () => {
    let name = Math.random().toString(25).substring(7) + " Caterpillar";
    let description = "The cute, grass-eating creature wants to be your friend";
    let price = Math.floor(Math.random() * 100) + 1;
    let insect = new Insect(undefined, name, description, price);
    await fetch(ADDRESS, { method: 'POST', body: JSON.stringify(insect) })
    await Load();
    document.getElementById("search-bar").value = '';
})

count.addEventListener('click', () => {
    totalPrice = 0;
    for (let i = 0; i < insects.length; i++) {
        totalPrice += insects[i].price;
    }
    document.getElementById('net-worth-price').innerText = totalPrice + '$';
})

sort.addEventListener('click', () => {
    sortSlider.classList.toggle("active");
    if (isOn) {
        updateList(insects)
        isOn = false;
        return;
    }
    let sortList = [...insects];
    sortList.sort((a, b) => a.price - b.price);
    updateList(sortList);
    isOn = true;
})

function updateList(givenList) {
    contentBox.innerHTML = '';
    givenList.map(i => addInsect(i, Load))
}
search.addEventListener('click', () => {
    let text = document.getElementById("search-bar").value;
    let regEx = new RegExp(text, 'i');
    let searchResult = insects.filter(insect => regEx.test(insect.name) || regEx.test(insect.description));
    updateList(searchResult)
});

clear.addEventListener('click', async () => {
    document.getElementById("search-bar").value = '';
    totalPrice = 0;
    await fetch(ADDRESS, { method: 'DELETE' })
    await Load()
});
async function Load() {
    insects.length = 0;
    insects.push(...(await (await fetch(ADDRESS)).json()))
    updateList(insects);
}
window.addEventListener('load', Load)