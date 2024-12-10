const ingredientsDiv = document.querySelector('.ingredients') as HTMLDivElement;
const orderDiv = document.querySelector('.orders') as HTMLDivElement;
const selectedIngredientsDiv = document.querySelector('.selectedIngredients') as HTMLDivElement;
const cookBtn = document.querySelector('.cook') as HTMLButtonElement;
const scoreSpan = document.querySelector('.score span') as HTMLDivElement;
const deleteButton = document.querySelector('.delete') as HTMLButtonElement;
const timeSpan = document.querySelector('.timer span') as HTMLDivElement;

let gameScore:number = 0


const ingredients: string[] = [
    "🍞","🧈", "🥬","🥕","🥒","🌭","🧅","🍅", "🧀","🍝","🌿","🥩", "🌮",
    "🍚","🐟","🥢", "🥑","🍋","🍜","🥚", "🧄","🍗","🍖", "🍷","🥗","🧁","🍇"
]

interface DishesInterface {
    dish: string,
    ingredients: string[]
}

const dishes: DishesInterface[] = [
    {
        dish: "Toast 🍞",
        ingredients: ["🍞", "🧈"]
    },
    {
        dish: "Salad 🥗",
        ingredients: ["🥬", "🥕", "🥒"]
    },
    {
        dish: "Hot Dog 🌭",
        ingredients: ["🌭", "🍞", "🧅"]
    },
    {
        dish: "Pizza 🍕",
        ingredients: ["🍞", "🍅", "🧀"]
    },
    {
        dish: "Pasta 🍝",
        ingredients: ["🍝", "🍅", "🧀", "🌿"]
    },
    {
        dish: "Burger 🍔",
        ingredients: ["🥩", "🍞", "🧀", "🍅", "🥬"]
    },
    {
        dish: "Taco 🌮",
        ingredients: ["🌮", "🥩", "🧀", "🥬", "🍅"]
    },
    {
        dish: "Sushi 🍣",
        ingredients: ["🍚", "🐟", "🥢", "🥑", "🍋"]
    },
    {
        dish: "Ramen 🍜",
        ingredients: ["🍜", "🥩", "🥚", "🌿", "🧄", "🧅"]
    },
    {
        dish: "Feast 🍽️",
        ingredients: ["🍗", "🍖", "🍞", "🍷", "🥗", "🧁", "🍇"]
    }
]

ingredients.map(item => {
    ingredientsDiv.innerHTML += `<div class="ingredient border border-2 rounded-2 p-2 fs-2">${item}</div>`
})

const ingredient = document.querySelectorAll('.ingredient') as NodeListOf <HTMLDivElement>;
let selectedIngredients: string[] = []

ingredient.forEach((item,index) => {
    item.onclick = () => {
        selectedIngredients.push(ingredients[index])
        selectedIngredientsDiv.innerHTML = `<div class="border border-2 rounded-2 p-2 fs-2">${selectedIngredients}</div>`
    }
})

deleteButton.onclick = () => {
    selectedIngredients = []
    selectedIngredientsDiv.innerText = "Table"
}

let orderIngredients: string[] = []
let orderName:string = ""

function generateOrder() {
    let randomDish:number = Math.floor(Math.random() * dishes.length)
    orderIngredients = dishes[randomDish].ingredients
    orderName = dishes[randomDish].dish
    orderDiv.innerHTML = `
        <div class="order d-flex flex-column border border-2 p-2 rounded-2">
            <div class="fs-4 orderNameDiv">${dishes[randomDish].dish}</div>
            <div class="orderIngredientsDiv">(${dishes[randomDish].ingredients})</div>
        </div>`
}

generateOrder()

cookBtn.onclick = () => {
    console.log(selectedIngredients.sort())
    console.log(orderIngredients.sort())
    selectedIngredients.sort()
    orderIngredients.sort()

    if (selectedIngredients.length === orderIngredients.length && JSON.stringify(selectedIngredients) === JSON.stringify(orderIngredients)) {
        gameScore++
        scoreSpan.innerHTML = `${gameScore}`
        orderDiv.innerHTML = ""
        selectedIngredientsDiv.innerHTML = "Table"
        selectedIngredients = []
        generateOrder()
    }
}

let time:number = 120
let timeOut:boolean = false

let timer:number = setInterval(() => {
    if (!timeOut) {
    time--
    timeSpan.innerHTML = `${time}s`
    } if (time === 0) {
        timeOut = true
        alert(`Your score is: ${gameScore}`)
        location.reload()
        clearInterval(timer)
    }
},1000)

//// SAVE - LOAD GAME

const save = document.querySelector(".save") as HTMLButtonElement
const load = document.querySelector(".load") as HTMLButtonElement
const orderIngredientsDiv = document.querySelector(".orderIngredientsDiv") as HTMLDivElement;
const orderNameDiv = document.querySelector(".orderNameDiv") as HTMLDivElement;

save.onclick = () => {
    localStorage.setItem("time",JSON.stringify(time))
    localStorage.setItem("score",JSON.stringify(gameScore))
    localStorage.setItem("orderIngredients",JSON.stringify(orderIngredients))
    localStorage.setItem("orderName",JSON.stringify(orderName))
}

load.onclick = () => {
    time = JSON.parse(localStorage.getItem("time") || "")
    gameScore = JSON.parse(localStorage.getItem("score") || "")
    scoreSpan.innerHTML = `${gameScore}`
    timeSpan.innerHTML = `${time}s`
    orderIngredients = JSON.parse(localStorage.getItem("orderIngredients") || "")
    orderIngredientsDiv.innerText = `(${JSON.parse(localStorage.getItem("orderIngredients") || "")})`
    orderNameDiv.innerText = JSON.parse(localStorage.getItem("orderName") || "")
}







