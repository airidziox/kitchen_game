"use strict";
const ingredientsDiv = document.querySelector('.ingredients');
const orderDiv = document.querySelector('.orders');
const selectedIngredientsDiv = document.querySelector('.selectedIngredients');
const cookBtn = document.querySelector('.cook');
const scoreSpan = document.querySelector('.score span');
const deleteButton = document.querySelector('.delete');
const timeSpan = document.querySelector('.timer span');
let gameScore = 0;
const ingredients = [
    "🍞", "🧈", "🥬", "🥕", "🥒", "🌭", "🧅", "🍅", "🧀", "🍝", "🌿", "🥩", "🌮",
    "🍚", "🐟", "🥢", "🥑", "🍋", "🍜", "🥚", "🧄", "🍗", "🍖", "🍷", "🥗", "🧁", "🍇"
];
const dishes = [
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
];
ingredients.map(item => {
    ingredientsDiv.innerHTML += `<div class="ingredient border border-2 rounded-2 p-2 fs-2">${item}</div>`;
});
const ingredient = document.querySelectorAll('.ingredient');
let selectedIngredients = [];
ingredient.forEach((item, index) => {
    item.onclick = () => {
        selectedIngredients.push(ingredients[index]);
        selectedIngredientsDiv.innerHTML = `<div class="border border-2 rounded-2 p-2 fs-2">${selectedIngredients}</div>`;
    };
});
deleteButton.onclick = () => {
    selectedIngredients = [];
    selectedIngredientsDiv.innerText = "Table";
};
let orderIngredients = [];
let orderName = "";
function generateOrder() {
    let randomDish = Math.floor(Math.random() * dishes.length);
    orderIngredients = dishes[randomDish].ingredients;
    orderName = dishes[randomDish].dish;
    orderDiv.innerHTML = `
        <div class="order d-flex flex-column border border-2 p-2 rounded-2">
            <div class="fs-4 orderNameDiv">${orderName}</div>
            <div class="orderIngredientsDiv">(${orderIngredients})</div>
        </div>`;
}
generateOrder();
cookBtn.onclick = () => {
    console.log(selectedIngredients.sort());
    console.log(orderIngredients.sort());
    selectedIngredients.sort();
    orderIngredients.sort();
    if (selectedIngredients.length === orderIngredients.length && JSON.stringify(selectedIngredients) === JSON.stringify(orderIngredients)) {
        gameScore++;
        scoreSpan.innerHTML = `${gameScore}`;
        orderDiv.innerHTML = "";
        selectedIngredientsDiv.innerHTML = "Table";
        selectedIngredients = [];
        generateOrder();
    }
};
let time = 120;
let timeOut = false;
let timer = setInterval(() => {
    if (!timeOut) {
        time--;
        timeSpan.innerHTML = `${time}s`;
    }
    if (time === 0) {
        timeOut = true;
        alert(`Your score is: ${gameScore}`);
        location.reload();
        clearInterval(timer);
    }
}, 1000);
//// SAVE - LOAD GAME
const save = document.querySelector(".save");
const load = document.querySelector(".load");
const orderIngredientsDiv = document.querySelector(".orderIngredientsDiv");
const orderNameDiv = document.querySelector(".orderNameDiv");
save.onclick = () => {
    localStorage.setItem("time", JSON.stringify(time));
    localStorage.setItem("score", JSON.stringify(gameScore));
    localStorage.setItem("orderIngredients", JSON.stringify(orderIngredients));
    localStorage.setItem("orderName", JSON.stringify(orderName));
};
load.onclick = () => {
    selectedIngredientsDiv.innerHTML = "Table";
    time = JSON.parse(localStorage.getItem("time") || "");
    timeSpan.innerHTML = `${time}s`;
    gameScore = JSON.parse(localStorage.getItem("score") || "");
    scoreSpan.innerHTML = `${gameScore}`;
    orderIngredients = JSON.parse(localStorage.getItem("orderIngredients") || "");
    orderIngredientsDiv.innerHTML = `(${orderIngredients})`;
    orderName = JSON.parse(localStorage.getItem("orderName") || "");
    orderNameDiv.innerHTML = `${orderName}`;
};
