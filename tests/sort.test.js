const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server.js");
const e = require("express");
require("dotenv").config();

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("GET /sort", () => { 
    it("should return 200 OK", async () => {
        const res = await request(app).get("/sort/testHealth");
        expect(res.statusCode).toBe(200);
    });
});
