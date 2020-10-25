document.body.addEventListener('submit', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const btn = document.querySelector('#button');
    btn.onclick = function(){
    const rbs = document.querySelectorAll('input[name="choice"]');
    var sometxt = document.getElementById('super').value;
    let selected_val;
    const lelem = document.createElement('div');
    for (const rb of rbs){
        if(rb.checked){
            selected_val = rb.value;
            console.log(selected_val)
            console.log(sometxt)
            if (selected_val == 1){
                lelem.className = 'elem';
                $('div .right').append(lelem);
                $(lelem).append(`<h1>${sometxt}</h1>`)
            }
            else if (selected_val == 0){
                $('div .left').append(lelem);
                $(lelem).append(`<h1>${sometxt}</h1>`)
            }
            break;
        }
    }
    }});