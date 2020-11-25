const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"

const stores = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => stores.push(...data))

function finder(toMatch, stores){
    return stores.filter(store => {
        //Find matching store
    const regex = new RegExp(toMatch,'gi');
    return store.name.match(regex) || store.category.match(regex)
    });
}

function displayOut(){
    const matchSame = finder(this.value,stores);
    let html = matchSame.map(store => {
        return `<li class="out">
                    <h1>${store.name}</h1>
                    <p>${store.address_line_1}, ${store.city}, ${store.state}, ${store.zip}</p>
                    <p>${store.category}</p>
                </li>`
    }).join('');
    suggest.innerHTML = html;
    if(this.value === ""){
        let newpage = `<li class="out"><h1>Restaurant App</h1></li>`
        suggest.innerHTML = newpage;
    }
    if(matchSame[0] === undefined){
        let nase = `<li class="out"><h1>No Results</h1></li>`
        suggest.innerHTML = nase;
    }
}

const searchval = document.querySelector(".search");
const suggest = document.querySelector(".start");

let html = `<li class="out"><h1>Restaurant App</h1></li>`
suggest.innerHTML = html;
searchval.addEventListener('change',displayOut);
searchval.addEventListener('keyup',displayOut);




