let inputCity = document.getElementById('inputCity')
let formCity = document.getElementById('form')
let date = new Date()

document.addEventListener('DOMContentLoaded', (e) =>{
    console.log(date.getHours())
    if(date.getHours() >= 19){
        document.getElementById('container').style.backgroundImage = "url('../assets/images/2.jpg')"
    } else if(date.getHours() >= 6){
        document.getElementById('container').style.backgroundImage = "url('../assets/images/1.jpg')"
    }
})


formCity.addEventListener('submit', (event) => {
    event.preventDefault()
    test()
    fetchingWeather(inputCity.value)
})

function test(){
    console.log(`Salut le viens de recevoir cette ville : ${inputCity.value}`)
}

function fetchingWeather(city){
    const apiKey = '1b3f40ff64bafc05103029fe6d911d6d'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${apiKey}&units=metric&lang=fr`
    fetch(url)
    .then( data => data.json())
    .then( data => {
        // console.log(data)
        // console.log(data.weather[0].main)
        if(inputCity.value == ''){
            document.getElementById('container').innerHTML +=
            `<div class='error'><h6>Veuillez remplir le champs !</h6></div>`
        }   else if(data.main == undefined){
            document.getElementById('container').innerHTML +=
            `<div class='error'><h6>Veuillez entrer une ville existante en France !</h6></div>`
        }   else{
                document.getElementById('container').innerHTML += 
            `<div id="box">
                <h1>${data.name}</h1>
                <h2>${Math.ceil(data.main.temp)}<span>C</span></h2>
                <h3><em>min</em>${Math.ceil(data.main.temp_min)}<span>C</span> / <em>max</em>${Math.ceil(data.main.temp_max)}<span>C</span></h3>
            </div>`
            if(data.weather[0].main == 'Clouds'){
                document.getElementById('box').innerHTML +=
                `<img src='../assets/images/cloudy.png' />`
            } else if(data.weather[0].main == 'Rain'){
                document.getElementById('box').innerHTML +=
                `<img src='../assets/images/raining.png' />`
            } else if(data.weather[0].main == 'Thunderstorm'){
                document.getElementById('box').innerHTML +=
                `<img src='../assets/images/storm.png' />`
            } else if(data.weather[0].main == 'clear sky'){
                document.getElementById('box').innerHTML +=
                `<img src='../assets/images/sun.png' />`
            } else if(data.weather[0].main == 'snow'){
                document.getElementById('box').innerHTML +=
                `<img src='../assets/images/frozen.png' />`
            } 
        }
    })
}