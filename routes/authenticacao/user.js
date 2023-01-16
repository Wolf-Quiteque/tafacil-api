const router = require("express").Router();
const clientPromise = require("../../lib/mongodb");

router.post("/user", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db
      .collection("users")
      .findOne({ email: req.body.email, senha: req.body.senha });
    if (!data) {
      res.json("Usúario ou senha incorreto");
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/newuser", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");

    const email = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (email) {
      return res.json("usuario Já existe");
    }

    const data = await db.collection("users").insertOne(req.body);
    res.status(200).json("Cadastrado com successo");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
