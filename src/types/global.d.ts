interface WeatherForecast {
  cod: String;
  city: City;
  message: Number;
  cnt: Number;
  list: List[];
}

interface City {
  coord: Coord;
  country: string;
  id: number;
  name: String;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain?: Rain;
  sys: Sys;
  visibility: number;
  pop: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  h: string;
}

interface Sys {
  pod: string;
}
