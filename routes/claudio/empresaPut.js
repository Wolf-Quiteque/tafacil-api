const router = require("express").Router();
const clientPromise = require("../../db/conexao");
const { ObjectId } = require("bson");

router.put("/:id", async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Tests");
  try {
    const resultado = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    console.log(resultado);
    res.status(200).json("Actualizado com Sucessso");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/empresas-top", async (req, res) => {
  res.send("top 5");
});

router.put("/empresa-Especifica", async (req, res) => {
  res.send("nome da empresa");
});

module.exports = router;
