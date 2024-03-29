import React, { useState } from 'react'
import axios from 'axios';
import Icon from './Icon';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4c67d1c852a0404242197e390eff43e5`

  const iconData = `https://openweathermap.org/img/w/${image} `

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }


  return (
    <div className="app">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type='text'
        />
      </div>
      <div className='container'>

        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}

          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {data.weather ? <Icon icon={iconData} /> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className='bottom'>
            <div className='feels'>

              {data.weather ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>

            </div>
            <div className='humidity'>
              {data.weather ? <p className='bold'>{data.main.humidity} %</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.weather ? <p className='bold'>{data.wind.speed.toFixed()} km/ph</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>}

      </div>
    </div>
  );
}

export default App;
