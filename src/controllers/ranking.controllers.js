import connection from "../database/database.js";

export async function getRanking(req, res) {
  const linksCount = await connection.query(`
    SELECT u.id, u.name, COUNT(*) as "linksCount", SUM("visitCount") as "visitCount"
    FROM urls ur
    LEFT JOIN users u ON ur."userId" = u.id
    GROUP BY u.id
    ORDER BY "visitCount" DESC;
  `);

  res.status(200).send(
    linksCount.rows.map((u) => {
      return {
        id: u.id,
        name: u.name,
        linksCount: u.linksCount,
        visitCount: u.visitCount,
      };
    })
  );
}
