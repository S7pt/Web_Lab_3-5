export class Insect {
    constructor(id, name, description, price) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.price = price;
    }
}
export const InsectTemplate = ( id, name, price, description ) => 
    `<div class="template-div">
    <div class="template-image"></div>
    <h3 class="template-title">${id}. ${name}</h3>
    <p class="template-text">${description}</p>
    <div class="template-price">
        <p class="template-price-text">Price: </p>
        <p class="template-price-number"> ${price}$</p>
    </div>
<div class="aside__buttons">
    <a href="edit.html" id="edit-button" class="edit-button">Edit</a>
    <button id="remove" class="remove-button" data-id="${id}">Remove</button>
</div>
</div>`;

export const AddInsect=({id,name,price,description})=>{
document.getElementById("content").insertAdjacentHTML('beforeend', InsectTemplate(id,name,price,description))
}