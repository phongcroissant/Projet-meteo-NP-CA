import express from 'express';
import cities from '/cities.json';
import fs from 'fs';

const app = express();
const PORT = 6969;

app.get('/cities', (req, res) => {
  res.status(200).json(cities)
  });

export default app;

