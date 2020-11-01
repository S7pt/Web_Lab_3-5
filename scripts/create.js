const create=document.getElementById("create-button")

create.addEventListener('click', ()=>{
if((document.getElementById("name-input").value=='')
||(document.getElementById("description-input").value =='')
||(document.getElementById("price-input").value==''))
alert("All fields are required");
else{
    document.getElementById("name-input").value =''
    document.getElementById("description-input").value =''
    document.getElementById("price-input").value =''
}
})