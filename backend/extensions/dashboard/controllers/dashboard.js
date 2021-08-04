module.exports = {
  async dbsize(ctx) {
    // eslint-disable-next-line no-undef
    const result = await strapi.connections.default.raw(
      `SELECT
      SUM((DATA_LENGTH + INDEX_LENGTH) / 1000 / 1000) AS "SIZE"
      FROM INFORMATION_SCHEMA.TABLES
      WHERE
      TABLE_SCHEMA = "${ process.env.DATABASE_NAME }";`,
    );

    ctx.send({ data: result[0][0].SIZE });
  },
};
