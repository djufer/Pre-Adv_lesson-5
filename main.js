// ------------------------- Завдання 1 -----------------------------------------------
// function counter() {
//     let q = 0;
//     return function (num) {
//         q += num
//         console.log(`sum ${num} = `, q);
//     }
// }
// let sum = counter();
// sum(3);
// sum(5);
// sum(228);

// ------------------ Завдання 2 ---------------------------------------------

// змінні для доступу до балансу & склад (лівий блок)
let balanceCount = document.querySelector(".balance_count");

let beerCount = document.querySelector(".beer_count");

let wineCount = document.querySelector(".wine_count");

let pepsiCount = document.querySelector(".pepsi_count");

// змінні для доступу до інпутів
let addButton = document.getElementById("add_button");
let enterCount = document.querySelector(".enter_count");
let checkedList = document.querySelector(".checked_list");
let buyButton = document.getElementById("buy-button");
let checkedBlock = document.querySelector(".check-block");
// ------ Змінні для доступу для лівого блоку

// -----------Об'єкт товар ----------------------------------

let shop = {
    balance: 1000,
    pivo: {
        name: "Пиво",
        price: 7,
        quantity: 100,
    },
    wine: {
        name: "Вино",
        price: 25,
        quantity: 30,
    },
    pepsi: {
        name: "Пепсі",
        price: 4,
        quantity: 40,
    },
};

balanceCount.textContent = shop.balance;
beerCount.textContent = shop.pivo.quantity;
wineCount.textContent = shop.wine.quantity;
pepsiCount.textContent = shop.pepsi.quantity;

let total = 0;

// ---Псевдомасив інпутів--------------------------

const forms = document.querySelectorAll("form");
// ----- ф-ція визначення який радіо баттон вибраний
let checkedProduct = function () {
    let res;
    forms[0].radio.forEach(function (e) {
        if (e.checked) {
            res = e.value;
            return;
        }
    });
    return res;
};

// -------Додати-------------------------------------------------
addButton.addEventListener("click", function () {
    if (!enterCount.value) {
        alert("you have not entered anything");
        checkedList.innerHTML = "";
        return;
    }
    if (shop[`${checkedProduct()}`].quantity < enterCount.value) {
        alert(
            `Вибачте, на складі залишилось ${
                shop[checkedProduct()].quantity
            } штук `
        );
        enterCount.value = "";
    } else {
        //  міняю значення кількості одиниць товару в об'єкті
        shop[`${checkedProduct()}`].quantity -= enterCount.value;

        total = 0;

        checkedList.innerHTML +=
            `${shop[checkedProduct()].name}: ${enterCount.value} шт` + "<br/>";

        // обчислюю загальну суму
        total += shop[`${checkedProduct()}`].price * enterCount.value;

        // очищаю поле вводу кулькості одиниць
        enterCount.value = "";
        // проміжна змінна для перенесення вмісту з одного блоку в інший
        let move = checkedList.innerHTML;
        //    ------ Купити---------------------------------------------------
        buyButton.addEventListener("click", function () {
            //  очищаю чек блок
            checkedBlock.innerHTML = "";

            //  копіюю вміст
            checkedBlock.innerHTML = move;
            //  додаю загальну суму
            checkedBlock.innerHTML += `<br/> Всього: ${total} гривень`;

            shop.balance += total;

            balanceCount.textContent = shop.balance;
            beerCount.textContent = shop.pivo.quantity;
            wineCount.textContent = shop.wine.quantity;
            pepsiCount.textContent = shop.pepsi.quantity;

            checkedList.innerHTML = "";
        });
    }
});

// buyButton.addEventListener("click", function () {
//     checkedBlock.innerHTML = checkedList.innerHTML;
//     checkedList.innerHTML = '';
//     checkedBlock.innerHTML += `<br/> Всього: ${total} гривень`;

//     shop.balance += total;
//     shop.pivo.quantity -= enterCount.value;

//     balanceCount.textContent = shop.balance;
//     beerCount.textContent = shop.pivo.quantity;
//     wineCount.textContent = shop.wine.quantity;
//     pepsiCount.textContent = shop.pepsi.quantity;

//     total = 0;
// });
