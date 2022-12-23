import connection from "../database/database.js";
import { urlModel } from "../models/url.model.js";

export async function urlId(req, res, next) {
  try {
    const urlId = await connection.query(
      `
      SELECT id, "shortenUrl", "originalUrl"
      FROM urls
      WHERE id = $1
    `,
      [req.params.id]
    );

    if (!urlId.rows[0]) {
      res.status(404).send("URL não encontrada.");
      return;
    }

    res.locals.urlInfo = urlId.rows[0];
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function urlUser(req, res, next) {
  const userId = res.locals.userId;

  try {
    const URL = await connection.query(
      `
      SELECT "userId"
      FROM urls
      WHERE id = $1;
    `,
      [req.params.id]
    );

    if (userId != URL.rows[0].userId) {
      res.sendStatus(401);
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function shortUrl(req, res, next) {
  try {
    const shortUrl = await connection.query(
      `
      SELECT id, "originalUrl"
      FROM urls
      WHERE "shortenUrl" = $1;
    `,
      [req.params.shortUrl]
    );

    if (!shortUrl.rows[0]) {
      res.status(404).send("URL não encontrada.");
      return;
    }

    res.locals.originalUrl = shortUrl.rows[0].originalUrl;
    res.locals.urlId = shortUrl.rows[0].id;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export function urlModelValidation(req, res, next) {
  const { error } = urlModel.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
    return;
  }

  next();
}

export async function alreadyShortened(req, res, next) {
  const urlShortened = await connection.query(
    `
    SELECT id
    FROM urls
    WHERE "originalUrl" = $1;
  `,
    [req.body.url]
  );

  if (urlShortened.rows[0]) {
    res.status(409).send("URL já cadastrada.");
    return;
  }

  next();
}