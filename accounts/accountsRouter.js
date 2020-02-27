const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");
    console.log(accounts);
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db
      .first("*")
      .from("accounts")
      .where({ id: req.params.id });

    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body.title);
    const accountInfo = {
      name: req.body.name,
      budget: req.body.budget
    };
    const [id] = await db("accounts").insert(accountInfo);

    const newAccount = await db("accounts")
      .where("id", id)
      .first();

    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const accountInfo = {
      name: req.body.name,
      budget: req.body.budget
    };

    await db("accounts")
      .where("id", req.params.id)
      .update(accountInfo);
    const account = await db("accounts")
      .where("id", req.params.id)
      .first();

    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
