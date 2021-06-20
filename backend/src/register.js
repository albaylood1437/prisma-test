const { Router, Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const prisma = new PrismaClient();
const resgister = Router();

resgister.get("/", async (req, res) => {
  try {
    const resgister = await prisma.resgister.findMany();
    res.send(resgister);
  } catch (err) {
    res.send(err);
  }
});

resgister.get("/", async (req, res) => {
  try {
    const resgister = await prisma.resgister.findMany();
    res.send(resgister);
  } catch (err) {
    res.send(err);
  }
});

resgister.post("/", async (req, res) => {
  try {
    const { error } = validatebook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await prisma.resgister.create({
      data: {
        fname: req.body.fname,
        sname: req.body.sname,
        email: req.body.email,
        pswd: req.body.pswd,
      },
    });

    res.send(book);
  } catch (err) {
    res.status(500).send(`internal error`);
  }
});

resgister.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validatebook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const regis = await prisma.resgister.update({
      where: { id: Number(id) },
      data: {
        fname: req.body.fname,
        sname: req.body.sname,
        email: req.body.email,
        pswd: req.body.pswd,
      },
    });
    res.send(regis);
  } catch (err) {
    res.status(404).send("donor with the given id was not found");
  }
});

resgister.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const regis = await prisma.resgister.delete({
      where: { id: Number(id) },
    });
    res.send(regis);
  } catch (err) {
    res.status(404).send(`donor with the id: ${id}, was not found`);
  }
});

function validatebook(req) {
  const schema = Joi.object({
    fname: Joi.string().min(2).max(50).required(),
    sname: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(50).required(),
    pswd: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = resgister;
