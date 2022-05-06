import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

const API_KEY = process.env.REACT_APP_API_KEY;

//https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey}&units=metric

const getForecast = (cityname) => {
  return axios.get(
    `${API_BASE_URL}data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`
  );
};

export { getForecast };
