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


router.post("/new/user/menu", async (req, res) => {
  try {
    res.status(200).json({
   "sucesso": true,
   "retorno": {
      "texto": "Olá %NOME%, obrigado por informar seu CPF, já confirmei seu dados. Você tem débito com os bancos abaixo, digite uma das opções para negociar:\n\n",
      "menus": [
         {
            "tag": "1",
            "icone": "",
            "menu": "Banco do Brasil",
            "palavras": "brasil,bb,banco",
            "etiquetas": [
               "banco do brasil",
               "bb",
               "cliente devedor"
            ],
            "retorno": {
               "texto": "%NOME%, suas dívidas estão em torno de *R$ 1200,00*, caso você deseje negociar esse valor, selecione uma das opções abaixo",
               "menus": [
                  {
                     "tag": "*1*",
                     "icone": "",
                     "menu": "A vista: R$ 1200,00",
                     "palavras": "1,1200,a vista, vista",
                     "retorno": {
                        "texto": "Estarei encaminhando seu atendimentos para o depatamento financeiro:",
                        "departamento": "Financeiro"
                     }
                  },
                  {
                     "tag": "*2*",
                     "icone": "",
                     "menu": "2 boletos de R$ 600,00",
                     "palavras": "2,2 boletos,boletos,600",
                     "etiquetas": [
                        "parcelamento",
                        "boleto"
                     ],
                     "retorno": {
                        "texto": "Estamos encamihando os boletos no formato de PDF para você, isso pode levar alguns segundos.",
                        "itens": [
                           {
                              "pdf": "https://www.boletobancario.com/boletofacil/img/boleto-facil-exemplo.pdf"
                           },
                           {
                              "pdf": "https://www.boletobancario.com/boletofacil/img/boleto-facil-exemplo.pdf"
                           }
                        ],
                        "menus": [
                           {
                              "tag": "#",
                              "icone": "",
                              "menu": "Voltar"
                           },
                           {
                              "tag": "*",
                              "icone": "",
                              "menu": "Finalizar"
                           }
                        ]
                     }
                  },
                  {
                     "tag": "*3*",
                     "icone": "",
                     "menu": "Consultar CPF",
                     "retorno": {
                        "texto": "Informe novamente seu CPF",
                        "api": {
                           "url_metodo": "POST",
                           "url": "https://exemplo.dominio/api/consulta_cpf",
                           "parametros": [
                              "email",
                              "nome",
                              "numero",
                              "protocolo",
                              "canal",
                              "pessoa_cpf",
                              "empresa_cnpj"
                           ],
                           "mensagem_espera": "Aguarde que estamos verificando..",
                           "mensagem_erro": "Ocorreu um problema ao verificar, por favor, tente novamente:"
                        }
                     }
                  },
                  {
                     "tag": "#",
                     "icone": "",
                     "menu": "Voltar ao menu anterior"
                  },
                  {
                     "tag": "*",
                     "icone": "",
                     "menu": "Voltar ao menu principal"
                  }
               ]
            }
         },
         {
            "tag": "2",
            "icone": "",
            "menu": "Banco Santander",
            "palavras": "santander",
            "etiquetas": [
               "santander",
               "boleto"
            ],
            "retorno": {
               "texto": "Estamos encaminhando os boletos para você:",
               "itens": [
                  {
                     "imagem": "https://upload.wikimedia.org/wikipedia/commons/c/c7/BoletoBancario.png",
                     "legenda": "Boleto 1"
                  },
                  {
                     "imagem": "https://upload.wikimedia.org/wikipedia/commons/c/c7/BoletoBancario.png",
                     "legenda": "Boleto 2"
                  }
               ]
            }
         },
         {
            "tag": "3",
            "icone": "",
            "menu": "Caixa Econômica",
            "palavras": "caixa,econimica",
            "etiquetas": [
               "caixa econômica",
               "dividas"
            ],
            "retorno": {
               "texto": "%NOME%, suas dívidas estão em torno de *R$ 1200,00*, caso você deseje negociar esse valor, selecione uma das opções abaixo",
               "menus": [
                  {
                     "tag": "1",
                     "icone": "",
                     "menu": "Quero negociar",
                     "palavras": "quero,negociar",
                     "retorno": {
                        "texto": "Se você deseja negociar sua dívida, selecione as parcelas:",
                        "menus": [
                           {
                              "tag": "1",
                              "icone": "",
                              "menu": "1x parcela",
                              "palavras": "1x",
                              "retorno": {
                                 "texto": "Estamos encaminhando o boleto para você:",
                                 "itens": [
                                    {
                                       "imagem": "https://upload.wikimedia.org/wikipedia/commons/c/c7/BoletoBancario.png",
                                       "legenda": "Segue o boleto para pagamento, por favor, execute o pagamento em até 3 dias.\nDigite * para voltar ao inicio ou digite # para voltar ao menu anterior"
                                    }
                                 ]
                              }
                           },
                           {
                              "tag": "2",
                              "icone": "",
                              "menu": "2x parcela",
                              "palavras": "2x",
                              "retorno": {
                                 "texto": "Estamos encaminhando os boletos para você:",
                                 "itens": [
                                    {
                                       "imagem": "https://upload.wikimedia.org/wikipedia/commons/c/c7/BoletoBancario.png",
                                       "legenda": "Primeira parcela"
                                    },
                                    {
                                       "imagem": "https://upload.wikimedia.org/wikipedia/commons/c/c7/BoletoBancario.png",
                                       "legenda": "Segunda parcela. \n\n#-Voltar \n\n* Finalizar"
                                    }
                                 ]
                              }
                           }
                        ]
                     }
                  },
                  {
                     "tag": "2",
                     "icone": "",
                     "menu": "Quero pagar logo",
                     "palavras": "pagar,logo",
                     "retorno": {
                        "texto": "%NOME%, suas dívidas estão em torno de *R$ 1200,00*, caso você deseje negociar esse valor, selecione uma das opções abaixo",
                        "menus": [
                           {
                              "tag": "*1*",
                              "icone": "",
                              "menu": "A vista: R$ 1200,00",
                              "palavras": "1,1200,a vista, vista",
                              "retorno": []
                           },
                           {
                              "tag": "*2*",
                              "icone": "",
                              "menu": "2 boletos de R$ 600,00",
                              "palavras": "2,2 boletos,boletos,600",
                              "retorno": [
                                 {
                                    "texto": "Testando outro nível:",
                                    "menus": [
                                       {
                                          "tag": "*1*",
                                          "icone": "",
                                          "menu": "Teste R$ 1200,00",
                                          "palavras": "1,1200,a vista, vista",
                                          "retorno": []
                                       },
                                       {
                                          "tag": "*2*",
                                          "icone": "",
                                          "menu": "Teste 2 boletos de R$ 600,00",
                                          "palavras": "2,2 boletos,boletos,600",
                                          "retorno": {
                                             "texto": "Estamos encamihando os boletos no formato de PDF para você, isso pode levar alguns segundos.",
                                             "itens": [
                                                {
                                                   "pdf": "https://www.boletobancario.com/boletofacil/img/boleto-facil-exemplo.pdf"
                                                },
                                                {
                                                   "pdf": "https://www.boletobancario.com/boletofacil/img/boleto-facil-exemplo.pdf"
                                                }
                                             ],
                                             "menus": [
                                                {
                                                   "tag": "#",
                                                   "icone": "",
                                                   "menu": "Voltar"
                                                },
                                                {
                                                   "tag": "*",
                                                   "icone": "",
                                                   "menu": "Finalizar"
                                                }
                                             ]
                                          }
                                       },
                                       {
                                          "tag": "#",
                                          "icone": "",
                                          "menu": "Voltar ao menu anterior"
                                       },
                                       {
                                          "tag": "*",
                                          "icone": "",
                                          "menu": "Voltar ao menu principal"
                                       }
                                    ]
                                 }
                              ]
                           },
                           {
                              "tag": "#",
                              "icone": "",
                              "menu": "Voltar ao menu anterior"
                           },
                           {
                              "tag": "*",
                              "icone": "",
                              "menu": "Voltar ao menu principal"
                           }
                        ]
                     }
                  },
                  {
                     "tag": "#",
                     "icone": "",
                     "menu": "Voltar ao menu anterior"
                  },
                  {
                     "tag": "*",
                     "icone": "",
                     "menu": "Voltar ao menu principal"
                  }
               ]
            }
         },
         {
            "tag": "*",
            "icone": "",
            "menu": "Voltar ao menu principal"
         }
      ]
   }
});
  } catch (err) {
    res.status(500).json(err);
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
