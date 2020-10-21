// You may wish to find an effective randomizer function on MDN.

function randomer(max){
    return Math.floor(Math.random() * max);
}

function range(int) {
    const arr = [];
    for (let i = 0; i < int; i += 1) {
      arr.push(i);
    }
    return arr;
  }
  
  function sortByKey(a,b, key) {
    if (a[key] < b[key]) {
      return -1;
    } if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  }
  
  document.body.addEventListener('submit', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((fromServer) => fromServer.json())
      .then((fromServer) => {
        // You're going to do your lab work in here. Replace this comment.
        //console.log('fromServer', fromServer);
        if (document.querySelector('.flex-inner')){
          document.querySelector('.flex-inner').remove();
        }
      //
        const newArr = range(10);
        const newArr2 = newArr.map(() => {
          const number = randomer(50);
          return fromServer[number];
        });
      //
      const reverseList = newArr2.sort((a,b) => sortByKey(b, a, "name"));
      const ul = document.createElement('ul');
      ul.className = "flex-inner";
      $('form').prepend(ul);
      //
      reverseList.forEach((el,i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name}</lable>`);
        $(ul).append(li);
      });
    })
      .catch((err) => console.log(err));
  });