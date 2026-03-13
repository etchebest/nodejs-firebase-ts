import express, { Request, Response } from "express";

const app = express();

app.use(express.json())

const usuarios: [{ nome: string; idade: number }] = [
  {
    nome: "Cristian Etchebest",
    idade: 35,
  },
];

app.get("/", (rec, res) => {
  return res.send("Bem vindo 6");
});

app.get("/users", (rec: Request, res: Response) => {
  return res.send(usuarios);
});

app.post("/users", (rec: Request, res: Response) => {
  console.log(rec.body);
  usuarios.push(rec.body);

  return res.send({ message: "Usuário criado com sucesso!" });
});

app.listen(3000, () => console.log("Servidor ativo na port 3000"));
