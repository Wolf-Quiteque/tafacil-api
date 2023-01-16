const router = require("express").Router();
const clientPromise = require("../../lib/mongodb");

router.get("/", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("usersClaudio").find({}).toArray();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("usersClaudio").find({}).toArray();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:bi", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("clientes").findOne({ bi: req.params.bi });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/cluadio/:email", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("clientes").findOne({ email: req.params.email });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
