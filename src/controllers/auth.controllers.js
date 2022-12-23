import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database/database.js";

export async function insertUser(req, res) {
  const { name, email, password } = req.body;

  await connection.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3);
  `,
    [name, email, bcrypt.hashSync(password, 10)]
  );

  res.sendStatus(201);
}

export function sendJwt(req, res) {
  const { id, name, email } = res.locals.userInfo;

  res.status(200).send(
    jwt.sign({ id, username: name, email }, process.env.SECRET_JWT, {
      expiresIn: 3600,
    })
  );
}
