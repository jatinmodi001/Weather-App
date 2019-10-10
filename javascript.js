window.addEventListener('load',()=>{
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/0c6452ef6d7a5b269dc92bddb464089a/${lat},${long}`;
            fetch(api).then(getResponse).then(getData);
            function getResponse(resp)
            {
                return resp.json();
            }
            function getData(data)
            {
                var temp = data.currently.temperature;
                var summ = data.currently.summary;
                var speed = data.currently.windSpeed;
                var hum = data.currently.humidity;
                var location = data.timezone;
                var icon = data.currently.icon;
                UpdateTemp(temp,summ,location,speed,hum);
                setIcons(icon);
                console.log(data);  
            }
        });
    }
});
function UpdateTemp(temp,summ,location,speed,hum)
{
    console.log(temp+" "+summ);
    temp = (temp - 32 )*(5/9);
    temp = temp.toFixed(2);
    document.getElementById("location").innerHTML =location;
    document.getElementById("temperature").innerHTML = "Temp : "+temp+' &#176C';
    document.getElementById("summary").innerHTML = summ;
    document.getElementById("speed").innerHTML = "Wind : "+speed + " Km/h";
    document.getElementById("humidity").innerHTML = "Humidity : "+(hum*100)+"%";
}
function setIcons(icon)
{
    var skycon = new Skycons({color : 'white'});
    var curr = icon.replace(/-/g,"_").toUpperCase();
    skycon.play();
    skycon.set(document.getElementById("icon"),Skycons[curr]);
}
var date = new Date();
console.log(date.getHours());
if(date.getHours()>18)
{
    var x = document.getElementsByTagName("body")[0];
    x.style.backgroundImage = "url('bgNight.jpg')";
}
