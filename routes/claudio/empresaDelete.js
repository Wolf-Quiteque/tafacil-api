const { ObjectId } = require("bson");
const router = require("express").Router();
const clientPromise = require("../../db/conexao");

router.delete("/", async (req, res) => {
  const client = await clientPromise;
  if (client) {
    res.send("Base de dados conectada");
  } else res.send("Base de dados nao conectada");
});

router.delete("/:id", async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Tests");
  try {
    const resultado = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    console.log(resultado);
    res.status(200).json("eliminado");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/empresas-top", async (req, res) => {
  res.send("top 5");
});

router.delete("/empresa-Especifica", async (req, res) => {
  res.send("nome da empresa");
});

module.exports = router;
