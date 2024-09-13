import { useState } from "react"

export const WeatherApp = () => {

    const urlBase= 'https://api.openweathermap.org/data/2.5/weather'
    const APIKey= '949b21cdf095a204d614f33856f13fca'

    const [city, setCity] = useState('')
    const [dataWeather, setDataWeather] = useState(null)

    const fetchWeather = async() => {

        try {
        const response= await fetch (`${urlBase}?q=${city}&appid=${APIKey}`)
        const data= await response.json()
        setDataWeather(data)
        }catch (error){
            console.error("ocurrio un error", error)
        }
    }


    const HandleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(city.length > 0) fetchWeather()
    }

  return (
    <div className="container">
     <h1>Aplicacion del clima</h1>
     <form onSubmit={handleSubmit}>
         <input
             type="text"
             placeholder="Inserte una ciudad"
             value={city}
             onChange={HandleChangeCity}>
         </input>
         <button type="submit">Buscar</button>
     </form>
     {
        dataWeather && (
            <div>
                <h2>Ciudad: {dataWeather.name}</h2>
                <p>Temperatura: {parseInt(dataWeather?.main?.temp - 273)}°C</p>
                <p>Condicion meteorilogica: {dataWeather.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}/>
            </div>
        )
     } 
    </div>
  )
}