const mongoose = require("mongoose");
const request = require("supertest");
const { Hero } = require("../models/Hero");
const app = require("../app");
const fs = require("fs");
const shortId = require("shortid");
require("dotenv").config();

const { DB_TEST_HOST, PORT = 3000 } = process.env;

beforeEach(async () => {
  await mongoose.connect(DB_TEST_HOST).then(() => {});
});
afterEach(async () => {
  await mongoose.connection.db.dropCollection("heros");
  await mongoose.connection.close();
});

describe("GET /api/heros/", () => {
  it("should return all heros", async () => {
    const hero = {
      nickname: shortId.generate(),
      real_name: "Gven Stasy",
      origin_description: "She is a spiderwoman",
      superpowers: "net",
      catch_phrase: "it's Spiderwoman!",
      images: ["./test/testIMG.png"],
    };
    await Hero.create(hero);
    const res = await request(app).get("/api/heros/");
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBeTruthy();
    expect(res.body.result[0].nickname).toBe(hero.nickname);
    expect(res.body.result[0].real_name).toBe(hero.real_name);
    expect(res.body.result[0].origin_description).toBe(hero.origin_description);
    expect(res.body.result[0].superpowers).toBe(hero.superpowers);
    expect(res.body.result[0].catch_phrase).toBe(hero.catch_phrase);
  });
});
describe("GET /api/heros/:heroId", () => {
  it("should return hero", async () => {
    const newhero = {
      nickname: shortId.generate(),
      real_name: "Gven Stasy",
      origin_description: "She is a spiderwoman",
      superpowers: "net",
      catch_phrase: "it's Spiderwoman!",
      images: ["./test/testIMG.png"],
    };
    const hero = await Hero.create(newhero);
    const res = await request(app).get(`/api/heros/${hero._id}`);
    expect(res.body).toBeTruthy();
    expect(res.body.nickname).toBe(newhero.nickname);
    expect(res.body.real_name).toBe(newhero.real_name);
    expect(res.body.origin_description).toBe(newhero.origin_description);
    expect(res.body.superpowers).toBe(newhero.superpowers);
    expect(res.body.catch_phrase).toBe(newhero.catch_phrase);
    expect(res.statusCode).toBe(200);
  });
});
describe("GET /api/heros/:heroId", () => {
  it("ALTERNATIVE should return hero", async () => {
    const res = await request(app).get(`/api/heros/${shortId.generate()}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid id");
  });
});
describe("GET /api/heros/:heroId", () => {
  it(" ALTERNATIVE should return hero", async () => {
    const res = await request(app).get(`/api/heros/507f191e810c19729de860ea`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Not found");
  });
});
describe("DELETE /api/heros/:heroId", () => {
  it("should delete hero", async () => {
    const newhero = {
      nickname: shortId.generate(),
      real_name: "Gven Stasy",
      origin_description: "She is a spiderwoman",
      superpowers: "net",
      catch_phrase: "it's Spiderwoman!",
      images: ["./test/testIMG.png"],
    };
    const hero = await Hero.create(newhero);
    const res = await request(app).delete(`/api/heros/${hero._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.nickname).toBe(newhero.nickname);
    expect(res.body.real_name).toBe(newhero.real_name);
    expect(res.body.origin_description).toBe(newhero.origin_description);
    expect(res.body.superpowers).toBe(newhero.superpowers);
    expect(res.body.catch_phrase).toBe(newhero.catch_phrase);
  });
});
describe("DELETE /api/heros/:heroId", () => {
  it(" ALTERNATIVE should delete hero", async () => {
    const res = await request(app).delete(`/api/heros/${shortId.generate()}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid id");
  });
});
describe("DELETE /api/heros/:heroId", () => {
  it("ALTERNATIVE should delete hero", async () => {
    const res = await request(app).delete(
      `/api/heros/507f191e810c19729de860ea`
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Not found");
  });
});
describe("CREATE /api/heros/", () => {
  it("should create hero", async () => {
    const newhero = {
      nickname: shortId.generate(),
      real_name: "Gven Stasy",
      origin_description: "She is a spiderwoman",
      superpowers: "net",
      catch_phrase: "it's Spiderwoman!",
      images: [],
    };

    const res = await request(app).post("/api/heros/").send(newhero);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeTruthy();
    expect(res.body.nickname).toBe(newhero.nickname);
    expect(res.body.real_name).toBe(newhero.real_name);
    expect(res.body.origin_description).toBe(newhero.origin_description);
    expect(res.body.superpowers).toBe(newhero.superpowers);
    expect(res.body.catch_phrase).toBe(newhero.catch_phrase);
  });
  describe("CREATE /api/heros/:heroId", () => {
    it(" ALTERNATIVE should create hero", async () => {
      const newhero = {
        real_name: "Gven Stasy",
        origin_description: "She is a spiderwoman",
        superpowers: "net",
        catch_phrase: "it's Spiderwoman!",
        images: [],
      };
      const res = await request(app).post(`/api/heros/`).send(newhero);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('"nickname" is required');
    });
  });
});
describe("UPDATE /api/heros/", () => {
  it("should update hero", async () => {
    const newhero = {
      nickname: shortId.generate(),
      real_name: "Gven Stasy",
      origin_description: "She is a spiderwoman",
      superpowers: "net",
      catch_phrase: "it's Spiderwoman!",
      images: ["./test/testIMG.png"],
    };
    const hero = await Hero.create(newhero);
    const updateHero = { superpowers: "net and more" };
    const res = await request(app)
      .patch(`/api/heros/${hero._id}`)
      .send(updateHero);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.nickname).toBe(newhero.nickname);
    expect(res.body.real_name).toBe(newhero.real_name);
    expect(res.body.origin_description).toBe(newhero.origin_description);
    expect(res.body.superpowers).toBe(updateHero.superpowers);
    expect(res.body.catch_phrase).toBe(newhero.catch_phrase);
  });
});
describe("UPDATE /api/heros/:heroId", () => {
  it(" ALTERNATIVE should update hero", async () => {
    const res = await request(app).patch(`/api/heros/${shortId.generate()}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid id");
  });
});
describe("UPDATE /api/heros/:heroId", () => {
  it("ALTERNATIVE should update hero", async () => {
    const newhero = {
      nickname: shortId.generate(),
      real_name: "Gven Stasy",
      origin_description: "She is a spiderwoman",
    };
    const res = await request(app)
      .patch(`/api/heros/507f191e810c18729de860ea`)
      .send(newhero);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Not found");
  });
});
describe("UPDATE /api/heros/", () => {
  it("ALTERNATIVE should update hero", async () => {
    const newhero = {
      nickname: shortId.generate(),
      real_name: "Gven Stasy",
      origin_description: "She is a spiderwoman",
      superpowers: "net",
      catch_phrase: "it's Spiderwoman!",
      images: ["./test/testIMG.png"],
    };
    const hero = await Hero.create(newhero);
    const updateHero = { superpowers: 3 };
    const res = await request(app)
      .patch(`/api/heros/${hero._id}`)
      .send(updateHero);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('"superpowers" must be a string');
  });
});
