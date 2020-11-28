function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      scaleBreaks: {
        customBreaks: [
          {
            startValue: 40,
            endValue: 50,
            color: 'orange',
            type: 'zigzag'
          },
          {
            startValue: 85,
            endValue: 100,
            color: 'orange',
            type: 'zigzag'
          },
          {
            startValue: 140,
            endValue: 175,
            color: 'orange',
            type: 'zigzag'
          }
        ]
      } // DONE -- Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart

  CanvasJS.addColorSet('customColorSet1', [
    '#C46A08',
    '#3A1105',
    '#F4AF28',
    '#FADC7A'
    // DONE -- add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  const options = makeYourOptionsObject(jsonFromServer);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});