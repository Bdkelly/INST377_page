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
        let html = ""
        suggest.innerHTML = html;
    }
}

const searchval = document.querySelector(".search");
const suggest = document.querySelector(".start");

searchval.addEventListener('change',displayOut);
searchval.addEventListener('keyup',displayOut);




