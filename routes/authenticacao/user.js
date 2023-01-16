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


router.get("/new/user/menu", async (req, res) => {
  try {
    res.status(200).json({
   sucesso: false,
   retorno: {
      texto: "Test run"
   }
});

router.post("/new/user", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("usersC").insertOne(req.body);
    res.status(200).json("Cadastrado com successo");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get/users", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("usersC").find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/get/user/email/:email", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("usersC").find({
                    email: {
                      $regex: ".*" + req.params.email+ ".",
                      $options: "i",
                    },
                  }).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/get/user/name/:name", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("facilitaverificao");
    const data = await db.collection("usersC").find({
                    name: {
                      $regex: ".*" + req.params.name+ ".",
                      $options: "i",
                    },
                  }).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
