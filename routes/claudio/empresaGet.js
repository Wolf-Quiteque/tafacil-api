const router = require("express").Router();
const clientPromise = require("../../db/conexao");

router.get("/", async (req, res) => {
  const client = await clientPromise;
  if (client) {
    res.send("Base de dados conectada");
  } else res.send("Base de dados nao conectada");
});

router.get("/empresas", async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Tests");
  try {
    const resultado = await db.collection("users").find({}).toArray();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/empresas-top", async (req, res) => {
  res.send("top 5");
});

router.get("/empresa-Especifica", async (req, res) => {
  res.send("nome da empresa");
});

module.exports = router;
