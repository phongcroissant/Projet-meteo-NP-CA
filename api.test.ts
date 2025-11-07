import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "./server.ts";

describe("API Meteo", () => {
  it("GET /cities get all cities", async () => {
    const res = await request(app).get("/cities");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual([
      {
        zipCode: "75001",
        name: "Paris",
      },
      {
        zipCode: "69001",
        name: "Lyon",
      },
      {
        zipCode: "13001",
        name: "Marseille",
      },
      {
        zipCode: "21000",
        name: "Dijon",
      },
      {
        zipCode: "25000",
        name: "Besançon",
      },
    ]);
  });
  it("GET /cities/:zipCode get a city with his zipCode", async () => {
    const res = await request(app).get("/cities/21000");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual([
      {
        zipCode: "21000",
        name: "Dijon",
      },
    ]);
  });

  it("DELETE cities/:zipCode delete a city by his zipCode", async () => {
    const res = await request(app).delete("/cities/25000");
    expect(res.status).toBe(204);
  });

  it("PUT /cities/:zipCode modify city's name", async () => {
    const res = await request(app)
      .put("/cities/21000")
      .send({ name: "New Dijon" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      {
        zipCode: "21000",
        name: "New Dijon",
      },
    );
  });
    it("GET /cities/:zipCode/weather get all information's weather for a city", async () => {
    const res = await request(app).get("/cities/75001/weather");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      zipCode: "75001",
      name: "Paris",
      weather:"neige"
    });
  });
  it("POST /cities/:zipCode/weather create a weather for a city", async () => {
    const newWeather = {
      id: "13001",
      weather: "pluie"
    };
    const res = await request(app)
      .post("/cities/13001/weather")
      .send(newWeather)
      .set('Content-Type', 'application/json');
    
    expect(res.status).toBe(201);
    expect(res.body).toBe(13001);
  });

  it("DELETE weather/:id delete city's weather", async () => {
    const res = await request(app).delete("/weather/13001");
    expect(res.status).toBe(204);
  });
});
