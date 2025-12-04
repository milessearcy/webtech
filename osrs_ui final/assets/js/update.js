let map = {};
let rowsPerPage = 25;
let currentPage = 1;
let allRows = [];
let filteredRows = [];


function update_table(){
    allRows = []
    filteredRows = []


    fetch("https://prices.runescape.wiki/api/v1/osrs/latest")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    Object.entries(data.data).forEach(([ID, item]) => {


        
        if (map[ID]){
        
            allRows.push({
                id: ID,
                name: map[ID].name,
                high: item.high,
                low: item.low,
                alch: map[ID].highalch
            });



        } else{
            console.warn("Error ID =", ID);
        }

        
        
  });
  filteredRows = allRows.slice()
  renderPage(1);

  })
  .catch(error => {
    console.error("Error:", error); // handle errors
  });
}


function renderPage(page){
    currentPage = page;

    const table = document.getElementById("priceTableBody");
    table.innerHTML = ''

    const start = (page-1) * rowsPerPage;
    const end = start + rowsPerPage;
    const slice = filteredRows.slice(start,end);

    slice.forEach(item => {
        const tr = document.createElement("tr");
        tr.id = 'itemRow'
        tr.innerHTML = `
        <td><img src="./assets/img/sprites/${item.id}.png" alt="sprite of ${item.name}">${item.name} </td>
        <td>${item.high} gp</td>
        <td>${item.low} gp</td>
        <td>${item.alch} gp</td>
        
        `;
        tr.addEventListener("click", () => {
                window.location.href = `./item_pages/item.html?id=${item.id}`;
                console.log("Clicked item:", item.name);
            });
        table.appendChild(tr);

    });


    document.getElementById("pageNumber").textContent = currentPage;
    updateButtons()
    
}

function applySearch(query){
    query = query.toLowerCase();
    filteredRows = allRows.filter(item =>
        item.name.toLowerCase().includes(query)
    )
    renderPage(1)
}

function updateButtons(){
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage * rowsPerPage >= filteredRows.length;

}
async function mapping(){
    const res = await fetch("https://prices.runescape.wiki/api/v1/osrs/mapping");
    badMap = await res.json();

    for (const item of badMap){
        map[item.id] = item;
    }
    console.log(map);
}

document.addEventListener("DOMContentLoaded", async () => {
    await mapping()
    update_table();
});




let time = 5;
time = time * 1000;
time = time * 60;
setInterval(update_table, time)



document.getElementById("prevBtn").onclick = () =>{
    if (currentPage > 1) renderPage(currentPage - 1)
};

document.getElementById("nextBtn").onclick = () =>{
    if (currentPage * rowsPerPage < filteredRows.length) renderPage(currentPage + 1)
};

document.getElementById("Search").addEventListener("input", e => {
    applySearch(e.target.value)
})

document.getElementById("Search").addEventListener("keydown", a => {
    if(a.key === "Enter"){
        a.preventDefault();
    }
})