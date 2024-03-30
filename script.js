const BASE_URL= "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdown= document.querySelectorAll(".dropdown select");
const button = document.querySelector("#btn1");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for(code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdown){
    for(currcode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText= currcode;
        newOption.value= currcode;
        if(select.name==="from" && currcode=== "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currcode= element.value;
    // console.log(currcode);
    let countryCode = countryList[currcode];
    // console.log(countryCode);
    let newsrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newsrc;
}

button.addEventListener("click", async (evt)=>{
    evt.preventDefault;
    let amount= document.querySelector(".amount input");
    let amtValue= amount.value;
    if(amtValue < 0 || amtValue === ""){
        alert("Enter a valid amount");
    }

    // console.log(fromcurr.value, tocurr.value);
const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
// let rate= data[fromcurr][tocurr];
// console.log(rate);
// console.log(data);
let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
console.log(rate);

let finalAmount = amtValue*rate;
msg.innerText = `${amtValue} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
})

