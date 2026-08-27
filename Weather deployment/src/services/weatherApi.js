import axios from 'axios'

const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5'
const OPEN_METEO_AIR_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) throw new Error('.env 파일에 OpenWeatherMap API 키를 입력해 주세요.')
  return apiKey
}

const requestOpenWeather = async (path, params) => {
  const response = await axios.get(`${OPEN_WEATHER_URL}/${path}`, {
    params: { ...params, appid: getApiKey(), units: 'metric', lang: 'kr' },
  })
  return response.data
}

export const fetchCurrentWeatherByCity = async (query, displayName) => {
  const data = await requestOpenWeather('weather', { q: query })
  return {
    id: String(data.id),
    name: displayName,
    temp: Math.round(data.main.temp),
    status: data.weather[0].description,
    humidity: data.main.humidity,
    lat: data.coord.lat,
    lon: data.coord.lon,
  }
}

export const fetchCurrentWeatherById = async (cityId) => {
  const data = await requestOpenWeather('weather', { id: cityId })
  return {
    id: String(data.id),
    name: data.name,
    temp: Math.round(data.main.temp),
    status: data.weather[0].description,
    humidity: data.main.humidity,
    lat: data.coord.lat,
    lon: data.coord.lon,
  }
}

export const fetchForecastById = async (cityId) => {
  const data = await requestOpenWeather('forecast', { id: cityId })
  return data.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 3)
    .map((item) => ({
      date: item.dt_txt.slice(0, 10),
      temp: Math.round(item.main.temp),
      status: item.weather[0].description,
    }))
}

export const fetchAirQuality = async (latitude, longitude) => {
  const response = await axios.get(OPEN_METEO_AIR_URL, {
    params: { latitude, longitude, current: 'us_aqi' },
  })
  return response.data.current?.us_aqi ?? null
}
