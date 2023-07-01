const options = {method: 'GET', headers: {accept: 'application/json'}};
window.addEventListener('load', () => {
    fetch('https://api.tomorrow.io/v4/weather/forecast?location=estonia&timesteps=1d&units=metric&apikey=pwhMORMqNbY55DVHgvJ7p9ZSJxuc8Kak', options)
    .then(jsonData => jsonData.json())
    .then(data => {
    function createAElement(innerText){
        const para = document.createElement("a");
        para.innerText = innerText;
        const targetLi = document.getElementById("weatherList");
        targetLi.appendChild(para);
    }
    function createBrElement(){
        const para = document.createElement("br");
        const targetLi = document.getElementById("weatherList");
        targetLi.appendChild(para);
    }
    function beforeDot(inputWithDot) {
        const stringWithDot = inputWithDot.toString()
        const justNumberArray = stringWithDot.split(".");
        let justNumber = justNumberArray[0];
        return justNumber;
    }
    function avargeTemp(whatDay) {
        const avargeT = beforeDot(data.timelines.daily[whatDay].values.temperatureApparentAvg).concat("°C");
        return avargeT;
    }
    function dayNumberWithDot(whatDay) {
        const dayString = data.timelines.daily[whatDay].time.slice(8, 10).concat(
            ".", data.timelines.daily[whatDay].time.slice(5, 7));
        return dayString;
    };
    function createADayArray(){
        let dayArray = [];
        for (let i = 0;i < 5;i++){
            dayArray[i] = dayNumberWithDot(i);
        }
        return dayArray;
    }
    function createATempArray(){
        let tempArrayv = [];
        for (let i = 0; i < 5; i++){
            tempArrayv[i] = avargeTemp(i);
        }
        return tempArrayv;
    }
    function setBGColorBasedOnTemp(temp){
        const tempValue = temp;
        let bgColor = "";
        if (tempValue < 10) {
            bgColor = "blue";
        }else if (tempValue >= 10 && tempValue < 20) {
            bgColor = "green";
        } else if (tempValue >= 20 && tempValue < 30) {
            bgColor = "yellow";
        } else {
            bgColor = "red";
        }
        console.log(bgColor);
        document.body.style.Color = bgColor;
    }
    function weatherForecast(array){
        for (let i = 0; i < array.length; i++){
            createAElement(array[i]);
        }
    }

    weatherForecast(createADayArray());
    createBrElement();
    weatherForecast(createATempArray());
    console.log(createADayArray());
    })
});