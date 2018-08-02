const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

const requestComplete = function(response){
  const json = JSON.parse(response.target.responseText);

  displayGenderChart(json);
  displaySearchObjective(json);


};

const displayGenderChart = function(data){
  const maleSearches = _.sumBy(data, {gender: "Male"});
  const femaleSearches = _.sumBy(data, {gender: "Female"});

  const chartData = google.visualization.arrayToDataTable([
    ["Gender", "Number Of Searches"],
    ["Female", femaleSearches],
    ["Male", maleSearches]
  ]);

  const options = {
    title: "Gender Split",
    pieHole: 0.4
  };

  const chart = new google.visualization.PieChart(document.getElementById('genderchart'));
  chart.draw(chartData, options);
}

const displaySearchObjective = function(data){
  const controlledDrugs = _.sumBy(data, {object_of_search: "Controlled drugs"});
  const stolenGoods = _.sumBy(data, {object_of_search: "Stolen goods"});
  const articleForUseInTheft = _.sumBy(data, {object_of_search: "Article for use in theft"});
  const offensiveWeapons = _.sumBy(data, {object_of_search: "Offensive weapons"});

  const chartData = google.visualisation.arrayToDataTable([
    ["Objective of Search", "Number of Searches"],
    ["Controlled drugs", controlledDrugs],
    ["Stolen goods", stolenGoods],
    ["Article for use in theft", articleForUseInTheft],
    ["Offensive weapons", offensiveWeapons]
  ]);

  const options = {
    title: "Objective of Search",
    pieHole: 0.4
  };

  const chart = new google.visualization.PieChart(document.getElementById('objectiveOfCrimechart'));
  chart.draw(chartData, options);


};


window.addEventListener("load", function(){
  google.charts.load("current", {packages:["corechart"]});


  const mapWrapper = new MapWrapper("map", 51.5074, 0, 10);

  mapWrapper.map.on("click", function(event){
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    const url = `https://data.police.uk/api/stops-street?lat=${lat}&lng=${lng}`;


    makeRequest(url, requestComplete);
  })


});
