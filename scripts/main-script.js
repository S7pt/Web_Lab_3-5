import {
    Insect,
    AddInsect
} from './model.js'

const elementAdder = document.getElementById('add-button');
const count = document.getElementById('count-button');
const sort = document.getElementById('sort-button');
const sortSlider = document.querySelector(".slider");
const contentBox = document.getElementById('content');
const search = document.getElementById('search');
const clear=document.getElementById('clear');
let isOn = false;
let counter = 1;
let insects = [];

elementAdder.addEventListener('click', () => {
    let id = counter;
    counter += 1;
    let name = Math.random().toString(25).substring(7) + " Caterpillar";
    let description = "The cute, grass-eating creature wants to be your friend";
    let price = Math.floor(Math.random() * 100);
    let insect = new Insect(id, name, description, price);
    insects.push(insect);
    AddInsect({ id, name, price, description });
    updateList(insects);
    document.getElementById("search-bar").value = '';
})

count.addEventListener('click', () => {
    let totalPrice = 0;
    for (let i = 0; i < insects.length; i++) {
        totalPrice += insects[i].price;
    }
    document.getElementById('net-worth-price').innerText = totalPrice + '$';
})

sort.addEventListener('click', () => {
    sortSlider.classList.toggle("active");
    if (isOn) {
        updateList(insects)
        isOn=false;
        return;
    }
    let sortList = [...insects];
    sortList.sort((a, b) => a.price - b.price);
    updateList(sortList);
    isOn=true;
})

function updateList(givenList) {
    contentBox.innerHTML = '';
    for (let i = 0; i < givenList.length; i++) {
        let id = givenList[i].id;
        let name = givenList[i].name;
        let description = givenList[i].description;
        let price = givenList[i].price;
        AddInsect({ id, name, description, price, })
    }
}
search.addEventListener('click', () => {
    let text = document.getElementById("search-bar").value;
    let regEx = new RegExp(text, 'i');
    let searchResult = insects.filter(insect => regEx.test(insect.name) || regEx.test(insect.description));
    updateList(searchResult)
});

clear.addEventListener('click',()=>{
    insects.length=0;
    updateList(insects)
    counter=1;
});