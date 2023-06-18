const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.tomorrow.io/v4/weather/forecast?location=estonia&timesteps=1d&units=metric&apikey=pwhMORMqNbY55DVHgvJ7p9ZSJxuc8Kak',options)
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (data) => {
    document.getElementById("avg1").innerHTML = data.timelines.daily[1].values.temperatureApparentAvg;
    document.getElementById("avg2").innerHTML = data.timelines.daily[2].values.temperatureApparentAvg;
    document.getElementById("avg3").innerHTML = data.timelines.daily[3].values.temperatureApparentAvg;
    //
    document.getElementById("hum1").innerHTML = data.timelines.daily[1].values.humidityAvg;
    document.getElementById("hum2").innerHTML = data.timelines.daily[2].values.humidityAvg;
    document.getElementById("hum3").innerHTML = data.timelines.daily[3].values.humidityAvg;
    //
    document.getElementById("min1").innerHTML = data.timelines.daily[1].values.temperatureMin;
    document.getElementById("min2").innerHTML = data.timelines.daily[2].values.temperatureMin;
    document.getElementById("min3").innerHTML = data.timelines.daily[3].values.temperatureMin;
}