import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

type User = { id: number; nome: string; idade: number; email: string };

let id = 1;
let usuarios: User[] = [];

app.get("/", (rec, res) => {
  return res.send("Bem vindo 6");
});

app.get("/users", (req: Request, res: Response) => {
  return res.send(usuarios);
});

app.get("/users/:id", (req: Request, res: Response) => {
  let userId = +req.params.id;

  const user = usuarios.find((user) => user.id === userId);

  return res.send(user);
});

app.put("/users/:id", (req: Request, res: Response) => {
  let userId = +req.params.id;
  let user = req.body;

  let indexOf = usuarios.findIndex((_user: User) => _user.id === userId);

  usuarios[indexOf].nome = user.nome;
  usuarios[indexOf].email = user.email;
  usuarios[indexOf].idade = user.idade;

  return res.send({ message: `Usuário ${userId} foi alterado com sucesso!` });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  let userId = +req.params.id;

  let indexOf = usuarios.findIndex((user: User) => user.id === userId);
  usuarios.splice(indexOf, 1);

  return res.send("Usuário excluido com sucesso");
});

app.post("/users", (req: Request, res: Response) => {
  let user = req.body;
  user.id = id++;
  console.log(user);
  usuarios.push(user);

  return res.send({ message: "Usuário criado com sucesso!" });
});

app.listen(3000, () => console.log("Servidor ativo na port 3000"));
