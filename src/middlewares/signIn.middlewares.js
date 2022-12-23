import bcrypt from "bcrypt";
import connection from "../database/database.js";
import { signInModel } from "../models/signIn.model.js";

export function signInModelValidation(req, res, next) {
  const { error } = signInModel.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
    return;
  }

  next();
}

export async function validateCredentials(req, res, next) {
  const { password } = req.body;
  try {
    const { rows } = await connection.query(
      `
      SELECT password, name, id, email
      FROM users
      WHERE email = $1;
    `,
      [req.body.email]
    );

    const userPassword = rows[0]?.password;

    if (!userPassword || !bcrypt.compareSync(password, userPassword)) {
      res.status(401).send("Email ou senha inválidos");
      return;
    }

    res.locals.userInfo = rows[0];
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
