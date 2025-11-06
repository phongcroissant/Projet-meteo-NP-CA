import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "./server.ts";

describe("API Meteo", () => {
  it("GET /cities récupère toutes les villes", async () => {
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
  it("GET /cities/:zipCode récupère une ville par son code postal", async () => {
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

  it("DELETE cities/:zipCode supprime une ville par son code postal", async () => {
    const res = await request(app).delete("/cities/25000");
    expect(res.status).toBe(204);
  });

//   it("PUT /cities/:zipCode met à jour le nom d'une ville par son code postal", async () => {
//     const res = await request(app)
//       .put("/cities/21000")
//       .send({ name: "New Dijon" });
//     expect(res.status).toBe(201);
//     expect(Array.isArray(res.body)).toBe(true);
//     expect(res.body).toEqual([
//       {
//         zipCode: "21000",
//         name: "New Dijon",
//       },
//     ]);
//   });
});
