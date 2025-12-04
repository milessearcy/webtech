const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let map = {}
let high = null
let low = null



async function grabPrice() {
    await fetch(`https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}`)
  .then(response => response.json())
  .then(data => {
        item = data.data;
        high = item[id].high;
        low = item[id].low;
  });
}


async function mapping(){
    const res = await fetch("https://prices.runescape.wiki/api/v1/osrs/mapping");
    badMap = await res.json();

    for (const item of badMap){
        map[item.id] = item;
    }
    console.log(map);
}

function makePage(){

    const image = document.getElementById("itemImage");
    const itemName = document.getElementById("itemName");
    const itemHigh = document.getElementById("itemHigh");
    const itemLow = document.getElementById("itemLow");
    const buyLimit = document.getElementById("buyLimit");
    const highAlch = document.getElementById("highAlch");
    const lowAlch = document.getElementById("lowAlch");
    const members = document.getElementById("members");
    const examine = document.getElementById("examine");
    
    itemName.textContent = `${map[id].name}`
    itemHigh.textContent = `Buy Price: ${high}`;
    itemLow.textContent =  `Sell Price: ${low}`;
    buyLimit.textContent = `Buy Limit: ${map[id].limit}`;
    highAlch.textContent = `High Alch: ${map[id].highalch}`;
    lowAlch.textContent =  `Low Alch: ${map[id].lowalch}`;
    examine.textContent =  `Examine: ${map[id].examine}`;
    image.src = `../assets/img/sprites/${id}.png`;
    image.alt = `Image of ${map[id].name}`;
}




document.addEventListener("DOMContentLoaded", async () => {
    await mapping()
    await grabPrice()
    makePage()
});