import {
    Insect
} from './model.js'
const ADDRESS = "http://127.0.0.1:8000/items/"
const create = document.getElementById("create-button")
const edit = document.getElementById("edit-button")
if (create){
    create.addEventListener('click', async () => {
        if ((document.getElementById("name-input").value == '')
            || (document.getElementById("description-input").value == '')
            || (document.getElementById("price-input").value == ''))
            alert("All fields are required");
        else {
            let createdInsect = new Insect(undefined, document.getElementById("name-input").value,
                document.getElementById("description-input").value, document.getElementById("price-input").value);
            await fetch(ADDRESS, { method: 'POST', body: JSON.stringify(createdInsect) })
            window.location.href = '/';
        }
    })
}
(async () => {
    if (!edit)
        return
    const insect = await (await fetch(ADDRESS + window.location.hash.substr(1))).json()
    console.log(insect)
    document.getElementById("name-input").value = insect.name
    document.getElementById("description-input").value = insect.description
    document.getElementById("price-input").value = insect.price
    edit.addEventListener('click', async () => {
        let editedInsect = new Insect(insect.id, document.getElementById("name-input").value,
            document.getElementById("description-input").value, document.getElementById("price-input").value);
        await fetch(ADDRESS + insect.id, { method: 'PUT', body: JSON.stringify(editedInsect) })
        window.location.href = '/';
    })
})()
