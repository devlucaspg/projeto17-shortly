import connection from "../database/database.js";

export async function getUserInfo(req, res) {
  try {
    const sumVisitCount = await connection.query(
      `
      SELECT SUM("visitCount")
      FROM urls
      WHERE "userId" = $1;
    `,
      [res.locals.userId]
    );

    const userUrls = await connection.query(
      `
      SELECT id, "originalUrl", "shortenUrl", "visitCount"
      FROM urls
      WHERE "userId" = $1;
    `,
      [res.locals.userId]
    );

    res.status(200).send({
      id: res.locals.userId,
      name: res.locals.userName,
      visitCount: Number(sumVisitCount.rows[0].sum),
      shortenedUrls: userUrls.rows.map((url) => {
        return {
          id: url.id,
          shortUrl: url.shortenUrl,
          url: url.originalUrl,
          visitCount: req.visitCount,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
