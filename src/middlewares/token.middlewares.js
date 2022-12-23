import jwt from "jsonwebtoken";
import connection from "../database/database.js";

export function token(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_JWT, async (error, decode) => {
    if (error) {
      res.status(401).send("Token inválido.");
      return;
    }
    const { id: userId, username, email } = decode;

    const userExists = await connection.query(
      `
      SELECT name, email
      FROM users
      WHERE id = $1;
    `,
      [userId]
    );

    if (!userExists.rows[0]) {
      res.status(404).send("Usuário não encontrado.");
      return;
    }

    const { name: registeredUsername, email: registeredEmail } =
      userExists?.rows[0]
    ;

    res.locals.userId = userId;
    res.locals.userName = registeredUsername;
    next();
  });
}
