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



