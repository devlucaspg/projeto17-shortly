import connection from "../database/database.js";
import { signUpModel } from "../models/signUp.model.js"

export function signUpModelValidation(req, res, next) {
  const { error } = signUpModel.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
    return;
  }

  next();
}

export async function emailValidation(req, res, next) {
  try {
    const email = await connection.query(
      `
      SELECT id
      FROM users
      WHERE email = $1;
    `,
      [req.body.email]
    );

    if (email.rows[0]) {
      res.status(409).send("Email já cadastrado.");
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
