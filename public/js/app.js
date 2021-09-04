
console.log("client side javascript")

fetch("http://puzzle.mead.io/puzzle").then((response) =>{
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

/* messageOne.textContent = ""
messagetwo.textContent */ 

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    messageOne.textContent = "Loading data..."
    messageTwo.textContent = ""
    
    const location = search.value
    fetch("http://localhost:3000/weather?adress=" + location).then((response) => {
    
    response.json().then((data) => {
        if(data.error){
           messageOne.textContent = "Error!"
           messageTwo.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
}) 
})