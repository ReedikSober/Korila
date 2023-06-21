const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.tomorrow.io/v4/weather/forecast?location=estonia&timesteps=1d&units=metric&apikey=pwhMORMqNbY55DVHgvJ7p9ZSJxuc8Kak',options)
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (dataIn) => {
    const data = dataIn;
    const dayElementIdArray =["day1", "day2", "day3"];
    const avgTempElementIdArray = ["avg1","avg2", "avg3"];
    const avgHumElementIdArray = ["hum1", "hum2", "hum3"];
    const minTempElementIdArray = ["min1", "min2","min3"];

    function beforeDot(inputWithDot) {
        const stringWithDot = inputWithDot.toString()
        const justNumberArray = stringWithDot.split(".");
        let justNumber = justNumberArray[0];
        return justNumber;
    }
    function dayNumberWithDot(elementId, whatDay) {
        document.getElementById(elementId).innerHTML = data.timelines.daily[whatDay].time.slice(8,10).concat(
        ".", data.timelines.daily[whatDay].time.slice(5,7));
    };
    function avargeTemp(elementId, whatDay) {
        document.getElementById(elementId).innerHTML = beforeDot(
            data.timelines.daily[whatDay].values.temperatureApparentAvg).concat("°C");
    }
    function minimumTemp(elementId, whatday){
        document.getElementById(elementId).innerHTML = beforeDot(
            data.timelines.daily[whatday].values.temperatureMin).concat("°C");
    }
    function avargeHumidity(elementId, whatDay) {
        document.getElementById(elementId).innerHTML = beforeDot(
            data.timelines.daily[whatDay].values.humidityAvg).concat("%");
    }
    function changeDayNumber(dayElementIdArray){
        const arrayLenght = dayElementIdArray.length;
        for (let i = 0; i < arrayLenght; i++) {
            dayNumberWithDot(dayElementIdArray[i], i);
        }
    }
    function changeAvargeTemp(dayElementIdArray){
        const arrayLenght = dayElementIdArray.length;
        for (let i = 0; i < arrayLenght; i++) {
            avargeTemp(dayElementIdArray[i], i);
        }
    }
    function changeAvargeHumidity(dayElementIdArray){
        const arrayLenght = dayElementIdArray.length;
        for (let i = 0; i < arrayLenght; i++) {
            avargeHumidity(dayElementIdArray[i], i);
        }
    }
    function changeMinimumTemp(dayElementIdArray){
        const arrayLenght = dayElementIdArray.length;
        for (let i = 0; i < arrayLenght; i++) {
            minimumTemp(dayElementIdArray[i], i);
        }
    }
    changeDayNumber(dayElementIdArray);
    changeAvargeTemp(avgTempElementIdArray);
    changeAvargeHumidity(avgHumElementIdArray);
    changeMinimumTemp(minTempElementIdArray);
};