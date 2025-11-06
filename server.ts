import express from "express";
import cities from "/cities.json";
import fs from "fs";

const app = express();
const PORT = 6969;

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

// app.put("/cities/:zipCode", (req, res) => {
//   const zipCode = req.params.zipCode;
//   const city = cities.findIndex((c) => c.zipCode === zipCode);

//   if (!city) {
//     return res.status(404).json({ error: "City not found" });
//   }
//   cities[city].name = req.body.name;
//   fs.writeFileSync("cities.json", JSON.stringify(cities, null, 2));
//   res.status(201).json(cities);
// });

export default app;
