const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'fd48bdf8a8b87b3c140f17625f4e2d57';

const cities = [
    "Paris", "New York", "Madrid", "Yerevan", "London", "Moscow", "Prague", "Tokyo", "Berlin", "Amsterdam",
    "Barcelona"
];

const checkCityName = [];
let result = 0;
let cityTemp = 0;

const tagSetValue = (tagId, value = '') => {
    document.getElementById(tagId).innerHTML = value;
}

const startGame = () => {
    const start = document.getElementById('start');
    const blockDisplay = document.getElementById('block_display');
    start.style.display = "none";
    blockDisplay.style.display = "block";
    replaybtn.style.display = "block"
    randomCity();
}

function randomCity() {
    let nameIndex = Math.floor(Math.random() * cities.length);
    console.log(nameIndex);
    console.log(cities[nameIndex]);
    if (checkCityName.length >= 5) {
        return gameResult();
    }
    if (checkCityName.includes(cities[nameIndex])) {
        randomCity();
    } else {
        checkCityName.push(cities[nameIndex]);
        next();
    }
}

const next = () => {
    fetch(`${API_URL}/weather?q=${checkCityName[checkCityName.length-1]}&appid=${API_KEY}&units=metric`)
        .then(resp => {
            return resp.json();
        })
        .then(result => {
            console.log(result);
            renderData(result);
        })
        .catch((resp) => {
            tagSetValue('errorMessage', 'The requested URL/error was not found')
        })
}
const renderData = (data) => {
    const {
        name,
        main: { temp },
        sys: { country }
    } = data

    cityTemp = Math.round(temp);
    console.log(cityTemp);
    console.log(result);
    tagSetValue('get_value', `${name} - ${country}`)
    document.getElementById('input').value = ''
}

let li = document.getElementsByTagName('li');
let resultName = document.getElementsByClassName('city');
let resultTmp = document.getElementsByClassName('weather');
let resultValue = document.getElementsByClassName('value');
let indexResult = 0;

const checkResult = () => {
    let inputValue = document.getElementById('input').value;
    const resultTemp = Math.abs(+inputValue - cityTemp);
    if (resultTemp <= 5) {
        li[indexResult].style.color = `green`;
        resultName[indexResult].innerHTML = `City - ${checkCityName[indexResult]}`;
        resultTmp[indexResult].innerHTML = `Weather - ${cityTemp}`;
        resultValue[indexResult].innerHTML = `Value - ${inputValue}`;
        indexResult++;
        result++
        randomCity();
    } else {
        li[indexResult].style.color = `red`;
        resultName[indexResult].innerHTML = `City - ${checkCityName[indexResult]}`;
        resultTmp[indexResult].innerHTML = `Weather - ${cityTemp}`;
        resultValue[indexResult].innerHTML = `Value - ${inputValue}`;
        indexResult++
        randomCity();
    }
}

const gameResult = () => {
    const resultText = document.getElementById('result');
    if (result >= 3) {
        resultText.style.color = "green";
        console.log("win");
        tagSetValue("result", "You Win :)");
    } else {
        resultText.style.color = "red";
        console.log("lose");
        tagSetValue("result", "You lose :(");
    }
}
const replay = () => {
    const replayGame = document.getElementById('replaybtn');
    replayGame.style.display = "none";
    start.style.display = "block";
    block_display.style.display = "none";

}
const handleKeyUpInput = (event) => {
    if (event.keyCode === 13) {
        checkResult();
    }
}