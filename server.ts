import express from "express";
import cities from "/cities.json";
import weathers from "/weather.json";
import fs from "fs";

const app = express();
const PORT = 6969;
app.use(express.json());

app.get("/cities", (req, res) => {
  res.status(200).json(cities);
});

app.get("/cities/:zipCode", (req, res) => {
  const zipCode = req.params.zipCode;
  const city = cities.find((c) => c.zipCode === zipCode);
  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }
  res.status(200).json([city]);
});

app.delete("/cities/:zipCode", (req, res) => {
  const zipCode = req.params.zipCode;
  const city = cities.findIndex((c) => c.zipCode === zipCode);

  if (city === -1) {
    return res.status(404).json({ error: "City not found" });
  }
  cities.splice(city, 1);
  fs.writeFileSync("cities.json", JSON.stringify(cities, null, 2));
  res.status(204).json();
});

app.put("/cities/:zipCode", (req, res) => {
  const zipCode = req.params.zipCode;
  const city = cities.findIndex((c) => c.zipCode === zipCode);

  if (city === -1) {
    return res.status(404).json({ error: "City not found" });
  }
  cities[city].name = req.body.name;
  fs.writeFileSync("cities.json", JSON.stringify(cities, null, 2));
  res.status(201).json(cities[city]);
});

app.get("/cities/:zipCode/weather", (req, res) => {
  const zipCode = req.params.zipCode;
  const city = cities.find((c) => c.zipCode === zipCode);
  const weatherData = weathers.find((w) => w.zipCode === city.zipCode);

  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }
  if (!weatherData) {
    return res.status(404).json({ error: "Weather not found" });
  }
  const cityWeather = {
    zipCode: weatherData.zipCode,
    name: city.name,
    weather: weatherData.weather,
  };
  res.status(200).json(cityWeather);
});

app.post("/cities/:zipCode/weather", (req, res) => {
  const weather = req.body;
  if (!weather) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const existWeather = weathers.some((w) => w.zipCode === weather.zipCode);
  if (existWeather) {
    return res.status(409).json({ error: "Conflict : data already exist" });
  }
  weather.id = weathers.length + 1;

  weathers.push(weather);
  fs.writeFileSync("weather.json", JSON.stringify(weathers, null, 2));
  res.status(201).json(parseInt(weather.id));
});

app.delete("/weather/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const weather = weathers.findIndex((w) => w.id === id);

  if (weather === -1) {
    return res.status(404).json({ error: "Weather not found" });
  }
  weathers.splice(weather, 1);
  fs.writeFileSync("weather.json", JSON.stringify(weathers, null, 2));
  res.status(204).json();

});

export default app;
