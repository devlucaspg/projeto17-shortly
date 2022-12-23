import connection from "../database/database.js";
import { nanoid } from "nanoid/async";

export async function deleteUrl(req, res) {
  try {
    await connection.query(
      `
      DELETE FROM urls
      WHERE id = $1;
    `,
      [req.params.id]
    );

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id, shortenUrl: shortUrl, originalUrl: url } = res.locals.urlInfo;

  res.status(200).send({ id, shortUrl, url });
}

export async function redirectToUrl(req, res) {
  await connection.query(
    `
    UPDATE urls
    SET "visitCount" = "visitCount" + 1
    WHERE id = $1;
  `,
    [res.locals.urlId]
  );
  res.redirect(200, res.locals.originalUrl);
}

export async function shortenUrl(req, res) {
  const orignalUrl = req.body.url;
  req.body.url = await nanoid(6);

  try {
    await connection.query(
      `
      INSERT INTO urls ("userId", "originalUrl", "shortenUrl")
      VALUES ($1, $2, $3);
    `,
      [res.locals.userId, orignalUrl, req.body.url]
    );

    res.status(201).send({ shortUrl: req.body.url });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}