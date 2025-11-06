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

export default app;
